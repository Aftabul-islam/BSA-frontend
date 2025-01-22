import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Map } from '../components/Map';

const USD_POSITION: [number, number] = [42.7859673, -96.9277769];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                           dark:bg-gray-700 focus:ring-2 focus:ring-[#d21533] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                           dark:bg-gray-700 focus:ring-2 focus:ring-[#d21533] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                           dark:bg-gray-700 focus:ring-2 focus:ring-[#d21533] focus:border-transparent"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#d21533] hover:bg-[#b01229] text-white font-semibold py-3 
                         rounded-lg transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <MapPin className="text-[#d21533] mr-4 h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      414 E Clark St<br />
                      Vermillion, SD 57069
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="text-[#d21533] mr-4 h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">To be posted</p>
                  </div>
                </div>
              </div>

              {/* Map Component */}
              <div className="h-[400px] rounded-lg overflow-hidden">
                <Map position={USD_POSITION} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};