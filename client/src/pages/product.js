import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
    const [structureInfo, setStructureInfo] = useState('');
    const [open, setOpen] = useState(false);

     let { productId } = useParams();
     const [options, setOptions] = useState('');
     const [price, setPrice] = useState('');
     const [images, setImages] = useState('');
     const [mainImage, setMainImage] = useState('');

     useEffect(() => {
          const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ pageID: { productId }.productId })
          };
     
          fetch("http://localhost:5000/product", requestOptions).then((response) => response.json()).then((data) => {
               setStructureInfo(data);
               setOptions([data.custom_options[0], data.custom_options[1], data.custom_options[2], data.custom_options[3]]);
               setPrice(data.price[0]);
               setImages(data.images);
               setMainImage(data.images[0]);
          }).catch((error) => {
               console.error("Error fetching data:", error);
               setStructureInfo(error.message);
          });
     });

     
    // var images = structureInfo.images[0];
     //images = images.split("https").map(x => {return "https" + x}).slice(1);

     return (
          <div>
               <div>
                    <h1>{{ productId }.productId}</h1>
                    <h1>{structureInfo.structure_type}</h1>
                    <p>Price ${price}</p>
                    <p>Created by: {structureInfo.user_id}</p>
               </div>
               <div>
                    <img src={mainImage}></img>
               </div>
             <img src={images[1]}></img>
             <div><h5>Product description</h5></div>
             <div className='menu-container'>
                 <div className='menu-trigger' onClick={() => {setOpen(!open) } }>
                    <h4>Click for Options</h4>
                 </div>
                 <div className={`dropdown-menu ${open? 'active' : 'inactive' }`}>
                     <ul>
                         <DropdownItem text={options[0]} />
                         <DropdownItem text={options[1]} />
                         <DropdownItem text={options[2]} />
                         <DropdownItem text={options[3]} />
                     </ul>
                 </div>
             </div>
          </div>
     );
};

function DropdownItem(props) {
    return (
        <li className = 'dropdownItem'>
            <a> {props.text} </a>
        </li>
    );
}

export default Product;
