import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  images: string[];
}

export const GalleryPage = () => {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/gallery');
        setEvents(response.data.data.events);
      } catch (err) {
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d21533]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Gallery</h1>
          <p className="mt-4 text-xl text-gray-600">
            Capturing moments from our events and celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id}
              onClick={() => {
                setSelectedEvent(event);
                setCurrentImageIndex(0);
              }}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:3000/uploads/gallery/${event.coverImage}`}
                  alt={event.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">View Gallery</p>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={`http://localhost:3000/uploads/gallery/${selectedEvent.images[currentImageIndex]}`}
              alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-lg font-semibold mb-2">{selectedEvent.title}</p>
              <p>{`${currentImageIndex + 1} / ${selectedEvent.images.length}`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};