import mongoose from "mongoose";

const databaseConnection = () => {
    mongoose.connect(`mongodb+srv://ashishkumar:ashish123@jobkhojocluster0.2bhwv.mongodb.net/?retryWrites=true&w=majority&appName=jobKhojoCluster0`)
    .then((data) => {
        console.log(`Database Connected`);
    }).catch((err) => {
        console.log(`failed to Connect Database : ${err}`);
    })
}

export default databaseConnection;