# Windows 下 better-sqlite3 安装问题修复指南

## 问题说明

在 Windows 系统上，`better-sqlite3` 需要编译本机模块，但可能因为缺少编译工具而失败。

**当前环境**: Node.js v24.11.1, Windows x64

## 🚀 快速解决方案

### 方案 1: 安装 Visual Studio Build Tools（推荐）

这是最可靠的解决方案：

1. **下载并安装 Visual Studio Build Tools**
   - 访问: https://visualstudio.microsoft.com/zh-hans/downloads/
   - 下载"Visual Studio 2022 生成工具"
   - 安装时选择"使用 C++ 的桌面开发"工作负载

2. **重新安装 better-sqlite3**
   ```powershell
   cd e:\Projects\AI\oj1.4\backend
   npm rebuild better-sqlite3
   ```

3. **启动服务器**
   ```powershell
   npm run dev
   ```

### 方案 2: 降级 Node.js 版本

使用较旧的 Node.js 版本（如 LTS 20.x）可能有预编译的二进制文件：

1. **安装 nvm-windows** (Node 版本管理器)
   - 下载: https://github.com/ coreyb  utler/nvm-windows/releases
   
2. **切换Node版本**
   ```powershell
   nvm install 20.11.0
   nvm use 20.11.0
   ```

3. **重新安装依赖**
   ```powershell
   cd e:\Projects\AI\oj1.4\backend
   npm install
   npm run dev
   ```

### 方案 3: 使用预编译包 (最快)

如果方案1和2都不可行，可以尝试直接下载预编译的二进制文件：

1. **手动下载预编译文件**
   - 访问: https://github.com/WiseLibs/better-sqlite3/releases
   - 下载对应 Node v24 的 Windows x64 预编译文件

2. **放置到正确位置**
   ```powershell
   # 解压后放到
   e:\Projects\AI\oj1.4\backend\node_modules\better-sqlite3\build\Release\
   ```

### 方案 4: 仅运行前端查看 UI

如果暂时无法解决后端问题，可以先查看前端界面：

```powershell
cd e:\Projects\AI\oj1.4\1.5
npm run dev
```

然后访问 `http://localhost:5173` 查看登录页面UI（功能需要后端支持）

## 📝 验证安装success

运行以下命令检查 better-sqlite3 是否正常：

```powershell
cd e:\Projects\AI\oj1.4\backend
node -e "console.log(require('better-sqlite3'))"
```

如果没有错误，说明安装成功！

## 🔍 常见错误

### 错误 1: "找不到模块"
```
Error: Cannot find module 'E:\...\better_sqlite3.node'
```
**解决**: 需要编译环境，使用方案1或方案2

### 错误 2: "gyp ERR! not ok"
```
npm error gyp ERR! not ok
```
**解决**: 缺少C++编译工具，使用方案1

### 错误 3: "msbuild.exe 不是内部或外部命令"
```
'msbuild.exe' is not recognized
```
**解决**: 安装 Visual Studio Build Tools (方案1)

## ✅ 启动成功标志

当后端成功启动时，您会看到：

```
✅ Database initialized successfully
🚀 Server running on http://localhost:3001
📝 Environment: development
🔗 Accepting requests from: http://localhost:5173
```

## 🆘 仍然无法解决？

如果以上方法都无效，请提供以下信息：

1. Node.js 版本: `node --version`
2. npm 版本: `npm --version`
3. Windows 版本: `winver`
4. 错误日志: 复制完整的错误信息

或者考虑使用 Docker 容器运行（避免编译问题）。

## 📱 联系支持

- 查看项目 README.md获取更多信息
- 参考 walkthrough.md 了解项目功能
