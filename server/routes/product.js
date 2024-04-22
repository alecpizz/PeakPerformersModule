const express = require('express')
const router = express.Router();
const dbo = require("../config/db/conn");

async function getStructureInfo(structureID){
     var query = {structure_id: (structureID)};
     var result = await dbo.getDb().findOne(query);
     return result;
}

router.post('/', async (req, res) =>
{
     var pageID = req.body.pageID;
     var fail = false;
     if (dbo.getDb() != null)
     {
          //MONGODB QUERY HERE
          var info = await getStructureInfo(parseInt(pageID));
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
               structureName: 'Failed to get structure'
          });
     }
});

module.exports = router;
