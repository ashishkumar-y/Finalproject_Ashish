import express from "express";
import { Company } from "../model/company.model.js"
import { verifyJwt } from "../config/jwtVerify.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js"


import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploadsData')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({storage });
const routes = express.Router();

routes.post('/register', verifyJwt, registerCompany)
routes.get("/get", verifyJwt, getCompany)
routes.get("/get/:id", verifyJwt, getCompanyById)
routes.post('/updateCompany/:id', verifyJwt, upload.single('resume'), updateCompany)

routes.get('/test', (req, res) => { res.send('this is test Route') })


export default routes;


























