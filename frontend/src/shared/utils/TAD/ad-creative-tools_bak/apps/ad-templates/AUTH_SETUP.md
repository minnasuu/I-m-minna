# 基于本地存储的登录注册系统

## 功能特性

✅ **完整的认证流程**
- 用户注册（支持头像上传）
- 用户登录
- 用户登出
- 本地存储用户信息

✅ **状态管理**
- 使用React Context管理全局认证状态
- 基于localStorage的持久化登录状态
- 模拟认证流程

✅ **路由保护**
- 受保护的路由组件
- 登录后重定向到原页面
- 未登录用户自动跳转到登录页

✅ **用户体验**
- 加载状态显示
- 错误信息提示
- 用户头像显示
- 响应式设计

## 项目结构

```
src/
├── contexts/
│   └── AuthContext.tsx          # 认证上下文
├── components/
│   ├── login/
│   │   ├── Login.tsx            # 登录组件
│   │   ├── Register.tsx         # 注册组件
│   │   └── LoginButtons.tsx     # 登录按钮组件
│   ├── Header.tsx               # 头部组件（包含用户状态）
│   ├── UserAvatar.tsx           # 用户头像组件
│   └── ProtectedRoute.tsx       # 受保护路由组件
└── router/
    └── index.tsx                # 路由配置
```

## 使用方法

### 1. 环境配置

无需额外配置，系统使用本地存储模拟认证流程。

### 2. 用户数据存储

用户信息存储在浏览器的localStorage中，包括：
- 用户ID
- 邮箱
- 用户名
- 头像URL
- 其他用户元数据

### 3. 头像存储

用户头像直接存储为base64或URL，无需外部存储服务。

### 4. 使用认证上下文

```tsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {user ? (
        <div>欢迎，{user.user_metadata?.username}!</div>
      ) : (
        <div>请登录</div>
      )}
    </div>
  );
}
```

### 5. 使用受保护路由

```tsx
import ProtectedRoute from './components/ProtectedRoute';

// 在路由配置中
{
  path: 'profile',
  element: (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  )
}
```

## 主要组件说明

### AuthContext
- 提供全局认证状态管理
- 基于localStorage的持久化存储
- 提供登录、注册、登出方法

### Login组件
- 支持邮箱密码登录
- 错误信息显示
- 登录后自动重定向

### Register组件
- 支持用户信息注册
- 头像上传功能
- 邮箱验证提示

### ProtectedRoute组件
- 保护需要登录才能访问的页面
- 自动重定向到登录页
- 支持登录后回到原页面

## 测试流程

1. 访问首页，点击右上角"注册"按钮
2. 填写注册信息（昵称、性别、邮箱、密码）
3. 上传头像（可选）
4. 提交注册，查看邮箱验证提示
5. 验证邮箱后，使用注册的账号登录
6. 登录成功后，点击"查看个人资料"测试受保护路由
7. 点击用户头像，选择"退出登录"测试登出功能

## 注意事项

- 用户数据仅存储在本地浏览器中
- 清除浏览器数据会丢失用户信息
- 这是一个演示系统，不适合生产环境
- 头像数据以base64格式存储
