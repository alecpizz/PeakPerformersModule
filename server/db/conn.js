const { MongoClient, ServerApiVersion } = require("mongodb");
const URI = process.env.ATLAS_URI;
const client = new MongoClient(URI, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});
 
var _db;

module.exports = {
  connectToServer: async function (callback) {
     await client.connect();
     try
     {
          await client.db("CAT_3DCP").command({ping: 1});
          console.log("Connected to MongodDB!");
          var db = client.db("CAT_3DCP");
          _db = db.collection("Structures");
     }
     catch(err)
     {
          console.log(err);
     }
     finally
     {
          //client.close();
     }
  },
 
  getDb: function () {
    return _db;
  },

//   insertStructureInfo: function(structureName, structureDescription, image_main, sub_image){
//      _db.insertOne({
//           structureName: structureName,
//           structureDescription: structureDescription,
//           image_main: image_main,
//           sub_image: sub_image
//      })
//   },

  getStructureInfo: async function(structureID){
     var query = {structure_id: (structureID)};
    // console.log(query);
     var result = await _db.findOne(query);
    // console.log(result);
     return result;
  }

//   updateStructureInfo: function(structureName, structureDescription, image_main, sub_image){
//      _db.updateOne({
//           $set: {

//                structureName: structureName,
//                structureDescription: structureDescription,
//                image_main: image_main,
//                sub_image: sub_image
//           },
//           $currentDate: {lastUpdated: true}
//      })
//   },

//   deleteStructureInfo: function(){
//      _db.deleteMany({});
//   }
};
