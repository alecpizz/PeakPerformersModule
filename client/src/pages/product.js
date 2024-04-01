import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


const Product = () => {
     const [structureInfo, setStructureInfo] = useState('');

     let { productId } = useParams();

     const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageID: { productId }.productId })
     };

     fetch("http://localhost:5000/product", requestOptions).then((response) => response.json()).then((data) => {
          setStructureInfo(data);
     }).catch((error) => {
          console.error("Error fetching data:", error);
          setStructureInfo(error.message);
     });

     return (
          <div>
               <div>
                    <h1>{{ productId }.productId}</h1>
                    <h1>{structureInfo.structure_type}</h1>
                    <p>{structureInfo.price}</p>
               </div>
               <div>
                    <img src={structureInfo.image_main}></img>
               </div>
               <img src={structureInfo.sub_image}></img>
          </div>

     );
};

export default Product;
