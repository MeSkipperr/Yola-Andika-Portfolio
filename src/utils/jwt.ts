import jwt, { SignOptions, JwtPayload, VerifyErrors } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;

/**
 * Generates a JSON Web Token (JWT) for the given payload.
 *
 * @param {object} payload - The data to encode in the token.
 * @param {string | null} [expiresIn] - Optional expiration time (e.g., '1h', '30m', '7d'). If null, the token does not expire.
 * @returns {string} - The generated JWT token.
 * @throws {Error} - Throws an error if the `JWT_SECRET` is not defined.
 */
export const generateToken = (payload: object, expiresIn?: string | null): string => {
    if (!SECRET_KEY) throw new Error("JWT_SECRET is not defined");

    const options = expiresIn ? ({ expiresIn } as SignOptions) : undefined;
    return jwt.sign(payload, SECRET_KEY, options);
};

/**
 * Verifies a JSON Web Token (JWT) and returns its decoded data if valid.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {{ valid: boolean; decoded?: JwtPayload | string; error?: string }} 
 *          - `valid`: `true` if the token is valid, otherwise `false`.
 *          - `decoded`: The decoded token payload if valid.
 *          - `error`: The error message if the token is invalid or expired.
 */
export const verifyToken = (
    token: string
): { valid: boolean; decoded?: JwtPayload | string; error?: string } => {
    try {
        if (!SECRET_KEY) throw new Error("JWT_SECRET is not defined");

        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload | string;
        return { valid: true, decoded };
    } catch (error) {
        const err = error as VerifyErrors;
        return { valid: false, error: err.message };
    }
};
