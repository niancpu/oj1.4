@echo off
cd /d "%~dp0"

echo =====================================================
echo  启动 OJ 平台
echo =====================================================
echo.

echo [1/2] 启动后端服务器...
start "OJ Backend" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] 启动前端应用...
start "OJ Frontend" cmd /k "cd /d %~dp0\1.5 && npm run dev"

echo.
echo ✅ 两个服务器正在启动...
echo.
echo 📌 后端: http://localhost:3001
echo 📌 前端: http://localhost:5173
echo.
echo 如果后端启动失败，请查看 WINDOWS_FIX.md
echo.
pause
