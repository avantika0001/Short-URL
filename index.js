const express = require("express");
const path = require("path");
const urlRoutes = require("./routes/routes"); //import router
const staticRoutes = require("./routes/staticRouter"); //import router
const { connectDB } = require("./connect");
const URL = require("./models/model");
require("dotenv").config({ path: "./config.env" });

//initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

//middleware to parse incoming req body
app.use(express.json());

//middleware to parse incoming req body from FORM
app.use(express.urlencoded({ extended: false })); //this means we support json as well as form data

//setting up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoutes);
app.use("/", staticRoutes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
