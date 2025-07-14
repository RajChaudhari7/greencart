import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.json({ success: false, message: "not authorized" })
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        console.log('Token Decode:', tokenDecode); // Log token decode
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.json({ success: false, message: 'not authorized' });
        }

    } catch (error) {
        console.log('Error in authUser:', error.message);
        res.json({ success: false, message: error.message });
    }

}

export default authSeller;