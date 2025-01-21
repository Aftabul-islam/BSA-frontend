import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUsers, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Executive {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
}

export const ManageExecutives: React.FC = () => {
  const navigate = useNavigate();
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newExecutive, setNewExecutive] = useState({
    name: '',
    position: '',
    imageUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const executive = {
      id: Date.now().toString(),
      ...newExecutive
    };
    setExecutives([...executives, executive]);
    setNewExecutive({
      name: '',
      position: '',
      imageUrl: '',
      facebookUrl: '',
      instagramUrl: '',
      linkedinUrl: ''
    });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setExecutives(executives.filter(exec => exec.id !== id));
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-4 px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Dashboard
        </button>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUsers} className="h-8 w-8 text-[#d21533] mr-2" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Executives</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Executive
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  value={newExecutive.name}
                  onChange={(e) => setNewExecutive({ ...newExecutive, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
                <input
                  type="text"
                  value={newExecutive.position}
                  onChange={(e) => setNewExecutive({ ...newExecutive, position: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setNewExecutive({ ...newExecutive, imageUrl: url });
                    }
                  }}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Facebook URL</label>
                <input
                  type="url"
                  value={newExecutive.facebookUrl}
                  onChange={(e) => setNewExecutive({ ...newExecutive, facebookUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instagram URL</label>
                <input
                  type="url"
                  value={newExecutive.instagramUrl}
                  onChange={(e) => setNewExecutive({ ...newExecutive, instagramUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn URL</label>
                <input
                  type="url"
                  value={newExecutive.linkedinUrl}
                  onChange={(e) => setNewExecutive({ ...newExecutive, linkedinUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d21533] text-white rounded-md hover:bg-[#b01229]"
                >
                  Add Executive
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executives.map((executive) => (
            <div key={executive.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={executive.imageUrl} alt={executive.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{executive.name}</h3>
                <p className="text-[#d21533]">{executive.position}</p>
                <div className="mt-4 space-y-2">
                  {executive.facebookUrl && (
                    <a href={executive.facebookUrl} target="_blank" rel="noopener noreferrer" 
                       className="block text-blue-600 hover:underline">Facebook</a>
                  )}
                  {executive.instagramUrl && (
                    <a href={executive.instagramUrl} target="_blank" rel="noopener noreferrer"
                       className="block text-pink-600 hover:underline">Instagram</a>
                  )}
                  {executive.linkedinUrl && (
                    <a href={executive.linkedinUrl} target="_blank" rel="noopener noreferrer"
                       className="block text-blue-800 hover:underline">LinkedIn</a>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(executive.id)}
                  className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageExecutives;