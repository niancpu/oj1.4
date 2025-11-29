import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getCachedDeviceFingerprint, getDeviceName } from '../utils/deviceFingerprint';

const LoginPage: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('请填写所有字段');
            return;
        }

        if (username.length < 3 || username.length > 20) {
            setError('用户名长度必须在 3-20 个字符之间');
            return;
        }

        if (password.length < 6) {
            setError('密码长度至少为 6 个字符');
            return;
        }

        if (!isLoginMode && password !== confirmPassword) {
            setError('两次输入的密码不一致');
            return;
        }

        setIsLoading(true);

        try {
            const deviceFingerprint = getCachedDeviceFingerprint();
            const deviceName = getDeviceName();

            if (isLoginMode) {
                await login(username, password, deviceFingerprint, deviceName);
            } else {
                await register(username, password, deviceFingerprint, deviceName);
            }
        } catch (err: any) {
            console.error('Auth error:', err);

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (err.response?.data?.deviceLimitReached) {
                setError('已达到设备数量上限（2台）。请在设置中移除一台设备后再试。');
            } else {
                setError(isLoginMode ? '登录失败，请检查用户名和密码' : '注册失败，请稍后重试');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError('');
        setPassword('');
        setConfirmPassword('');
    };

    const getPasswordStrength = (pwd: string): { level: number; text: string; color: string } => {
        if (!pwd) return { level: 0, text: '', color: '' };
        if (pwd.length < 6) return { level: 1, text: '弱', color: '#ef4444' };
        if (pwd.length < 10) return { level: 2, text: '中', color: '#f59e0b' };
        if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
            return { level: 3, text: '强', color: '#10b981' };
        }
        return { level: 2, text: '中', color: '#f59e0b' };
    };

    const passwordStrength = !isLoginMode ? getPasswordStrength(password) : null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center animated-bg relative overflow-hidden p-4">
            {/* Floating animated shapes */}
            <div className="floating-shapes">
                <div className="floating-shape"></div>
                <div className="floating-shape"></div>
                <div className="floating-shape"></div>
                <div className="floating-shape"></div>
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md z-10">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Online Judge
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isLoginMode ? '登录你的账户' : '创建新账户'}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                用户名
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                placeholder="请输入用户名（3-20字符）"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                密码
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none pr-12"
                                    placeholder="请输入密码（至少6个字符）"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {!isLoginMode && passwordStrength && passwordStrength.level > 0 && (
                                <div className="mt-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full transition-all duration-300"
                                                style={{
                                                    width: `${(passwordStrength.level / 3) * 100}%`,
                                                    backgroundColor: passwordStrength.color,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password (Register only) */}
                        {!isLoginMode && (
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    确认密码
                                </label>
                                <input
                                    id="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                    placeholder="请再次输入密码"
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>{isLoginMode ? '登录中...' : '注册中...'}</span>
                                </>
                            ) : (
                                <span>{isLoginMode ? '登录' : '注册'}</span>
                            )}
                        </button>
                    </form>

                    {/* Toggle Mode */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={toggleMode}
                            className="text-sm text-gray-600 hover:text-blue-600 transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoginMode ? (
                                <>还没有账户？<span className="font-semibold ml-1">立即注册</span></>
                            ) : (
                                <>已有账户？<span className="font-semibold ml-1">立即登录</span></>
                            )}
                        </button>
                    </div>

                    {/* Device Info Note */}
                    <div className="mt-6 p-3 bg-blue-50/80 backdrop-blur-sm rounded-lg">
                        <p className="text-xs text-blue-600 text-center flex items-center justify-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>每个账户最多可在 2 台设备上使用</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
