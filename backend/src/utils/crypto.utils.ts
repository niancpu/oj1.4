import CryptoJS from 'crypto-js';

/**
 * Optional encryption layer for enhanced privacy
 * This provides an additional layer of encryption on top of bcrypt
 * so that even the server database cannot reverse the passwords
 */

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';

/**
 * Encrypt data using AES-256
 */
export function encrypt(data: string): string {
    try {
        return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
}

/**
 * Decrypt data using AES-256
 * Note: In the enhanced privacy mode, we never actually use this
 * because passwords are hashed, not encrypted. This is here for
 * potential future use with other sensitive data.
 */
export function decrypt(encryptedData: string): string {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
}

/**
 * Generate a random salt
 */
export function generateSalt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

/**
 * Hash data with SHA-256 (for fingerprints, not passwords)
 */
export function hashSHA256(data: string): string {
    return CryptoJS.SHA256(data).toString();
}
