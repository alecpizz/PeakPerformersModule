const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// get driver connection

const dbo = require("./db/conn");
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
     if(dbo.getDb() != null)
     {
          console.log("heh");
     }
     
});

app.get('/mongodb', (req, res) =>
{
     if(dbo.getDb() != null)
     {
          res.send({ message: 'Succesfully connected to MongoDB!' });
     }
     else
     {
          res.send({ message: 'No mongodb Found' });
     }
})
