# 数据库设置指南

## 概述

应用现在从 Supabase 数据库的 `adTemplateList` 表获取组件数据，支持从数据库获取组件信息并在每个卡片中显示用户头像和用户名。

## 数据库表结构

### 1. adTemplateList 表

存储组件数据的主要表：

```sql
CREATE TABLE adTemplateList (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,                    -- 组件标题
  category TEXT NOT NULL,                 -- 组件分类
  date DATE NOT NULL,                     -- 创建日期
  tags TEXT[] DEFAULT '{}',              -- 标签数组
  html TEXT,                              -- HTML 代码
  css TEXT,                               -- CSS 代码
  js TEXT,                                -- JavaScript 代码
  originLink TEXT,                        -- 原始链接
  userId UUID REFERENCES auth.users(id) NOT NULL,  -- 用户ID
  instance_templates JSONB DEFAULT '[]'::jsonb,  -- 模板实例数组
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. users 表

存储用户信息：

```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  username TEXT,
  sex TEXT,
  avatar_url TEXT,
  is_official BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 设置步骤

### 1. 在 Supabase 中创建表

1. 登录 [Supabase 控制台](https://app.supabase.com)
2. 选择你的项目
3. 进入 **SQL Editor**
4. 执行以下 SQL 语句：

```sql
-- 1. 创建 adTemplateList 表
CREATE TABLE IF NOT EXISTS adTemplateList (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  tags TEXT[] DEFAULT '{}',
  html TEXT,
  css TEXT,
  js TEXT,
  originLink TEXT,
  userId UUID REFERENCES auth.users(id) NOT NULL,
  instance_templates JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建 users 表（如果不存在）
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  username TEXT,
  sex TEXT,
  avatar_url TEXT,
  is_official BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 启用行级安全性
ALTER TABLE adTemplateList ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 4. 创建 adTemplateList 表的策略
-- 允许所有用户查看所有组件
CREATE POLICY "Enable read access for all users" ON adTemplateList
FOR SELECT USING (true);

-- 允许认证用户插入组件
CREATE POLICY "Enable insert for authenticated users" ON adTemplateList
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 允许用户更新自己的组件
CREATE POLICY "Enable update for users own components" ON adTemplateList
FOR UPDATE USING (auth.uid() = userId)
WITH CHECK (auth.uid() = userId);

-- 允许用户删除自己的组件
CREATE POLICY "Enable delete for users own components" ON adTemplateList
FOR DELETE USING (auth.uid() = userId);

-- 5. 创建 users 表的策略
-- 允许所有用户查看用户信息
CREATE POLICY "Enable read access for all users" ON users
FOR SELECT USING (true);

-- 允许用户插入自己的用户信息
CREATE POLICY "Enable insert for users own data" ON users
FOR INSERT WITH CHECK (auth.uid() = id);

-- 允许用户更新自己的用户信息
CREATE POLICY "Enable update for users own data" ON users
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 6. 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为 adTemplateList 表添加更新时间触发器
CREATE TRIGGER update_adTemplateList_updated_at 
    BEFORE UPDATE ON adTemplateList 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_adTemplateList_category ON adTemplateList(category);
CREATE INDEX IF NOT EXISTS idx_adTemplateList_userId ON adTemplateList(userId);
CREATE INDEX IF NOT EXISTS idx_adTemplateList_created_at ON adTemplateList(created_at);
CREATE INDEX IF NOT EXISTS idx_adTemplateList_instance_templates ON adTemplateList USING GIN (instance_templates);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
```

### 2. 配置 Supabase 客户端

确保 `supaClient.ts` 中的配置正确：

```typescript
const supabaseUrl = 'your-supabase-url';
const supabaseKey = 'your-supabase-anon-key';
```

### 3. 验证设置

执行以下查询验证表是否正确创建：

```sql
-- 检查表是否存在
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('adTemplateList', 'users');

-- 检查示例数据
SELECT * FROM adTemplateList LIMIT 5;
SELECT * FROM users LIMIT 5;
```

## 功能特性

### 1. 组件展示

- ✅ 从数据库获取组件数据
- ✅ 支持分类过滤
- ✅ 显示用户头像和用户名
- ✅ 支持 HTML/CSS/JS 代码渲染
- ✅ 加载状态和错误处理

### 2. 用户信息

- ✅ 显示组件作者头像
- ✅ 显示组件作者用户名
- ✅ 支持默认头像（用户名首字母）

### 3. 数据管理

- ✅ 自动获取最新数据
- ✅ 支持按分类筛选
- ✅ 支持用户个人组件查看

### 4. 模板实例功能

- ✅ 支持将编辑后的模板保存为实例
- ✅ 自动处理图片上传到 Supabase Storage
- ✅ 实例数据存储在原模板的 `instance_templates` 字段中
- ✅ 支持查看和管理模板实例

## API 服务

### componentService.ts

提供以下功能：

```typescript
// 获取所有组件
getComponents(): Promise<ComponentItem[]>

// 按分类获取组件
getComponentsByCategory(category: string): Promise<ComponentItem[]>

// 获取用户组件
getUserComponents(userId: string): Promise<ComponentItem[]>
```

### instanceService.ts

提供模板实例管理功能：

```typescript
// 添加模板实例
addTemplateInstance(
  templateId: string,
  instanceData: {
    name: string;
    html: string;
    css?: string;
    js?: string;
    width?: string;
    height?: string;
  },
  userId: string
): Promise<ComponentItem>

// 获取模板的所有实例
getTemplateInstances(templateId: string): Promise<ComponentInstance[]>

// 删除模板实例
removeTemplateInstance(templateId: string, instanceId: string): Promise<ComponentItem>

// 从HTML中提取并上传图片
extractAndUploadImages(html: string, templateId: string): Promise<{
  updatedHtml: string;
  uploadedImages: Array<{ originalSrc: string; storagePath: string; publicUrl: string }>;
}>
```

### useComponents.ts

提供 React hooks：

```typescript
// 获取所有组件
const { components, loading, error, refetch } = useComponents();

// 按分类获取组件
const { components, loading, error, refetch } = useComponentsByCategory(category);

// 获取用户组件
const { components, loading, error, refetch } = useUserComponents();
```

## 注意事项

1. **安全性**: 确保 RLS 策略正确配置
2. **性能**: 大量组件时考虑分页加载
3. **错误处理**: 网络错误时显示友好的错误信息
4. **数据同步**: 组件数据实时更新

## 故障排除

### 常见问题

1. **数据加载失败**
   - 检查 Supabase 连接配置
   - 验证 RLS 策略设置
   - 查看浏览器控制台错误

2. **用户头像不显示**
   - 检查 `users` 表中的 `avatar_url` 字段
   - 验证存储桶权限设置

3. **组件渲染异常**
   - 检查 HTML/CSS/JS 代码语法
   - 查看 ComponentRenderer 控制台错误

### 调试建议

1. 使用浏览器开发者工具查看网络请求
2. 检查 Supabase 控制台的日志
3. 验证数据库表结构和数据
