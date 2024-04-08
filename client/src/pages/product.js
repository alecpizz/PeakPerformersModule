import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import image1 from './Building1.jpg';
import image2 from './Building2.jpg';
import image3 from './Building3.jpg';

const Product = () => {

  const [structureInfo, setStructureInfo] = useState('');
  const [open, setOpen] = useState(false);
  
  class ImageGallery extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentIndex: 0,
        isMagnified: false
      };
    }
  
    handlePrevClick = () => {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex > 0 ? prevState.currentIndex - 1 : this.props.images.length - 1
      }));
    };
  
    handleNextClick = () => {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex < this.props.images.length - 1 ? prevState.currentIndex + 1 : 0
      }));
    };
  
    toggleMagnification = () => {
      this.setState(prevState => ({
        isMagnified: !prevState.isMagnified
      }));
    };
  
    render() {
      const { images } = this.props;
      const { currentIndex, isMagnified } = this.state;
  
      return (
        <div className="image-gallery">
          <button onClick={this.handlePrevClick}>Previous</button>
          <button onClick={this.toggleMagnification}>{isMagnified ? 'Shrink' : 'Magnify'}</button>
          <img
            src={image[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className={isMagnified ? 'magnified' : ''}
          />
          <button onClick={this.handleNextClick}>Next</button>
        </div>
      );
    }
  }

  const image = [
    image1,
    image2,
    image3
  ];

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
                    <div>
                    <h2>Image Gallery</h2>
                     <ImageGallery images={image} />
                    </div>
               </div>
               <div>
                    <img src={mainImage}></img>
               </div>
               <img src={structureInfo.sub_image}></img>
               <img src={images[1]}></img>
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
