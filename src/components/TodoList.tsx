import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save, ChevronDown, ChevronRight } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onRemoveTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string, newDescription: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggleComplete, 
  onRemoveTodo,
  onEditTodo 
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDescription(todo.description || '');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
    setEditDescription('');
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      onEditTodo(id, editText.trim(), editDescription.trim());
      setEditingId(null);
      setEditText('');
      setEditDescription('');
    }
  };

  const toggleDescription = (id: number) => {
    const newExpandedIds = new Set(expandedIds);
    if (expandedIds.has(id)) {
      newExpandedIds.delete(id);
    } else {
      newExpandedIds.add(id);
    }
    setExpandedIds(newExpandedIds);
  };

  return (
    <div className="list-group">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`list-group-item todo-item ${
            todo.completed ? 'completed-todo' : ''
          }`}
        >
          {editingId === todo.id ? (
            <div className="d-flex flex-column gap-2">
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      saveEdit(todo.id);
                    }
                  }}
                  autoFocus
                />
                <div className="d-flex gap-2">
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="btn btn-sm btn-success"
                    disabled={!editText.trim()}
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="btn btn-sm btn-secondary"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <textarea
                className="form-control"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add a description (optional)"
                rows={2}
              />
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  {todo.description && (
                    <button
                      className="btn btn-link p-0 text-muted"
                      onClick={() => toggleDescription(todo.id)}
                      aria-label={expandedIds.has(todo.id) ? "Hide description" : "Show description"}
                    >
                      {expandedIds.has(todo.id) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  )}
                  <span
                    className={todo.completed ? 'text-decoration-line-through' : ''}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="todo-actions d-flex gap-2">
                  <button
                    onClick={() => onToggleComplete(todo.id)}
                    className={`btn btn-sm ${
                      todo.completed ? 'btn-success' : 'btn-outline-success'
                    }`}
                    aria-label="Mark as complete"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => startEditing(todo)}
                    className="btn btn-sm btn-outline-primary"
                    aria-label="Edit todo"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onRemoveTodo(todo.id)}
                    className="btn btn-sm btn-outline-danger"
                    aria-label="Remove todo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {expandedIds.has(todo.id) && todo.description && (
                <div className="text-muted small ps-4 border-start ms-2">
                  {todo.description}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;