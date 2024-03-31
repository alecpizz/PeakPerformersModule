import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


const Product = () =>
{
     const [structureInfo, setStructureInfo] = useState('');

     let {productId} = useParams();

     const requestOptions = { method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ pageID: {productId}.productId }) };

     fetch("http://localhost:5000/product", requestOptions).then((response) => response.json()).then((data) =>
     {
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
