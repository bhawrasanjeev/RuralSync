/**
 * Centralized API Configuration for RuralSync Frontend
 *
 * Resolves the backend REST API base URL from the environment variable (VITE_API_URL)
 * with a standardized fallback to port 5001. Trailing slashes are stripped for consistency.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001').replace(/\/+$/, '');

export default API_BASE_URL;
