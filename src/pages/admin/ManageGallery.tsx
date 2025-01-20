import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  images: string[];
}

export const ManageGallery: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    coverImage: '',
    images: [] as string[]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const url = URL.createObjectURL(file);
        if (isCover) {
          setNewEvent(prev => ({ ...prev, coverImage: url }));
        } else {
          setNewEvent(prev => ({ ...prev, images: [...prev.images, url] }));
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event = {
      id: Date.now().toString(),
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', coverImage: '', images: [] });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const removeImage = (index: number) => {
    setNewEvent(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-4 px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors"
        >
          Back to Dashboard
        </button>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faImages} className="h-8 w-8 text-[#d21533] mr-2" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Gallery</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Event Gallery
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="mt-1 block w-full"
                  required
                />
                {newEvent.coverImage && (
                  <img src={newEvent.coverImage} alt="Cover" className="mt-2 h-32 object-cover rounded-lg" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, false)}
                  className="mt-1 block w-full"
                  required
                />
                <div className="mt-2 grid grid-cols-4 gap-4">
                  {newEvent.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img src={image} alt={`Image ${index + 1}`} className="h-24 w-full object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
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
                  Add Gallery
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={event.coverImage} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {event.images.length} images in gallery
                </p>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Delete Gallery
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageGallery;