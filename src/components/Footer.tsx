import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-[#d21533] mb-4">Bangladesh Student Association</h3>
            <p className="text-gray-400">
            Bangaldesh Students’ Association (BSA) is a non-profit and culturally diverse association at University of South Dakota (USD).BSA hopes to keep helping the Bengali Student community during their journey at University of South Dakota amidst a fun environment filled with cultural and recreational activities.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin size={20} className="mr-2 text-[#d21533]" />
                <span>414 E Clark St, Vermillion, SD 57069</span>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-2 text-[#d21533]" />
                <span>+1 to be posted</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-2 text-[#d21533]" />
                <span>BSA@coyotes.com 'to be posted'</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#d21533] transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-[#d21533] transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BSA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};