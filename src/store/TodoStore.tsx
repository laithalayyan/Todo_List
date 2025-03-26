import React, { createContext, useContext, useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string, description: string) => void;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newText: string, newDescription: string) => void;
  completedCount: number;
  totalCount: number;
  progressPercentage: number;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // const saved = localStorage.getItem('todos');
    // return saved ? JSON.parse(saved) : [
    return [
        { 
            id: 1, 
            text: 'lorem ipsum', 
            description: "Lorem ipsum dolor sit amet consectetur.", 
            completed: true 
          },
          { 
            id: 2, 
            text: 'lorem ipsum', 
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing.", 
            completed: false 
          },
          { 
            id: 3, 
            text: "Lorem, ipsum dolor.", 
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, similique!", 
            completed: false 
          },
    ];
  });

  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    
    // Calculate statistics
    const completed = todos.filter(todo => todo.completed).length;
    const total = todos.length;
    const progress = total > 0 ? (completed / total) * 100 : 0;

    setCompletedCount(completed);
    setTotalCount(total);
    setProgressPercentage(progress);
  }, [todos]);

  const addTodo = (text: string, description: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text,
        description,
        completed: false,
      },
    ]);
  };

  const toggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string, newDescription: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText, description: newDescription } : todo
      )
    );
  };

  const value = {
    todos,
    addTodo,
    toggleComplete,
    removeTodo,
    editTodo,
    completedCount,
    totalCount,
    progressPercentage,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoStore = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoStore must be used within a TodoProvider');
  }
  return context;
};