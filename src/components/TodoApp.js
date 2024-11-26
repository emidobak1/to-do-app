import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all');

  const today = new Date();
  const formattedDate = format(today, 'MMMM dd, yyyy');
  const currentDay = format(today, 'EEE');

  // Calculate all days in the current week
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    format(addDays(startOfWeek(today, { weekStartsOn: 1 }), i), 'EEE')
  );

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Convert stored date strings back to Date objects
  const parsedTodos = todos.map((todo) => ({
    ...todo,
    dueDate: new Date(todo.dueDate),
  }));

  // Filter todos based on selected filter
  const filteredTodos = parsedTodos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'urgent': {
        const daysUntilDue = (todo.dueDate - new Date()) / (1000 * 60 * 60 * 24);
        return daysUntilDue <= 3 && !todo.completed;
      }
      case 'all':
      default:
        return true;
    }
  });

  // Add new todo
  const addTodo = (task, dueDate) => {
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      task,
      completed: false,
      dueDate: new Date(dueDate),
    };
    setTodos([...parsedTodos, newTodo]);
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    const updatedTodos = parsedTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Delete todo
  const deleteTodo = (id) => {
    const updatedTodos = parsedTodos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Edit todo
  const editTodo = (id, newTask, newDueDate) => {
    const updatedTodos = parsedTodos.map((todo) =>
      todo.id === id
        ? { ...todo, task: newTask, dueDate: new Date(newDueDate) }
        : todo
    );
    setTodos(updatedTodos);
  };

  // Compute stats for display
  const stats = {
    total: parsedTodos.length,
    active: parsedTodos.filter((todo) => !todo.completed).length,
    completed: parsedTodos.filter((todo) => todo.completed).length,
    urgent: parsedTodos.filter((todo) => {
      const daysUntilDue = (todo.dueDate - new Date()) / (1000 * 60 * 60 * 24);
      return daysUntilDue <= 3 && !todo.completed;
    }).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-cyan-800 m-12">To-do List</h1>
          <p className="text-gray-600 text-lg mb-4">{formattedDate}</p>
          <div className="flex justify-center items-center space-x-6">
            {/* Dynamic navigation for days */}
            {daysOfWeek.map((day) => (
              <button
                key={day}
                className={`${
                  day === currentDay
                    ? 'text-cyan-700 font-bold border-b-2 border-cyan-800'
                    : 'text-gray-400 hover:text-cyan-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </header>

        {/* Todo Form */}
        <TodoForm onAddTodo={addTodo} />

        {/* Todo Filter */}
        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          stats={stats}
        />

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onToggleComplete={toggleComplete}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      </div>
    </div>
  );
};

export default TodoApp;
