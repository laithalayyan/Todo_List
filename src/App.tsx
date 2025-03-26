import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { ListTodo, Sun, Moon } from 'lucide-react';
import { useTodoStore } from './store/TodoStore';
import { useThemeStore } from './store/ThemeStore'; 

function App() {
  // States from stores
  const { todos, completedCount, totalCount, progressPercentage } = useTodoStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

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
                    onClick={toggleTheme}
                    className="theme-toggle"
                  >
                    {isDarkMode ? (
                      <Sun className="text-warning" size={24} />
                    ) : (
                      <Moon className="text-primary" size={24} />
                    )}
                  </div>
                </div>

                <AddTodo />

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
                      <TodoList />
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