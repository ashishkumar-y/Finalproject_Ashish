import mongoose from "mongoose";

const databaseConnection = async () => {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected');
      }
    } catch (err) {
      console.error('Database Connection Error:', err);
    }
  };


  export default databaseConnection