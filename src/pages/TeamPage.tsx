import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import axios from 'axios';

interface Executive {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const TeamPage = () => {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/executives');
        setExecutives(response.data.data.executives);
      } catch (err) {
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    fetchExecutives();
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
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#d21533] text-white rounded hover:bg-[#b01229]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Our Team</h1>
          <p className="mt-4 text-xl text-gray-600">
            Meet the dedicated individuals who make BSA possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executives.map((executive) => (
            <div 
              key={executive.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={`http://localhost:3000/uploads/executives/${executive.imageUrl}`}
                  alt={executive.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.jpg';
                  }}
                />
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">{executive.name}</h3>
                <p className="text-[#d21533] mt-1 mb-4">{executive.position}</p>
                
                <div className="flex justify-center space-x-4">
                  {executive.socials?.facebook && (
                    <a 
                      href={executive.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#1877F2] transition-colors duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                  )}
                  {executive.socials?.instagram && (
                    <a 
                      href={executive.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#E4405F] transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                  {executive.socials?.linkedin && (
                    <a 
                      href={executive.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#0A66C2] transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};