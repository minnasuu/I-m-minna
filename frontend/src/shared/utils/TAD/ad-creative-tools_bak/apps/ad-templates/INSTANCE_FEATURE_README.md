# 模板实例功能实现说明

## 功能概述

该功能允许用户将修改后的模板内容保存为该模板的实例，并自动处理图片上传到 Supabase Storage 的 `ad-creative-tools/templates` 目录。

## 实现的功能

### 1. 核心功能
- ✅ 将编辑后的模板内容保存为实例
- ✅ 自动提取 HTML 中的图片并上传到 Supabase Storage
- ✅ 支持 base64 图片的处理和上传
- ✅ 实例数据存储在原模板的 `instance_templates` 字段中
- ✅ 完整的错误处理和用户反馈
- ✅ 加载状态管理

### 2. 技术实现

#### 数据库结构变更
- 在 `adTemplateList` 表中添加了 `instance_templates` 字段（JSONB 类型）
- 每个实例包含完整的模板数据结构
- 添加了 GIN 索引以优化查询性能

#### 文件结构
```
src/
├── types.ts                     # 新增 ComponentInstance 接口
├── services/
│   └── instanceService.ts       # 新增实例管理服务
└── components/
    └── ComponentDetailModal.tsx # 更新添加实例功能
```

#### 新增的类型定义
```typescript
export interface ComponentInstance {
  id: string;
  name: string;
  ratio: string;
  desc?: string;
  html?: string;
  css?: string;
  js?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  width?: string;
  height?: string;
}

export interface ComponentItem {
  // ... 原有字段
  instance_templates?: ComponentInstance[];
}
```

## 使用方法

### 1. 数据库迁移
首先运行数据库迁移脚本：
```sql
-- 在 Supabase SQL Editor 中执行
ALTER TABLE adTemplateList 
ADD COLUMN IF NOT EXISTS instance_templates JSONB DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_adTemplateList_instance_templates 
ON adTemplateList USING GIN (instance_templates);
```

### 2. 用户操作流程
1. 用户在模板详情页编辑内容（文字编辑、图片上传）
2. 点击"添加为实例"按钮
3. 系统自动：
   - 提取当前编辑后的 HTML 内容
   - 处理其中的图片（base64 转换为文件并上传）
   - 更新图片链接为 Supabase Storage 的公共 URL
   - 将实例数据添加到原模板的 `instance_templates` 数组中
   - 保存到数据库

### 3. API 使用示例

```typescript
import { addTemplateInstance } from '../services/instanceService';

// 添加模板实例
const result = await addTemplateInstance(
  'template-id',
  {
    name: '我的自定义实例',
    html: '<div>编辑后的HTML内容</div>',
    css: '/* CSS样式 */',
    js: '// JavaScript代码'
  },
  'user-id'
);
```

## 图片处理机制

### 1. 图片类型支持
- ✅ base64 编码的图片（用户上传的新图片）
- ✅ 外部链接图片（保持不变）
- ✅ 相对路径图片（跳过处理）

### 2. 存储路径结构
```
I-am-minna/
└── ad-creative-tools/
    └── templates/
        └── {templateId}/
            ├── {timestamp}-{random}.png
            ├── {timestamp}-{random}.jpg
            └── ...
```

### 3. 图片处理流程
1. 解析 HTML 中的所有 `<img>` 标签
2. 识别 base64 图片
3. 将 base64 转换为 Blob 对象
4. 生成唯一文件名
5. 上传到 Supabase Storage
6. 获取公共 URL
7. 更新 HTML 中的图片链接

## 错误处理

### 1. 用户端错误处理
- 未登录用户提示登录
- 无编辑内容时提示用户
- 上传失败时显示错误信息
- 网络错误时提供重试提示

### 2. 服务端错误处理
- 数据库连接失败处理
- 文件上传失败回滚机制
- 图片处理异常跳过处理

## 性能优化

### 1. 数据库优化
- 使用 GIN 索引优化 JSONB 查询
- 批量操作减少数据库请求
- 适当的错误回滚机制

### 2. 存储优化
- 按模板 ID 分目录存储
- 生成唯一文件名避免冲突
- 失败时自动清理已上传的文件

## 安全考虑

### 1. 权限控制
- 只有登录用户才能创建实例
- 实例创建者信息记录在 `user_id` 字段
- 利用 Supabase RLS 策略控制访问权限

### 2. 数据验证
- 文件类型验证（仅允许图片）
- 文件大小限制（通过 Supabase Storage 配置）
- HTML 内容清理和验证

## 扩展功能

### 1. 已实现的扩展功能
- `getTemplateInstances()` - 获取模板的所有实例
- `removeTemplateInstance()` - 删除指定实例

### 2. 未来可扩展的功能
- 实例版本管理
- 实例共享和协作
- 实例模板化（将实例转为新模板）
- 批量操作实例

## 测试建议

### 1. 功能测试
- 创建实例功能
- 图片上传处理
- 错误场景处理
- 权限验证

### 2. 性能测试
- 大量实例的查询性能
- 大图片上传处理
- 并发创建实例

## 注意事项

1. 确保 Supabase Storage bucket `I-am-minna` 已正确配置
2. 确保数据库表已添加 `instance_templates` 字段
3. 图片上传失败不会阻止实例创建，但会在控制台输出警告
4. 实例数据完全依赖原模板，删除原模板会导致实例丢失

## 故障排除

### 常见问题
1. **实例创建失败**：检查用户登录状态和数据库连接
2. **图片上传失败**：检查 Supabase Storage 配置和权限
3. **HTML 内容获取失败**：检查 ComponentRenderer 的实现方式

### 调试方法
- 查看浏览器控制台的错误信息
- 检查 Supabase Dashboard 的日志
- 验证数据库表结构和数据
