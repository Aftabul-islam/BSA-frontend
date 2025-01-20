import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Student {
  id: string;
  name: string;
  program: string;
  photoUrl: string;
  year: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const CurrentStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/students');
        setStudents(response.data.data.students);
      } catch (err) {
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);
  
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return students.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d21533]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#d21533] text-white rounded hover:bg-[#b01229]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Current Students</h1>
          <p className="mt-4 text-xl text-gray-600">
            Meet our amazing student community
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {getCurrentPageItems().map((student) => (
              <div 
                key={student.id} 
                className="flex items-center p-6 hover:bg-gray-50 transition-colors"
              >
                <img 
                  src={`http://localhost:3000/uploads/students/${student.photoUrl}`}
                  alt={student.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.jpg';
                  }}
                />
                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-[#d21533]">{student.program}</p>
                  <p className="text-gray-600">{student.year} Year</p>
                </div>
                <div className="flex space-x-4">
                  {student.socials?.facebook && (
                    <a 
                      href={student.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#1877F2]"
                    >
                      Facebook
                    </a>
                  )}
                  {student.socials?.instagram && (
                    <a 
                      href={student.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#E4405F]"
                    >
                      Instagram
                    </a>
                  )}
                  {student.socials?.linkedin && (
                    <a 
                      href={student.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#0A66C2]"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center p-6 bg-gray-50">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 rounded-md bg-white shadow-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 ml-2 rounded-md bg-white shadow-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};