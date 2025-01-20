import React from 'react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/admin/executives" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Manage Executives</h2>
            <p className="text-gray-700 dark:text-gray-300">View, add, and edit executive profiles.</p>
          </Link>
          <Link to="/admin/students" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Manage Students</h2>
            <p className="text-gray-700 dark:text-gray-300">View, add, and edit student profiles.</p>
          </Link>
          <Link to="/admin/gallery" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Manage Gallery</h2>
            <p className="text-gray-700 dark:text-gray-300">Upload and organize event photos.</p>
          </Link>
          <Link to="/admin/upcoming-events" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Manage Upcoming Events</h2>
            <p className="text-gray-700 dark:text-gray-300">Add and edit upcoming events with ticket options.</p>
          </Link>
          <Link to="/admin/resources" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Manage Resources</h2>
            <p className="text-gray-700 dark:text-gray-300">Add and manage community resources.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;