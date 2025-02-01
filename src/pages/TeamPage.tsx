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

const PageHeader = () => (
  <div className="relative py-32 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <div className="absolute w-72 h-72 bg-[#d21533]/5 rounded-full -top-12 -left-12 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-[#d21533]/5 rounded-full top-48 left-48 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-[#d21533]/5 rounded-full -bottom-12 right-12 animate-blob animation-delay-4000"></div>
    </div>

    {/* Content */}
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-8">
          Team 2025
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Meet the dedicated individuals who make BSA possible
        </p>
        <a
          href="https://usdinvolved.usd.edu/organization/bsausd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mt-6 text-base font-medium text-white bg-[#d21533] 
             rounded-lg transform transition-all duration-300 hover:bg-[#b01229] 
             shadow-sm hover:shadow-md active:scale-98
             focus:outline-none focus:ring-2 focus:ring-[#d21533] focus:ring-offset-2
             dark:focus:ring-offset-gray-800"
        >
          Become a Member
        </a>
      </div>
    </div>
  </div>
);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d21533]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : executives.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              No team members to display at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((executive) => (
              <div 
                key={executive.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
                         transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                  <img
                    src={`http://localhost:3000/uploads/executives/${executive.imageUrl}`}
                    alt={executive.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 
                             group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{executive.name}</h3>
                  <p className="text-[#d21533] font-medium mb-4">{executive.position}</p>
                  <div className="flex justify-center space-x-4">
                    {executive.socials?.facebook && (
                      <SocialLink href={executive.socials.facebook} icon={<Facebook />} hover="hover:text-[#1877F2]" />
                    )}
                    {executive.socials?.instagram && (
                      <SocialLink href={executive.socials.instagram} icon={<Instagram />} hover="hover:text-[#E4405F]" />
                    )}
                    {executive.socials?.linkedin && (
                      <SocialLink href={executive.socials.linkedin} icon={<Linkedin />} hover="hover:text-[#0A66C2]" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SocialLink = ({ href, icon, hover }: { href: string; icon: React.ReactNode; hover: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-gray-600 dark:text-gray-400 transition-colors ${hover}`}
  >
    {icon}
  </a>
);