import mongoose from "mongoose";

const mongoBDConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);

    mongoose.connection.on("connected", () => {
      // database name
      console.log(
        `MongoDB Connected: ${connect.connection.db.databaseName}`.cyan
          .underline.bold
      );
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Error in connecting in database.`.red.underline.bold, err);
    });
  } catch (error) {
    console.error(`Failed to connect to database`.red.underline.bold, error);
    // if faild to connect stop server
    process.exit(1);
  }
};

export default mongoBDConnect;
