import React from 'react';

const TodoFilter = ({ currentFilter, onFilterChange, stats }) => {
  const filterOptions = [
    { 
      type: 'all', 
      label: 'All Tasks', 
      count: stats.total 
    },
    { 
      type: 'active', 
      label: 'Active', 
      count: stats.active 
    },
    { 
      type: 'completed', 
      label: 'Completed', 
      count: stats.completed 
    },
    { 
      type: 'urgent', 
      label: 'Urgent', 
      count: stats.urgent 
    }
  ];

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {filterOptions.map(filter => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter.type)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition
            flex items-center space-x-2
            ${currentFilter === filter.type 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }
          `}
        >
          <span>{filter.label}</span>
          <span 
            className={`
              rounded-full px-2 py-0.5 text-xs
              ${currentFilter === filter.type 
                ? 'bg-white text-blue-600' 
                : 'bg-gray-200 text-gray-700'
              }
            `}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;