import React from 'react';

export const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Collage */}
          <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[400px]">
            <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
              <img 
                src="../../images/Bangladesh/BD-1.jpg" 
                alt="BSA Event"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="../../images/Bangladesh/BD-2.jpg" 
                alt="BSA Members"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="../../images/Bangladesh/BD-3.jpg" 
                alt="Cultural Event"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="col-span-2 rounded-lg overflow-hidden">
              <img 
                src="../../images/Bangladesh/BD-4.jpg" 
                alt="Community Gathering"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">About Bangladesh</h2>
            <p className="text-lg text-gray-600">
            Bangladesh is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common.
            On the southern coast, the Sundarbans, an enormous mangrove forest shared with Eastern India, is home to the royal Bengal tiger.
            </p>
            <h2 className="text-3xl font-bold text-gray-900">Who we are ...</h2>
            <p className="text-lg text-gray-600">
              BSA (Bangaldesh Student Association) Founded with the mission to create a home away from home, BSA organizes cultural events,
              provides support services, and builds a strong community among students.
            </p>
            <p className="text-lg text-gray-600">
              From celebrating traditional festivals to offering academic guidance, BSA plays a crucial
              role in enriching the university experience for its members.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};