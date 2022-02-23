const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log(`Success connect to Database 👏🤩😎`);
      })
      .catch((err) => {
        console.log(`😥😡${err}`);
      });
  } catch (error) { console.log(`😥😣 ${error}`);}
};
