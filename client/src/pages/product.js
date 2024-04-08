import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import image1 from './Building1.jpg';
import image2 from './Building2.jpg';
import image3 from './Building3.jpg';

const Product = () => {

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
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={isMagnified ? 'magnified' : ''}
        />
        <button onClick={this.handleNextClick}>Next</button>
      </div>
    );
  }
}

const images = [
  image1,
  image2,
  image3
];

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
                    <div>
                    <h2>Image Gallery</h2>
                     <ImageGallery images={images} />
                    </div>
               </div>
               <div>
                    <img src={structureInfo.image_main}></img>
               </div>
               <img src={structureInfo.sub_image}></img>
          </div>

     );
};

export default Product;
