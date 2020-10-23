const express = require("express");
const logger = require("morgan");
//const mongojs = require("mongojs");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3009;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });


//routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log('App running on port ${PORT}!');
});