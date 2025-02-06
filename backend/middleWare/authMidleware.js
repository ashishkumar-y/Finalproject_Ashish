import jwt from 'jsonwebtoken'

export const adminOnly = (req, res, next) => {
    // Check if the role is 'admin'
    if (req.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admins only." });
    }
    next();  // Allow admin to access the route
};
