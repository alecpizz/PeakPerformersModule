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
          var test = await this.getAllStructureInfo();
          console.log(test);
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


  getStructureInfo: async function(structureID){
     var query = {structure_id: (structureID)};
     var result = await _db.findOne(query);
     return result;
  },
  
  getAllStructureInfo: async function(){
     var result = await _db.find().toArray();
     return result;
  }

};
