import React from 'react';
import './Gallery.css'; // Import your CSS file for styling

const Gallery = () => {
  // Sample image URLs
  const images = [
    '/galleryIMG/img1.jpg',
    '/galleryIMG/img2.jpg',
    '/galleryIMG/img3.jpg',
    '/galleryIMG/img4.jpg',
    '/galleryIMG/img6.jpg',
    '/galleryIMG/img5.jpg',
    '/galleryIMG/img7.jpg',
    '/galleryIMG/img8.jpg',
    '/galleryIMG/img9.jpg',
    '/galleryIMG/img10.jpg',
    '/galleryIMG/img11.jpg',
    '/galleryIMG/img12.jpg',
    '/galleryIMG/img13.jpg',
    '/galleryIMG/img14.jpg',
    '/galleryIMG/img15.jpg',
    '/galleryIMG/img16.jpg',
  ];

  return (
    <div className="container" style={{marginTop:'40px'}}>
      <div className="row">
        {images.map((image, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4 box-shadow" style={{ height: '300px' }}>
              <img className="card-img-top" src={image} alt={`Image ${index}`} style={{ objectFit: 'cover', height: '100%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

