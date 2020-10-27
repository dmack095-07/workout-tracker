const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3010;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("develop/public"));

mongoose.connect(process.env.ATLAS_URI || "mongodb://localhost/workouts", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected!");
})

//routes
app.use(require("./develop/routes/api.js"));
app.use(require("./develop/routes/view.js"));

app.listen(PORT, () => {
  console.log('App running on port ${PORT}!');
});