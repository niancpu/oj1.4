import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// 忽略 ResizeObserver 循环错误
// 这些错误通常是良性的，由 Monaco Editor 的自动布局和 CSS 过渡之间的交互引起。
window.addEventListener('error', (e) => {
  // 捕获 "ResizeObserver loop completed with undelivered notifications" 
  // 和 "ResizeObserver loop limit exceeded"
  if (typeof e.message === 'string' &&
    (e.message.includes('ResizeObserver loop') || e.message.includes('undelivered notifications'))) {
    e.stopImmediatePropagation();
    // 使用 e.preventDefault() 防止其在某些浏览器中报告到控制台
    e.preventDefault();
  }
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);