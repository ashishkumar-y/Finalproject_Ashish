import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
    var token;
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            res.status(400).json({
                message: "Token is not available sorry"
            })
        } 
        console.log('Token:', token);

            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.log('Token verification failed:', err);
                    return res.status(404).json({ message: "Token is Expired or invalid." })
                } else {
                    console.log('Decoded token:', decoded);
                    req.id =  decoded.id;
                    req.role = decoded.role;
                    next()
                }
            })
        
    } else {
        return res.status(401).json({ message: "Authorization header not available." });
    }
}