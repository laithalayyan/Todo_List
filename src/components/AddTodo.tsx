import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface AddTodoProps { 
  onAddTodo: (text: string, description: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim(), description.trim());
      setText('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="form-control todo-input shadow-none"
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <button
          type="submit"
          disabled={!text.trim()}
          className="btn btn-primary add-button d-flex align-items-center gap-2"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
      {isExpanded && (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)"
          className="form-control shadow-none"
          rows={2}
        />
      )}
    </form>
  );
};

export default AddTodo;