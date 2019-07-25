const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const url = process.env.DB_URL;

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once("open", () => console.log(`Mongo is connected`));
