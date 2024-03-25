const { MongoClient, ServerApiVersion } = require("mongodb");
const URI = process.env.ATLAS_URI;
const client = new MongoClient(URI, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});
 
var _db = null;
 
module.exports = {
  connectToServer: async function (callback) {
     await client.connect();
     try
     {
          await client.db("peakPerformers").command({ping: 1});
          console.log("Connected to MongodDB!");
          var db = client.db("peakPerformers");
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

  insertStructureInfo: function(structureName, structureDescription, image_main, sub_image){
     _db.insertOne({
          structureName: structureName,
          structureDescription: structureDescription,
          image_main: image_main,
          sub_image: sub_image
     })
  },

  getStructureInfo: async function(){
     const structure = await _db.findOne();
     return structure;
  },

  updateStructureInfo: function(structureName, structureDescription, image_main, sub_image){
     _db.updateOne({
          $set: {

               structureName: structureName,
               structureDescription: structureDescription,
               image_main: image_main,
               sub_image: sub_image
          },
          $currentDate: {lastUpdated: true}
     })
  },

  deleteStructureInfo: function(){
     _db.deleteMany({});
  }
};
