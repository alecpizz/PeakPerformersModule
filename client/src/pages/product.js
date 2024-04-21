import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";


const Product = () => {

  const [structureInfo, setStructureInfo] = useState('');
  const [open, setOpen] = useState(false);

     let { productId } = useParams();
     const [options, setOptions] = useState('');
     const [price, setPrice] = useState('');
     const [images, setImages] = useState('');
     const [mainImage, setMainImage] = useState('');
     const [dataReceived, setDataReceived] = useState(false);
   
     useEffect(() => {
     const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageID: { productId }.productId })
     };

     fetch("http://localhost:5000/product", requestOptions).then((response) => response.json()).then((data) => {
          setStructureInfo(data);
          setDataReceived(true);
          setOptions([data.custom_options[0], data.custom_options[1], data.custom_options[2], data.custom_options[3]]);
          setPrice(data.price[0]);
          let items = [];
          for(let i = 0; i < data.images.length; i++){
               items.push({original: data.images[i]});
          }
          setImages(items);
          setMainImage(data.images[0]);
        }).catch((error) => {
          console.error("Error fetching data:", error);
          setStructureInfo(error.message);
          setDataReceived(false);
     });
    });

    function createDropDown(){
         let items = [];
         for(let i = 0; i < options.length; i++){
              items.push(<DropdownItem text={options[i]} />);
          }
          return items;
     }
    // var images = structureInfo.images[0];
     //images = images.split("https").map(x => {return "https" + x}).slice(1);

     const RedirectButton = () => {
          return <button>Text</button>
     }
    
     if(!dataReceived)
     {
          return (<div><h1>Product not found, please check your URL or contact support.</h1></div>)
     }
     return (
          <div>
               <p className="imageGallery">
                    <ReactImageGallery items={images} autoPlay={true} showFullscreenButton={true} showPlayButton={false}></ReactImageGallery>
                    </p>
                    <h2 id="h2">Available in your area</h2>
                    <h1 id ="pro_type">Product Type: {structureInfo.structure_type}</h1>             
               <p id="p1">By: </p>
               <Link to={`/seller?=${structureInfo.user_id}`} component={RedirectButton} class="hyperlink">Click to see more structures by the creator</Link>
               <p>Price ${price}</p>
               <p id="pro_id">Product Id: {{ productId }.productId}</p>  

             <div className='menu-container'>
                 <div className='menu-trigger' onClick={() => {setOpen(!open) } }>
                    <h4>Click for Options</h4>
                 </div>
                 <div className={`dropdown-menu ${open? 'active' : 'inactive' }`}>
                     <ul>
                         {createDropDown()}
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
