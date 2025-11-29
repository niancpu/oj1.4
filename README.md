# Online Judge 在线评测平台

一个功能完整的在线编程评测平台，支持Python代码的本地评测，具备用户认证、设备追踪和进度同步功能。

## ✨ 核心特性

### 1. 🔐 用户认证系统
- **密码登录** - 使用 bcrypt 加密存储密码，确保安全性
- **设备跟踪** - 每个账户最多支持 2 台设备同时使用
- **设备指纹** - 基于浏览器特征的设备识别（User Agent、屏幕分辨率、Canvas 指纹等）
- **会话管理** - 基于 JWT 的无状态会话认证
- **隐私保护** - 可选的客户端双重加密（bcrypt + AES-256），服务端无法解密密码

### 2. 💻 代码评测
- **本地评测** - 使用 Pyodide 在浏览器中运行 Python 代码
- **实时反馈** - 即时显示评测结果和错误信息
- **多种题目** - 涵盖Python基础、流程控制、数据结构、算法等分类
- **Monaco 编辑器** - VS Code 同款编辑器，支持代码高亮和智能提示

### 3. 📊 进度追踪
- **云端同步** - 解题进度实时同步到服务器
- **历史记录** - 保存最近 10 次提交记录
- **标记完成** - 已解决的题目会被标记

### 4. 🎨 现代化UI
- **响应式设计** - 完美适配桌面和移动设备
- **玻璃拟态** - 现代化的UI设计风格
- **流畅动画** - 沉浸式用户体验

## 🏗️ 项目结构

```
oj1.4/
├── backend/                 # 后端服务器
│   ├── src/
│   │   ├── server.ts       # Express 服务器入口
│   │   ├── database.ts     # SQLite 数据库配置
│   │   ├── routes/
│   │   │   ├── auth.routes.ts      # 认证路由
│   │   │   └── progress.routes.ts  # 进度路由
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts  # JWT 认证中间件
│   │   └── utils/
│   │       └── crypto.utils.ts     # 加密工具
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                # 环境变量配置
│
└── 1.5/                    # 前端应用
    ├── components/
    │   ├── LoginPage.tsx           # 登录/注册页面
    │   ├── ProblemList.tsx         # 题目列表
    │   ├── ProblemDisplay.tsx      # 题目详情
    │   ├── CodeEditor.tsx          # 代码编辑器
    │   └── ResultPanel.tsx         # 结果面板
    ├── contexts/
    │   └── AuthContext.tsx         # 认证状态管理
    ├── services/
    │   ├── authService.ts          # 认证API服务
    │   └── pyodideService.ts       # Python评测服务
    ├── utils/
    │   └── deviceFingerprint.ts    # 设备指纹识别
    ├── App.tsx                     # 主应用组件
    ├── types.ts                    # TypeScript 类型定义
    └── package.json

```

## 🚀 快速开始

### 前置要求
- Node.js 18+ 
- npm 或 yarn

### 1. 安装依赖

**后端:**
```bash
cd backend
npm install
```

**前端:**
```bash
cd 1.5
npm install
```

### 2. 配置环境变量

**后end/.env:**
```env
PORT=3001
DATABASE_PATH=./data/oj.db
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
ENCRYPTION_KEY=your-encryption-key-32-bytes-hex
FRONTEND_URL=http://localhost:5173
```

**前端/.env:**
```env
VITE_API_URL=http://localhost:3001
```

### 3. 启动项目

**启动后端服务器:**
```bash
cd backend
npm run dev
```
服务器将运行在 `http://localhost:3001`

**启动前端应用:**
```bash
cd 1.5
npm run dev
```
应用将运行在 `http://localhost:5173`

### 4. 访问应用
打开浏览器访问 `http://localhost:5173`

首次使用需要注册账户：
1. 点击"立即注册"
2. 输入用户名（3-20字符）和密码（至少6字符）
3. 系统会自动识别您的设备
4. 注册成功后自动登录

## 🔒 安全特性

### 密码安全
1. **后端 bcrypt 加密** - 使用 bcrypt (成本因子 10) 对密码进行哈希
2. **客户端预哈希**（可选）- 密码在发送前可以先在客户端使用 bcrypt 哈希
3. **AES-256 加密**（可选）- 额外的加密层，确保服务端也无法查看明文

### 设备追踪
- **浏览器指纹** - 综合多种浏览器特征生成唯一标识
  - User Agent
  - 屏幕分辨率和色深
  - 时区和语言
  - Canvas fingerprint
  - 硬件并发数
