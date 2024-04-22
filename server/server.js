const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const uri = "mongodb+srv://astapay:O5nNSBNcchWTCpdY@cluster0.idroylb.mongodb.net/";


const catalogRouter = require('./routes/catalog')
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

app.post("/catalog/1", async (req, res) => {
    //const wasd = await House.findOne({ structure_type: "house"}, { _id: 1 });
    const reqBody = req.body;
    console.log(reqBody);
    // if(reqBody == 1) {
    //     console.log("This is when tag 1 vale == 1");
    //     const wasd = await House.find( {structure_type: "house"}).limit(3);
    //     res.status(201).json(wasd);
    // }
    try {
        const structures = await dbo.getUniqueStructureInfo(reqBody.query);
        //const wasd = await House.find();
        //const wasd2 = await House.findOne({ structure_id: 4});
        //const testArray = [wasd, wasd2]
        //res.status(201).json(wasd);
        //res.status(201).json(wasd);
        //const allTheThings = await dbo.getAllStructureInfo();
       // console.log(allTheThings);
       console.log(structures);
        res.status(201).json(structures);
    }catch(err) {
        res.status(400).json( { message: err.message } )
    }
})

app.use('/catalog', catalogRouter);
//const structureRouter = require('./routes/structureRouter');
const structureRouter = require('./routes/catalog');
app.use('/structure', structureRouter);


app.post('/product', async (req, res) =>
{
     var pageID = req.body.pageID;
     var fail = false;
     if (dbo.getDb() != null)
     {
          //MONGODB QUERY HERE
          var info = await dbo.getStructureInfo(parseInt(pageID));
          if (info == null)
          {
               fail = true;
          }
          else
          {
               res.send(JSON.stringify(info));
          }
     }
     else
     {
          fail = true;
     }
     if (fail)
     {
          res.send({
               structureName: 'Failed to get structure',
               structureDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis magna vel dolor efficitur efficitur. Donec aliquet vehicula mi et cursus. Suspendisse lacinia urna tellus, ac rhoncus purus efficitur vitae. Maecenas laoreet elit neque, eget lacinia purus consequat sit amet. Phasellus nulla velit, molestie id dolor sed, feugiat suscipit metus. Suspendisse sodales enim ac mauris eleifend congue. Vivamus gravida imperdiet augue, eget commodo diam congue a. In consequat cursus nisl, id eleifend orci imperdiet non. Donec id porta enim, vel pellentesque sem. Aliquam sit amet tristique lacus, et mollis lorem. Sed fringilla vestibulum tellus. Suspendisse luctus ante finibus, accumsan tortor quis, tempor elit. Quisque laoreet metus id diam cursus varius. ',
               image_main: 'https://loremflickr.com/320/240',
               sub_image: 'https://loremflickr.com/320/240/'
          });
     }
});
