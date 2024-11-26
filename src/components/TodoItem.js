import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { Calendar, Edit2, Trash2, Check, X } from 'lucide-react';

// Utility function for urgency details
const getUrgencyDetails = (dueDate) => {
  const daysUntilDue = differenceInDays(dueDate, new Date());
  
  if (daysUntilDue < 0) return { 
    color: 'bg-red-500/10 border-red-500', 
    textColor: 'text-red-700',
    urgency: 'Overdue' 
  };
  if (daysUntilDue <= 3) return { 
    color: 'bg-orange-500/10 border-orange-500', 
    textColor: 'text-orange-700',
    urgency: 'Urgent' 
  };
  if (daysUntilDue <= 7) return { 
    color: 'bg-yellow-500/10 border-yellow-500', 
    textColor: 'text-yellow-700',
    urgency: 'Soon' 
  };
  return { 
    color: 'bg-green-500/10 border-green-500', 
    textColor: 'text-green-700',
    urgency: 'On Track' 
  };
};

const TodoItem = ({ 
  todo, 
  onToggleComplete, 
  onDeleteTodo, 
  onEditTodo 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDueDate, setEditedDueDate] = useState(format(todo.dueDate, 'yyyy-MM-dd'));

  const urgencyDetails = getUrgencyDetails(todo.dueDate);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditTodo(todo.id, editedTask, editedDueDate);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form 
        onSubmit={handleEditSubmit} 
        className="bg-white shadow-md rounded-lg p-4 mb-4 border border-indigo-200 flex items-center space-x-4"
      >
        <input 
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          className="flex-grow px-3 py-2 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input 
          type="date"
          value={editedDueDate}
          onChange={(e) => setEditedDueDate(e.target.value)}
          className="px-3 py-2 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <div className="flex space-x-2">
          <button 
            type="submit" 
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            <Check size={20} />
          </button>
          <button 
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div 
      className={`
        ${urgencyDetails.color} 
        border rounded-lg p-4 mb-4 flex items-center space-x-4 
        transition-all duration-300 ease-in-out
        ${todo.completed ? 'opacity-50' : ''}
      `}
    >
      <input 
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
      />
      <div className="flex-grow">
        <span 
          className={`
            ${todo.completed ? 'line-through' : ''} 
            font-medium text-gray-800
          `}
        >
          {todo.task}
        </span>
        <div className="flex items-center space-x-2 mt-1">
          <Calendar size={16} className={`${urgencyDetails.textColor}`} />
          <span className={`text-sm ${urgencyDetails.textColor}`}>
            {format(todo.dueDate, 'MMM dd, yyyy')} - {urgencyDetails.urgency}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => setIsEditing(true)}
          className="text-indigo-500 hover:text-indigo-700 transition"
        >
          <Edit2 size={20} />
        </button>
        <button 
          onClick={() => onDeleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;