const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const catalogRouter = require('./routes/catalog');
const productRouter = require('./routes/product');
// get driver connection

const dbo = require("./config/db/conn");
app.listen(port, () =>
{
     //   perform a database connection when server starts
     dbo.connectToServer(function (err)
     {
          if (err)
          {
               console.error(err);
          }
     });
     console.log(`Server is running on port: ${port}`);
});

app.use('/catalog', catalogRouter);
app.use('/product', productRouter);


