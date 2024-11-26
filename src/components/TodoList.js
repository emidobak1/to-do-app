import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ 
  todos, 
  onToggleComplete, 
  onDeleteTodo, 
  onEditTodo 
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No tasks to show
      </div>
    );
  }

  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;