const express = require("express");
const dotenv = require("dotenv").config();
const taskRoutes = require("./Routes/TaskRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const connectDB = require("./Config/db");
const colors = require("colors");
const bodyParser = require('body-parser')
const cors = require('cors')
// import express from "express"

const app = express();
app.use(cors());
const jsonParser = bodyParser.json();
app.use(jsonParser);
connectDB();
const Port = process.env.PORT;


app.use("/Task", taskRoutes);
app.use("/api/User", UserRoutes);



app.listen(Port,() => console.log(`server running on port ${Port}`.bgRed));