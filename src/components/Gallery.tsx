import React from 'react';
import { Link } from 'react-router-dom';

const images = [
  {
    url: "https://images.unsplash.com/photo-1681236533324-666665983996?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJhbmdsYWRlc2hpJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Classical Performance"
  },
  {
    url: "https://images.unsplash.com/photo-1624635446500-d4c4ec4eb0ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjkwfHxiYW5nbGFkZXNofGVufDB8fDB8fHww",
    title: "Festival Celebration"
  },
  {
    url: "https://images.unsplash.com/photo-1621442745928-8f8d98021f35?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Dance Workshop"
  }
];

export const Gallery = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Event Highlights</h2>
        <div className="grid grid-cols-3 gap-4 transform -rotate-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:rotate-0 hover:scale-105 ${
                index % 2 === 0 ? 'rotate-6' : '-rotate-6'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block bg-[#d21533] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b01229] transition-colors duration-300"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};