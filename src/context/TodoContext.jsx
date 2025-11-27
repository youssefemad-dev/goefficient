import React, { createContext, useState, useEffect, useContext } from 'react';
import { updateStreak } from '../utils/streak';

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos:', error);
        setTodos([]);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, description, dueDate) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setTodos(prev => [newTodo, ...prev]);
    return newTodo;
  };

  const editTodo = (id, title, description, dueDate) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { 
            ...todo, 
            title: title.trim(), 
            description: description.trim(),
            dueDate: dueDate || null
          }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        const newCompleted = !todo.completed;
        
        // Update streak when marking as complete
        if (newCompleted) {
          updateStreak('todosStreak');
        }
        
        return {
          ...todo,
          completed: newCompleted,
          completedAt: newCompleted ? new Date().toISOString() : null
        };
      }
      return todo;
    }));
  };

  const getTodosByCategory = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const categorized = {
      today: [],
      upcoming: [],
      completed: []
    };

    todos.forEach(todo => {
      if (todo.completed) {
        categorized.completed.push(todo);
      } else if (todo.dueDate) {
        const dueDate = todo.dueDate.split('T')[0];
        if (dueDate === todayStr) {
          categorized.today.push(todo);
        } else if (dueDate > todayStr) {
          categorized.upcoming.push(todo);
        } else {
          // Overdue - add to today
          categorized.today.push(todo);
        }
      } else {
        // No due date - add to upcoming
        categorized.upcoming.push(todo);
      }
    });

    return categorized;
  };

  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      editTodo,
      deleteTodo,
      toggleComplete,
      getTodosByCategory
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
}

export default TodoProvider;
