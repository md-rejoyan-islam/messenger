import mongoose from "mongoose";

const mongoBDConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    // database name
    console.log(
      `MongoDB Connected: ${connect.connection.db.databaseName}`.cyan.underline
        .bold
    );

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
  }
};

export default mongoBDConnect;
