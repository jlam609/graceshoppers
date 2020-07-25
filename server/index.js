const express = require("express");
const { seed, models} = require("./db");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));


const startServer = () =>
  new Promise(() => {
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  });

seed(true).then(startServer);