import mongoose from "mongoose";

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then((data) => {
        console.log(`Database Connected`);
    }).catch((err) => {
        console.log(`failed to Connect Database`);
    })
}

export default databaseConnection;