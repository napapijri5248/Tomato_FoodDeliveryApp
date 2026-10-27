import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized, Login again"
        })
    }
    try {
        const decode_token = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body) {
            req.body = {}
        }
        req.body.userId = decode_token.id;
        req.userId = decode_token.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error verifying Token"
        })

    }
}

export { authMiddleware }