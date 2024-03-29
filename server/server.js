const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
     if (dbo.getDb() != null)
     {
          console.log("heh");
     }

});

app.get('/mongodb', (req, res) =>
{
     if (dbo.getDb() != null)
     {
          res.send({ message: 'Succesfully connected to MongoDB!' });
     }
     else
     {
          res.send({ message: 'No mongodb Found' });
     }
});

app.post('/product', async (req, res) =>
{
     const pageID = req.body.pageID;
     var fail = false;
     if (dbo.getDb() != null)
     {
          //MONGODB QUERY HERE
          var info = await dbo.getStructureInfo(pageID);
          if (info == null)
          {
               fail = true;
          }
          else
          {
               res.send(info);
          }
     }
     else
     {
          fail = true;
     }
     if (fail)
     {
          res.send({
               structureName: 'Missing Structure Name',
               structureDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis magna vel dolor efficitur efficitur. Donec aliquet vehicula mi et cursus. Suspendisse lacinia urna tellus, ac rhoncus purus efficitur vitae. Maecenas laoreet elit neque, eget lacinia purus consequat sit amet. Phasellus nulla velit, molestie id dolor sed, feugiat suscipit metus. Suspendisse sodales enim ac mauris eleifend congue. Vivamus gravida imperdiet augue, eget commodo diam congue a. In consequat cursus nisl, id eleifend orci imperdiet non. Donec id porta enim, vel pellentesque sem. Aliquam sit amet tristique lacus, et mollis lorem. Sed fringilla vestibulum tellus. Suspendisse luctus ante finibus, accumsan tortor quis, tempor elit. Quisque laoreet metus id diam cursus varius. ',
               image_main: 'https://loremflickr.com/320/240',
               sub_image: 'https://loremflickr.com/320/240/'
          });
     }
});

app.get('/mongodb/insert', (req, res) =>
{
     if (dbo.getDb() != null)
     {
          dbo.insertStructureInfo('24', 'A great 3D printed structure!', 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Caterpillar-shortened.svg', 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Caterpillar-shortened.svg');
     }
});

app.get('/mongodb/delete', (req, res) =>
{
     if (dbo.getDb() != null)
     {
          dbo.deleteStructureInfo();
     }
});


app.get('/mongodb/structureInfo', async (req, res) =>
{

     var fail = false;
     if (dbo.getDb() != null)
     {
          //MONGODB QUERY HERE
          var info = await dbo.getStructureInfo();
          if (info == null)
          {
               fail = true;
          }
          else
          {
               res.send(info);
          }
     }
     else
     {
          fail = true;
     }
     if (fail)
     {
          res.send({
               structureName: 'Missing Structure Name',
               structureDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis magna vel dolor efficitur efficitur. Donec aliquet vehicula mi et cursus. Suspendisse lacinia urna tellus, ac rhoncus purus efficitur vitae. Maecenas laoreet elit neque, eget lacinia purus consequat sit amet. Phasellus nulla velit, molestie id dolor sed, feugiat suscipit metus. Suspendisse sodales enim ac mauris eleifend congue. Vivamus gravida imperdiet augue, eget commodo diam congue a. In consequat cursus nisl, id eleifend orci imperdiet non. Donec id porta enim, vel pellentesque sem. Aliquam sit amet tristique lacus, et mollis lorem. Sed fringilla vestibulum tellus. Suspendisse luctus ante finibus, accumsan tortor quis, tempor elit. Quisque laoreet metus id diam cursus varius. ',
               image_main: 'https://loremflickr.com/320/240',
               sub_image: 'https://loremflickr.com/320/240/'
          });
     }
})
