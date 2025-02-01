interface CollageImage {
  src: string;
  alt: string;
  className?: string;
}

const collageImages: CollageImage[] = [
  {
    src: '/images/Bangladesh/BD-1.jpg',
    alt: 'Bangaldesh',
    className: 'col-span-2 row-span-2'
  },
  {
    src: '/images/Bangladesh/BD-2.jpg',
    alt: 'Bangaldesh',
    className: 'col-span-1 row-span-1'
  },
  {
    src: '/images/Bangladesh/BD-3.jpg',
    alt: 'Bangaldesh',
    className: 'col-span-1 row-span-1'
  },
  {
    src: '/images/Bangladesh/BD-4.jpg',
    alt: 'Bangaldesh',
    className: 'col-span-2 row-span-1'
  }
];

export const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Modern Image Collage */}
          <div className="relative grid grid-cols-3 gap-3 h-[500px] group">
            {collageImages.map((image, index) => (
              <div 
                key={index}
                className={`relative overflow-hidden rounded-xl transform 
                  transition-all duration-500 hover:scale-[1.02] hover:z-10 
                  shadow-lg hover:shadow-xl ${image.className}`}
                style={{
                  transformOrigin: 'center',
                  transform: `translateY(${index * 5}px)`,
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover brightness-90 hover:brightness-100 
                    transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="absolute bottom-4 left-4 text-white font-medium">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">About Bangladesh</h2>
            <p className="text-lg text-gray-600">
              Bangladesh is a South Asian country marked by lush greenery and many waterways. 
              Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel 
              by boat is common.
            </p>
            <h2 className="text-3xl font-bold text-gray-900">Who we are ...</h2>
            <p className="text-lg text-gray-600">
              BSA (Bangladesh Student Association) Founded with the mission to create a home 
              away from home, BSA organizes cultural events, provides support services, and 
              builds a strong community among students.
            </p>
            <p className="text-lg text-gray-600">
              From celebrating traditional festivals to offering academic guidance, BSA plays 
              a crucial role in enriching the university experience for its members. BSA does not follow any discriminatory practice as an organization. Any student of USD is welcomed in BSA to be a member and join all of the events organized by BSA.
              BSA also plays a vital role by offering voluntary services and support to its members. We welcome new Bangladeshi students and try our best to assist them in coping with campus life and local culture.
              We aim to give our members the feeling of having an extended family and a dependable support system while living thousands of miles away from home. We also collaborate with friends from other cultural ethnicities on social and cultural grounds. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};