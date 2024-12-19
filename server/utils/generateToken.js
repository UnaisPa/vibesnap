import jwt from "jsonwebtoken";

export const generateToken = async (userId) => {
    try {
        const token = jwt.sign({userId }, process.env.JWT_SECRET, {
            expiresIn: '90m'
        })
        //console.log(token, 'TOKEM FROM GENARATE TOKEN');
        if (token) {
            return token
        }
    } catch (error) {
        console.error('Error generating token:', error);
    }
}