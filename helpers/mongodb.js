const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    `mongodb+srv://mz:${process.env.MONGO_PASSWORD}@cluster0.mfwoq9t.mongodb.net/?retryWrites=true&w=majority`
  );

  mongoose.connection.on("open", () => {
    console.log("CONNECTED TO MONGODB");
  });

  mongoose.connection.on("error", (err) => {
    console.log("MONGO ERROR: " + err);
  });

  //mongoose.Promise = global.Promise;
};
