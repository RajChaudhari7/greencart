import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: 'not authorized' });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token Decode:', tokenDecode); // Log token decode
        if (tokenDecode.id) {
            req.body = req.body || {}; // Ensure req.body is initialized
            req.body.userId = tokenDecode.id;
            console.log('req.body after setting userId:', req.body); // Log req.body
        } else {
            return res.json({ success: false, message: 'not authorized' });
        }
        next();
    } catch (error) {
        console.log('Error in authUser:', error.message);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;