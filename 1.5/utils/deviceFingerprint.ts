/**
 * Device Fingerprinting Utility
 * Generates a unique fingerprint for the current device/browser
 * Used for device tracking (max 2 devices per user)
 */

/**
 * Get browser and system information
 */
function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages?.join(',') || '',
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        deviceMemory: (navigator as any).deviceMemory || 0,
        maxTouchPoints: navigator.maxTouchPoints || 0,
    };
}

/**
 * Get screen information
 */
function getScreenInfo() {
    return {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
    };
}

/**
 * Get timezone information
 */
function getTimezoneInfo() {
    return {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
    };
}

/**
 * Generate canvas fingerprint
 */
function getCanvasFingerprint(): string {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return '';

        canvas.width = 200;
        canvas.height = 50;

        // Draw text with various styles
        ctx.textBaseline = 'top';
        ctx.font = '14px "Arial"';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('OJ Fingerprint 🔒', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('OJ Fingerprint 🔒', 4, 17);

        // Get canvas data
        return canvas.toDataURL();
    } catch (error) {
        console.error('Canvas fingerprint error:', error);
        return '';
    }
}

/**
 * Simple hash function for strings
 */
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
}

/**
 * Generate device fingerprint
 * Returns a unique identifier based on device characteristics
 */
export function generateDeviceFingerprint(): string {
    const browserInfo = getBrowserInfo();
    const screenInfo = getScreenInfo();
    const timezoneInfo = getTimezoneInfo();
    const canvasFingerprint = getCanvasFingerprint();

    // Combine all information
    const fingerprintData = {
        ...browserInfo,
        ...screenInfo,
        ...timezoneInfo,
        canvas: simpleHash(canvasFingerprint),
    };

    // Create a stable fingerprint string
    const fingerprintString = JSON.stringify(fingerprintData);
    const fingerprint = simpleHash(fingerprintString);

    return fingerprint;
}

/**
 * Get human-readable device name
 */
export function getDeviceName(): string {
    const ua = navigator.userAgent;

    // Detect browser
    let browser = 'Unknown Browser';
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

    // Detect OS
    let os = 'Unknown OS';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    return `${browser} on ${os}`;
}

/**
 * Get or create cached device fingerprint
 * Stores in localStorage for consistency
 */
export function getCachedDeviceFingerprint(): string {
    const STORAGE_KEY = 'oj_device_fingerprint';

    let fingerprint = localStorage.getItem(STORAGE_KEY);

    if (!fingerprint) {
        fingerprint = generateDeviceFingerprint();
        localStorage.setItem(STORAGE_KEY, fingerprint);
    }

    return fingerprint;
}
