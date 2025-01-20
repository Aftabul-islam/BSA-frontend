import React from 'react';
import { Link } from 'react-router-dom';

const images = [
  {
    url: "https://images.unsplash.com/photo-1504870712357-65ea720d6078?auto=format&fit=crop&q=80",
    title: "Classical Performance"
  },
  {
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80",
    title: "Festival Celebration"
  },
  {
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
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