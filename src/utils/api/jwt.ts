import axios from "axios";

/**
 * Function to create a token.
 * @param payload - The payload data to encode in the token.
 * @param expires - Optional expiration time (e.g., '1h', '30m', '7d').
 * @returns The generated token or null if there's an error.
 */
export const createToken = async (payload: object, expires = null) => {
    try {
        const response = await axios.post("/api/jwt", { payload, expires });
        return response;
    } catch (error) {
        console.error("Error creating token:", error);
        return null;
    }
};

/**
 * Function to verify a token.
 * @param token - The JWT token to verify.
 * @returns The decoded token data if valid, otherwise null.
 */
export const verifyToken = async (token: string) => {
    try {
        const response = await axios.get(`/api/jwt?token=${encodeURIComponent(token)}`);
        return response;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
};
