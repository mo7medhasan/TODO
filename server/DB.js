const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


try {
   mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`Success connect to Database 👏🤩😎`);
    })
    .catch((err) => {
      console.log(`😥😡${err}`);
    });
} catch (error) {
  console.log(`😥😣 ${error}`);
}
