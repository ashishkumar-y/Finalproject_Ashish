import { User } from "../model/user.model.js";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from "jsonwebtoken";
import { verifyJwt } from "../config/jwtVerify.js"

//user signup----------
export const registerUser = async (req, res) => {

    try {
        const { name, email, phoneNumber, password, role } = req.body;
        const profilePhoto = req.file ? req.file.path : null;
        const newUser = new User({
            name,
            email,
            phoneNumber,
            password,
            role,
            profile: { profilePhoto }
        })

        const savedUser = await newUser.save();
            return res.status(200).json({
                success: true,
                message: 'Customer Successfully Registered ',
                data: savedUser,
                profilePhotoPath: savedUser.profile.profilePhoto
            })
        }catch(err) {
            return res.status(404).json({
                success: false,
                message: 'failed to Register New Customer',
                error: `${err.message}`
            })
        }
    }

// user login----------
export const login = async (req, res, next) => {

        passport.authenticate("local", (err, user, info) => {
            if (err) {return res.status(500).json({ success: false, message: `Server error during authentication`, error: `${err}.` })};
            if (!user) {return res.status(401).json({ success: false, message: info ? info.message : "invalid Credential" }) };
            const role = user.role
            const logInRole = req.body.role

            if (!logInRole) {return res.status(500).json({ success: false, message: `Please select Role while Login.` })}
            if (role !== logInRole) { return res.status(500).json({ success: false, message: ` Role doesn't match` })}

            if (user) {
                const tokenData = {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }

                const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
                return res.status(201).json(
                    {
                        success: true,
                        message: `Welcome Back ${user.name} 👋`,
                        user,
                        token
                    })
            }
        })(req, res, next)
    }

    //user logout----------
    export const logout = async (req, res, next) => {
        const tokenData = {
            id: null,
            email: null,
            role: null,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY)
        return res.status(200).json({
            success: true,
            message: "Logout successful.",
            token
        });
    };



    //user update--------- 
    export const updateProfile = async (req, res) => {

        try {
            const { name, email, phoneNumber, bio, skills, profession } = req.body;

            const skillsArray = skills.split(',')
            const userId = req.id
            console.log('User ID:', userId);

            // Fetch existing user
            const existingUser = await User.findById(userId)
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const updatedUser = await User.findByIdAndUpdate(userId, {
                name, email, phoneNumber, profile: {
                    bio, skills: skillsArray, profession, profilePhoto: existingUser.profile?.profilePhoto || ""
                }
            }, { new: true })

            res.status(200).json({
                success: true,
                message: "Successfully updated data",
                data: updatedUser
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Failed to update data",
                error: err.message
            });
        }
    }


