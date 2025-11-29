import axios, { AxiosInstance } from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, Device } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
class AuthService {
    private api: AxiosInstance;
    private tokenKey = 'oj_auth_token';

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add token to requests automatically
        this.api.interceptors.request.use((config) => {
            const token = this.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    /**
     * Register a new user
     */
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await this.api.post<AuthResponse>('/api/auth/register', credentials);
        this.setToken(response.data.token);
        return response.data;
    }

    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await this.api.post<AuthResponse>('/api/auth/login', credentials);
        this.setToken(response.data.token);
        return response.data;
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await this.api.post('/api/auth/logout');
        } finally {
            this.removeToken();
        }
    }

    /**
     * Get current user info
     */
    async getCurrentUser() {
        const response = await this.api.get('/api/auth/me');
        return response.data.user;
    }

    /**
     * Get user's devices
     */
    async getDevices(): Promise<Device[]> {
        const response = await this.api.get<{ devices: Device[] }>('/api/auth/devices');
        return response.data.devices;
    }

    /**
     * Remove a device
     */
    async removeDevice(deviceId: number): Promise<void> {
        await this.api.delete(`/api/auth/device/${deviceId}`);
    }

    /**
     * Get solved problems
     */
    async getSolvedProblems(): Promise<number[]> {
        const response = await this.api.get<{ solvedProblems: number[] }>('/api/progress/solved');
        return response.data.solvedProblems;
    }

    /**
     * Mark problem as solved
     */
    async markProblemSolved(problemId: number): Promise<void> {
        await this.api.post('/api/progress/solved', { problemId });
    }

    /**
     * Migrate solved problems from localStorage
     */
    async migrateSolvedProblems(solvedProblems: number[]): Promise<void> {
        await this.api.post('/api/progress/migrate', { solvedProblems });
    }

    /**
     * Store token in localStorage
     */
    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    /**
     * Get token from localStorage
     */
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Remove token from localStorage
     */
    private removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

// Export singleton instance
export const authService = new AuthService();
