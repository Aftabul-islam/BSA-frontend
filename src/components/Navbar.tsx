import React from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Close menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#d21533]" onClick={handleMenuClick}>
              BSA at USD
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              <Link to="/" className="hover:text-[#d21533] transition-colors">Home</Link>
              <Link to="/team" className="hover:text-[#d21533] transition-colors">Team</Link>
              <Link to="/gallery" className="hover:text-[#d21533] transition-colors">Gallery</Link>
              <Link to="/current-students" className="hover:text-[#d21533] transition-colors">Current Students</Link>
              <Link to="/resources" className="hover:text-[#d21533] transition-colors">Resources</Link>
              <Link to="/contact" className="hover:text-[#d21533] transition-colors">Contact</Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mr-2"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900">
            <Link to="/" className="block px-3 py-2 hover:text-[#d21533] transition-colors" onClick={handleMenuClick}>Home</Link>
            <Link to="/team" className="block px-3 py-2 hover:text-[#d21533] transition-colors" onClick={handleMenuClick}>Team</Link>
            <Link to="/gallery" className="block px-3 py-2 hover:text-[#d21533] transition-colors" onClick={handleMenuClick}>Gallery</Link>
            <Link to="/current-students" className="block px-3 py-2 hover:text-[#d21533] transition-colors" onClick={handleMenuClick}>Current Students</Link>
            <Link to="/resources" className="block px-3 py-2 hover:text-[#d21533] transition-colors" onClick={handleMenuClick}>Resources</Link>
            <Link to="/contact" className="block px-3 py-2 hover:text-[#d21533] transition-colors" onClick={handleMenuClick}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};