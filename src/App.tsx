import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { ListTodo, Sun, Moon } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  description: string; 
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    //const saved = localStorage.getItem('todos');
    //return saved ? JSON.parse(saved) : [
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

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.getAttribute('data-bs-theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const addTodo = (text: string, description: string) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        description,
        completed: false,
      },
    ]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string, newDescription: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, description: newDescription } : todo
      )
    );
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center gap-2">
                    <ListTodo className="text-primary" size={28} />
                    <h1 className="h3 mb-0">My Todo List</h1>
                  </div>
                  <div
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="theme-toggle"
                  >
                    {isDarkMode ? (
                      <Sun className="text-warning" size={24} />
                    ) : (
                      <Moon className="text-primary" size={24} />
                    )}
                  </div>
                </div>

                <AddTodo onAddTodo={addTodo} />

                <div className="mt-4">
                  {todos.length === 0 ? (
                    <div className="text-center empty-state d-flex align-items-center justify-content-center">
                      <div className="text-muted">
                        <p className="mb-0">No todos yet.</p>
                        <small>Add some tasks to get started!</small>
                      </div>
                    </div>
                  ) : (
                    <>
                      <TodoList
                        todos={todos}
                        onToggleComplete={toggleComplete}
                        onRemoveTodo={removeTodo}
                        onEditTodo={editTodo}
                      />
                      <div className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted">Progress</small>
                          <small className="text-muted">
                            {completedCount} of {totalCount} completed
                          </small>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${progressPercentage}%` }}
                            aria-valuenow={progressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;