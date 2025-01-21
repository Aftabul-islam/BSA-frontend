import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserGraduate, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

interface Student {
  id: string;
  name: string;
  photoUrl: string;
  program: string;
  year: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
}

const STUDENTS_PER_PAGE = 15;

export const ManageStudents: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({
    name: '',
    photoUrl: '',
    program: '',
    year: '',
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: ''
  });

  // Search and filter logic
  const filteredStudents = useMemo(() => {
    return students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
    return filteredStudents.slice(startIndex, startIndex + STUDENTS_PER_PAGE);
  }, [filteredStudents, currentPage]);

  // Event handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setNewStudent(prev => ({ ...prev, photoUrl: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const student: Student = {
      id: Date.now().toString(),
      ...newStudent
    };
    setStudents(prev => [...prev, student]);
    setNewStudent({
      name: '',
      photoUrl: '',
      program: '',
      year: '',
      facebookUrl: '',
      instagramUrl: '',
      linkedinUrl: ''
    });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-4 px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUserGraduate} className="h-8 w-8 text-[#d21533] mr-2" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Students</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Student
          </button>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search students by name or program..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-[#d21533] focus:border-[#d21533]"
            />
          </div>
        </div>

        {/* Add student form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program</label>
                <input
                  type="text"
                  value={newStudent.program}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, program: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
                <select
                  value={newStudent.year}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, year: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="mt-1 block w-full"
                  required
                />
                {newStudent.photoUrl && (
                  <img src={newStudent.photoUrl} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-full" />
                )}
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Facebook URL</label>
                  <input
                    type="url"
                    value={newStudent.facebookUrl}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, facebookUrl: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instagram URL</label>
                  <input
                    type="url"
                    value={newStudent.instagramUrl}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, instagramUrl: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn URL</label>
                  <input
                    type="url"
                    value={newStudent.linkedinUrl}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-4">
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
                  Add Student
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Students grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedStudents.map((student) => (
            <div key={student.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <img src={student.photoUrl} alt={student.name} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{student.name}</h3>
                  <p className="text-[#d21533]">{student.program}</p>
                  <p className="text-gray-600 dark:text-gray-400">{student.year} Year</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {student.facebookUrl && (
                  <a href={student.facebookUrl} target="_blank" rel="noopener noreferrer" 
                     className="block text-blue-600 hover:underline">Facebook</a>
                )}
                {student.instagramUrl && (
                  <a href={student.instagramUrl} target="_blank" rel="noopener noreferrer"
                     className="block text-pink-600 hover:underline">Instagram</a>
                )}
                {student.linkedinUrl && (
                  <a href={student.linkedinUrl} target="_blank" rel="noopener noreferrer"
                     className="block text-blue-800 hover:underline">LinkedIn</a>
                )}
              </div>
              <button
                onClick={() => handleDelete(student.id)}
                className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* No results message */}
        {filteredStudents.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No students found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;