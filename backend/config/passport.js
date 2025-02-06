import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { User } from "../model/user.model.js";
import mongoose from "mongoose";

passport.use(new LocalStrategy({ usernameField: "email" },
    async (email, password, done) => {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (isMatch) {
                        return done(null, user,)
                    } else {
                        return done(null, false, { message: "password does not Match, Try Again !" })
                    } 
                }).catch((err) => {
                    return done(err, false, { message: "An error occurred while verifying the password." })
                })
            }
            if (!user) {
                return done(null, false, { message: "Email not Found" })
            }
        }).catch((err) => {
            return done(err, false, { message: "An error occurred while finding the user." })
        })
    }
))


passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});

export default passport;