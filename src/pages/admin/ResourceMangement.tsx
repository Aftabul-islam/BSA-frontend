import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBookmark, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Resource, ResourceCategory } from '../../types/resource';
import { ResourceCard } from '../../components/ResourceCard';

const CATEGORIES: ResourceCategory[] = [
  "Housing", "Jobs", "Healthcare", "Education", 
  "Immigration", "Legal", "Other"
];

const RESOURCES_PER_PAGE = 9;

export const ResourceManagement: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | ''>('');
  
  const [newResource, setNewResource] = useState({
    category: 'Other' as ResourceCategory,
    name: '',
    description: '',
    location: '',
    imageUrl: '',
    contacts: {
      phone: '',
      email: '',
      website: ''
    },
    socials: {
      facebook: '',
      linkedin: '',
      instagram: ''
    }
  });

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [resources, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredResources.length / RESOURCES_PER_PAGE);
  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * RESOURCES_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + RESOURCES_PER_PAGE);
  }, [filteredResources, currentPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resource: Resource = {
      ...newResource,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setResources(prev => [...prev, resource]);
    setShowForm(false);
    setNewResource({
      category: 'Other',
      name: '',
      description: '',
      location: '',
      imageUrl: '',
      contacts: { phone: '', email: '', website: '' },
      socials: { facebook: '', linkedin: '', instagram: '' }
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-6 px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors flex items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBookmark} className="h-8 w-8 text-[#d21533] mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resource Management</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Resource
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-[#d21533] focus:border-[#d21533]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value as ResourceCategory | '');
              setCurrentPage(1);
            }}
            className="w-full md:w-48 rounded-lg border border-gray-300 focus:ring-[#d21533] focus:border-[#d21533]"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Add Resource Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
                    <select
                      value={newResource.category}
                      onChange={(e) => setNewResource({...newResource, category: e.target.value as ResourceCategory})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#d21533] focus:border-[#d21533]"
                      required
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
                    <input
                      type="text"
                      value={newResource.name}
                      onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#d21533] focus:border-[#d21533]"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location *</label>
                    <input
                      type="text"
                      value={newResource.location}
                      onChange={(e) => setNewResource({...newResource, location: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#d21533] focus:border-[#d21533]"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                    <input
                      type="url"
                      value={newResource.imageUrl}
                      onChange={(e) => setNewResource({...newResource, imageUrl: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#d21533] focus:border-[#d21533]"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
                    <textarea
                      value={newResource.description}
                      onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#d21533] focus:border-[#d21533]"
                      required
                    />
                  </div>

                  {/* Contact Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Phone</label>
                    <input
                      type="tel"
                      value={newResource.contacts.phone}
                      onChange={(e) => setNewResource({
                        ...newResource,
                        contacts: {...newResource.contacts, phone: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#d21533] focus:border-[#d21533]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                    <input
                      type="email"
                      value={newResource.contacts.email}
                      onChange={(e) => setNewResource({
                        ...newResource,
                        contacts: {...newResource.contacts, email: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#d21533] focus:border-[#d21533]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                    <input
                      type="url"
                      value={newResource.contacts.website}
                      onChange={(e) => setNewResource({
                        ...newResource,
                        contacts: {...newResource.contacts, website: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#d21533] focus:border-[#d21533]"
                    />
                  </div>
                </div>

                {/* Form Actions */}
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
                    Add Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Resources Grid */}
        {paginatedResources.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedResources.map(resource => (
                <ResourceCard 
                  key={resource.id}
                  resource={resource}
                  onDelete={handleDelete}
                  isAdmin
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No resources found {searchTerm && `matching "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceManagement;