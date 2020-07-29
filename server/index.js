const express = require("express");
const { seed, models } = require("./db");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {userRouter, orderRouter, productRouter, categoryRouter} = require('./routes')

dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, '../assets')));

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/categories', categoryRouter)

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
    if(err){
      res.status(500).send(err)
    }
  })
})
const startServer = () =>
  new Promise(() => {
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  });

seed(true).then(startServer);
