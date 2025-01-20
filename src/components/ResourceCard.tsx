import React from 'react';
import { Resource } from '../types/resource';

interface ResourceCardProps {
  resource: Resource;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ 
  resource, 
  onDelete,
  isAdmin 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {resource.imageUrl && (
        <img 
          src={resource.imageUrl} 
          alt={resource.name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      )}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-sm font-medium text-[#d21533]">
            {resource.category}
          </span>
          <h3 className="text-xl font-bold mt-1">{resource.name}</h3>
          <p className="text-gray-600 mt-2">{resource.location}</p>
        </div>
        {isAdmin && onDelete && (
          <button
            onClick={() => onDelete(resource.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
      <p className="mt-4 text-gray-700">{resource.description}</p>
      
      <div className="mt-4 space-y-2">
        {resource.contacts.phone && (
          <p className="text-sm">📞 {resource.contacts.phone}</p>
        )}
        {resource.contacts.email && (
          <p className="text-sm">✉️ {resource.contacts.email}</p>
        )}
        {resource.contacts.website && (
          <a 
            href={resource.contacts.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            🌐 Website
          </a>
        )}
      </div>
      
      {resource.socials && (
        <div className="mt-4 flex space-x-4">
          {Object.entries(resource.socials).map(([platform, url]) => (
            url && (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {platform}
              </a>
            )
          ))}
        </div>
      )}
    </div>
  );
};