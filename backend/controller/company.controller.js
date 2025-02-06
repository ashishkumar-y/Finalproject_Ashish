import { User } from "../model/user.model.js";
import { Company } from "../model/company.model.js"
import mongoose from "mongoose";


// create Company ------------
export const registerCompany = async (req, res) => {
    const { name, description, website, location, logo } = req.body;

    if (!name) {
        return res.status(404).json({
            success: false,
            message: "company name is required"
        })
    }

    const newCompany = await Company({
        name,
        description,
        website,
        location,
        logo,
        userId: req.id
    })

    newCompany.save().then((docs) => {
        return res.status(200).json({
            success: true,
            message: 'Company Successfully Registered ',
            data: docs
        })
    }).catch((err) => {
        return res.status(404).json({
            success: false,
            message: 'failed to Register New Company',
            error: `${err.message}`
        })
    })

}

// get all Companies ---------------
export const getCompany = async (req, res) => {

    const userId = req.id //logged in userId
    Company.find({ userId }).then((docs) => {

        if (!docs) {
            return res.status(404).json({
                success: false,
                message: 'no company found',
                error: `${err.message}`
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully fetch all companies ',
            totalCompanies: docs.length,
            data: docs
        })
    }).catch((err) => {
        return res.status(404).json({
            success: false,
            message: 'failed to fetch Companies',
            error: `${err.message}`
        })
    })

}

//get Company By Id----------
export const getCompanyById = async (req, res) => {
    const companyId = req.params.id

    await Company.findById(companyId).then((docs) => {
        if (!docs) {
            return res.status(404).json({
                success: false,
                message: 'no company found',
                error: `${err.message}`
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched company ',
            totalCompanies: docs.length,
            data: docs
        })
    }).catch((err) => {
        return res.status(404).json({
            success: false,
            message: 'failed to fetch Company',
            error: `${err.message}`
        })
    })
}

//update Company ------------
export const updateCompany = async (req, res) => {

    try {
        const { name, description, website, location, } = req.body;
        const logo = req.file
        const companyId = req.params.id
        const updateData = { name, description, website, location, logo }
        const existingCompany = await Company.findById(companyId)

        if (!existingCompany) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        const updatedCompany = await Company.findByIdAndUpdate(companyId, {
            name,
            description,
            website,
            location,
            logo

        }, { new: true })
        
        res.status(200).json({
            success: true,
            message: "Successfully updated data",
            data: updatedCompany
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update data",
            error: err.message
        });
    }


}
