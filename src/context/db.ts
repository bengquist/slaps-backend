const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  dbName: "slaps"
});
mongoose.connection.once("open", () => console.log(`Mongo is connected`));
