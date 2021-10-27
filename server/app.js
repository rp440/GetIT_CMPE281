var express = require("express");
var app = express();
var path = require("path");
var dotenv = require("dotenv").config();
var routes = require("./routes");
var session = require("express-session");
const cors = require("cors");
var bodyParser = require("body-parser");

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", routes);

app.listen(5000, () => {
  console.log("server started");
});