- **最多2设备** - 强制限制每个账户最多2台设备
- **设备管理** - 用户可以移除已注册的设备

### 会话管理
- **JWT Token** - 无状态认证，默认7天有效期
- **自动刷新** - Token 在有效期内自动保持登录状态
- **安全退出** - Token 在客户端完全清除

## 📡 API 端点

### 认证相关
- `POST /api/auth/register` - 注册新用户
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/me` - 获取当前用户信息
- `GET /api/auth/devices` - 获取用户设备列表
- `DELETE /api/auth/device/:id` - 移除设备

### 进度相关
- `GET /api/progress/solved` - 获取已解决的题目
- `POST /api/progress/solved` - 标记题目为已解决
- `POST /api/progress/migrate` - 从 localStorage 迁移进度

## 🗄️ 数据库结构

### users 表
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### devices 表
```sql
CREATE TABLE devices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  device_fingerprint TEXT NOT NULL,
  device_name TEXT NOT NULL,
  last_login DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, device_fingerprint)
);
```

### user_progress 表
```sql
CREATE TABLE user_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  problem_id INTEGER NOT NULL,
  solved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, problem_id)
);
```

## 🛠️ 技术栈

### 后端
- **Node.js** + **Express** - Web 服务器框架
- **TypeScript** - 类型安全的JavaScript
- **SQLite** + **better-sqlite3** - 轻量级数据库
- **bcryptjs** - 密码加密
- **jsonwebtoken** - JWT 认证
- **crypto-js** - AES 加密（可选）
- **CORS** - 跨域资源共享

### 前端
- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Monaco Editor** - 代码编辑器
- **Pyodide** - 浏览器中的Python运行时
- **Axios** - HTTP 客户端
- **Tailwind CSS** - 样式框架

## 📝 使用指南

### 注册账户
1. 打开应用，点击"立即注册"
2. 输入用户名和密码
3. 查看密码强度提示
4. 点击"注册"按钮
5. 系统会自动识别设备并完成注册

### 登录
1. 输入用户名和密码
2. 点击"登录"按钮
3. 如果设备数量已达到上限，系统会提示移除设备

### 解题
1. 从左侧题目列表选择题目
2. 阅读题目描述和示例
3. 在编辑器中编写Python代码
4. 点击"运行并提交"按钮
5. 查看评测结果
6. 通过的题目会被自动标记为已解决

### 设备管理
- 每个账户最多可以在2台设备上使用
- 如需在新设备登录，需先在设置中移除旧设备
- 设备信息包括浏览器类型、操作系统和最后登录时间

## 🔧 开发相关

### 构建生产版本

**后端:**
```bash
cd backend
npm run build
npm start
```

**前端:**
```bash
cd 1.5
npm run build
npm run preview
```

### 环境变量说明

#### 后端环境变量
- `PORT` - 服务器端口（默认: 3001）
- `DATABASE_PATH` - SQLite 数据库文件路径
- `JWT_SECRET` - JWT 签名密钥（生产环境务必更改）
- `JWT_EXPIRES_IN` - Token 有效期（如: 7d, 24h）
- `ENCRYPTION_KEY` - AES 加密密钥（32字节十六进制）
- `FRONTEND_URL` - 前端URL，用于CORS配置

#### 前端环境变量
- `VITE_API_URL` - 后端API地址

## ⚠️ 注意事项

1. **生产环境** - 请务必更改默认的 `JWT_SECRET` 和 `ENCRYPTION_KEY`
2. **HTTPS** - 生产环境建议使用HTTPS保护数据传输
3. **数据库备份** - 定期备份 SQLite 数据库文件
4. **设备限制** - 设备追踪基于浏览器指纹，清除缓存可能导致被识别为新设备
5. **首次加载** - Pyodide 首次加载需下载约10MB数据，请耐心等待

## 🐛 故障排除

### 后端无法启动
- 检查端口3001是否被占用
- 确认环境变量配置正确
- 检查数据库目录是否有写入权限

### 前端无法连接后端
- 确认后端已启动
- 检查 `.env` 中的 `VITE_API_URL` 配置
- 查看浏览器控制台的网络请求

### 设备限制问题
- 如被误判为新设备，可在已登录设备上移除旧设备记录
- 浏览器无痕模式每次都会被识别为新设备

### Python代码执行错误
- 确保代码符合Python 3语法
- 检查是否使用了不支持的模块
- Pyodide支持大部分标准库，但某些C扩展可能不可用

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 创建 GitHub Issue
- 发送邮件至项目维护者

---

**享受编程练习的乐趣！Happy Coding! 🚀**
