import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generate JWT Token
 * @param {Object} payload - User data to encode in the token
 * @returns {string} JWT token
 */
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Format API Response
 * @param {boolean} success - Status of the operation
 * @param {string} message - Message describing the response
 * @param {Object} data - Data payload (optional)
 * @returns {Object} API Response object
 */
export const formatResponse = (success, message, data = null) => {
    return { success, message, data };
};

/**
 * Validate Required Fields
 * @param {Object} body - Request body object
 * @param {Array} fields - List of required fields
 * @returns {Object | null} Error object if missing fields, else null
 */
export const validateFields = (body, fields) => {
    let missingFields = fields.filter(field => !body[field]);
    if (missingFields.length > 0) {
        return { success: false, message: `Missing fields: ${missingFields.join(', ')}` };
    }
    return null;
};
