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
          await client.db("admin").command({ping: 1});
          console.log("Connected to MongodDB!");
          _db = client.db("admin");
     }
     catch(err)
     {
          console.log(err);
     }
     finally
     {
          client.close();
     }
  },
 
  getDb: function () {
    return _db;
  },
};
