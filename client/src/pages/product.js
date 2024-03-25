import React from "react";
import { useState } from "react";

const Product = () =>
{
     const [structureInfo, setStructureInfo] = useState('');
     fetch("http://localhost:5000/mongodb/structureInfo", {
          method: "GET"
     }).then((response) => response.json()).then((data) =>
     {
          console.log(data);
          setStructureInfo(data);
     }).catch((error) =>
     {
          console.error("Error fetching data:", error);
          setStructureInfo(error.message);
     });


     return (
          <div>
               <div>
                    <h1>Sample Data</h1>
                    <ul>
                         <li>StructureName: Structure Name!</li>
                         <li>StructureDescription: A great 3D printed structure!</li>
                         <li>Main Image: A placeholder image</li>
                         <li>Sub Image: A smaller placeholder image</li>
                    </ul>
                    <button onClick={() => fetch("http://localhost:5000/mongodb/insert")}>Insert Sample Data</button>
                    <button onClick={() => fetch("http://localhost:5000/mongodb/delete")}>Delete Data</button>
                    <h1>{structureInfo.structureName}</h1>
                    <p>{structureInfo.structureDescription}</p>
               </div>
               <div>
                    <img src={structureInfo.image_main}></img>
               </div>
               <img src={structureInfo.sub_image}></img>
          </div>

     );
};

export default Product;
