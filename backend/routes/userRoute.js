import express from "express";
import { verifyJwt } from "../config/jwtVerify.js";
import { registerUser, login, logout, updateProfile } from "../controller/user.Controller.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploadsData')
    },
        filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage })
const routes = express.Router()

routes.use('/uploadsData', express.static('uploadsData'));
routes.post('/signup', upload.single('profilePhoto'), registerUser);
routes.post('/login', login);
routes.get('/logout', logout);
routes.post('/profile/update', verifyJwt, upload.single('resume'), updateProfile)



export default routes;







