import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ images, Static_uri }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  return (
    <div className="carousel">
      <div className="Image">
        <img
          src={`${Static_uri}/${images[currentImageIndex]}`}
          alt="carousel image"
        />
        <div className="controls">
          <button className="PrevImage" onClick={handlePrevImage}>
            Prev
          </button>
          <button className="NextImage" onClick={handleNextImage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
