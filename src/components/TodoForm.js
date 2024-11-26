import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

const TodoForm = ({ onAddTodo }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() && dueDate) {
      onAddTodo(task, dueDate);
      setTask('');
      setDueDate('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-indigo-200"
    >
      <div className="flex space-x-4">
        <div className="flex-grow">
          <div className="relative">
            <input 
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <Plus 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" 
              size={20} 
            />
          </div>
        </div>
        <div className="relative">
          <input 
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-md border border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
          <Calendar 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" 
            size={20} 
          />
        </div>
        <button 
          type="submit" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default TodoForm;