import React from "react";
import { useState } from "react";

const Product = () =>
{
     const [dbText, setDbText] = useState('');
     fetch("http://localhost:5000/mongodb", {
                         method: "GET"
                    }).then((response) => response.json()).then((data) =>
                    {
                         console.log(data.message);
                         setDbText(data.message);
                    }).catch((error) =>
                    {
                         console.error("Error fetching data:", error);
                         setDbText(error.message);
                    });
     return (
          <div>
               <h1>
                    Product Name Here
               </h1>
               <p>Product Description here.</p>
               <p>Img gallery here.</p>
               <p>{dbText}</p>
          </div>
     );
};

export default Product;
