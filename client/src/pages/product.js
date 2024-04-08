import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
    const [structureInfo, setStructureInfo] = useState('');
    const [open, setOpen] = useState(false);

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
             <div className='menu-container'>
                 <div className='menu-trigger' onClick={() => {setOpen(!open) } }>
                    <h4>Dropdown</h4>
                 </div>
                 <div className={`dropdown-menu ${open? 'active' : 'inactive' }`}>
                     <ul>
                         <DropdownItem text={"dropdown 1"} />
                         <DropdownItem text={"dropdown 2"} />
                         <DropdownItem text={"dropdown 3"} />
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
