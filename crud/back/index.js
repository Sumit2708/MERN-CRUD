const express = require("express");
require("dotenv").config;
const mongoose = require("mongoose");
const users = require("./model/schema");
const port = 8003;
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user_routes");

app.use(cors());
app.use(express.json());

app.use('/',userRoutes);

const DB =
  "mongodb://mern:jYrpzqWEEOrI4SbY@ac-roudenv-shard-00-00.cndgkgi.mongodb.net:27017,ac-roudenv-shard-00-01.cndgkgi.mongodb.net:27017,ac-roudenv-shard-00-02.cndgkgi.mongodb.net:27017/?ssl=true&replicaSet=atlas-14mips-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection established"))
  .catch((err) => console.log(err.message));

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

//jYrpzqWEEOrI4SbY
