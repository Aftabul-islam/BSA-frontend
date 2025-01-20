import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  posterUrl: string;
  ticketLink?: string;
}

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events');
        setEvents(response.data.data.events);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedCountdowns: { [key: string]: string } = {};
      
      events.forEach(event => {
        const eventDate = new Date(`${event.date}T${event.time}`);
        const now = new Date();
        const diff = eventDate.getTime() - now.getTime();

        if (diff <= 0) {
          updatedCountdowns[event.id] = 'Event has ended';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        updatedCountdowns[event.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      });

      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, [events]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-48 bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-xl">No upcoming events at the moment.</p>
            <p className="mt-2">Check back later for exciting events!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={`http://localhost:3000/uploads/events/${event.posterUrl}`} 
                alt={event.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.jpg';
                }}
              />
              <div className="p-6">
                <div className="text-sm text-[#d21533] font-semibold mb-2">
                  {new Date(`${event.date}T${event.time}`).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time Remaining:</p>
                  <p className="text-lg font-semibold text-[#d21533]">
                    {countdowns[event.id] || 'Calculating...'}
                  </p>
                </div>
                {event.ticketLink && (
                  <a
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full text-center bg-[#d21533] text-white py-2 rounded-lg hover:bg-[#b01229] transition-colors"
                  >
                    Get Tickets
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};