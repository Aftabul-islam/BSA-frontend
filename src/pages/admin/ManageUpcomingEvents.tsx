import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  posterUrl: string;
  ticketLink?: string;
}

export const ManageUpcomingEvents: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    posterUrl: '',
    ticketLink: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event = {
      id: Date.now().toString(),
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', time: '', posterUrl: '', ticketLink: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
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
            <FontAwesomeIcon icon={faCalendarAlt} className="h-8 w-8 text-[#d21533] mr-2" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Upcoming Events</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#d21533] text-white rounded-lg hover:bg-[#b01229] transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Event
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Poster</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setNewEvent({ ...newEvent, posterUrl: url });
                    }
                  }}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ticket Link (Optional)</label>
                <input
                  type="url"
                  value={newEvent.ticketLink}
                  onChange={(e) => setNewEvent({ ...newEvent, ticketLink: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d21533] focus:ring-[#d21533]"
                  placeholder="https://..."
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
                  Add Event
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={event.posterUrl} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(`${event.date} ${event.time}`).toLocaleString()}
                </p>
                {event.ticketLink && (
                  <a
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d21533] hover:underline"
                  >
                    Get Tickets
                  </a>
                )}
                <button
                  onClick={() => handleDelete(event.id)}
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
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

export default ManageUpcomingEvents;