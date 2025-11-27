import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';

export default function TodoPage() {
  const { todos, addTodo, editTodo, deleteTodo, toggleComplete, getTodosByCategory } = useTodos();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });

  const categorizedTodos = getTodosByCategory();

  const handleAddClick = () => {
    setFormData({ title: '', description: '', dueDate: '' });
    setShowAddModal(true);
  };

  const handleEditClick = (todo) => {
    setCurrentTodo(todo);
    setFormData({ 
      title: todo.title, 
      description: todo.description,
      dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : ''
    });
    setShowEditModal(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addTodo(formData.title, formData.description, formData.dueDate);
      setShowAddModal(false);
      setFormData({ title: '', description: '', dueDate: '' });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && currentTodo) {
      editTodo(currentTodo.id, formData.title, formData.description, formData.dueDate);
      setShowEditModal(false);
      setCurrentTodo(null);
      setFormData({ title: '', description: '', dueDate: '' });
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteTodo(id);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return due < today;
  };

  const renderTodoItem = (todo) => (
    <div key={todo.id} className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-start gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }}
            />
          </div>
          <div className="flex-grow-1">
            <h5 className={`mb-2 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
              {todo.title}
            </h5>
            {todo.description && (
              <p className={`mb-2 ${todo.completed ? 'text-muted' : 'text-secondary'}`}>
                {todo.description}
              </p>
            )}
            <div className="d-flex flex-wrap gap-2 align-items-center">
              {todo.dueDate && (
                <span className={`badge ${
                  todo.completed ? 'bg-secondary' :
                  isOverdue(todo.dueDate) ? 'bg-danger' : 'bg-primary'
                }`}>
                  <i className="bi bi-calendar me-1"></i>
                  {formatDate(todo.dueDate)}
                  {!todo.completed && isOverdue(todo.dueDate) && ' (Overdue)'}
                </span>
              )}
              {todo.completed && todo.completedAt && (
                <span className="badge bg-success">
                  <i className="bi bi-check-circle me-1"></i>
                  Completed {formatDate(todo.completedAt)}
                </span>
              )}
            </div>
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleEditClick(todo)}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDelete(todo.id, todo.title)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = (title, todos, icon, emptyMessage) => (
    <div className="mb-5">
      <h3 className="fw-bold mb-3">
        <span className="me-2">{icon}</span>
        {title}
        <span className="badge bg-secondary ms-2">{todos.length}</span>
      </h3>
      {todos.length === 0 ? (
        <div className="alert alert-light text-center py-4">
          <p className="text-muted mb-0">{emptyMessage}</p>
        </div>
      ) : (
        todos.map(renderTodoItem)
      )}
    </div>
  );

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <h1 className="display-4 fw-bold mb-2">
            <span className="me-2">✅</span>
            Todo List
          </h1>
          <p className="text-muted">Organize your tasks and stay productive</p>
        </div>
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end">
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleAddClick}
          >
            <i className="bi bi-plus-circle me-2"></i>
            New Todo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <div className="h2 fw-bold text-primary mb-0">{categorizedTodos.today.length}</div>
                  <small className="text-muted">Today</small>
                </div>
                <div className="col-4">
                  <div className="h2 fw-bold text-info mb-0">{categorizedTodos.upcoming.length}</div>
                  <small className="text-muted">Upcoming</small>
                </div>
                <div className="col-4">
                  <div className="h2 fw-bold text-success mb-0">{categorizedTodos.completed.length}</div>
                  <small className="text-muted">Completed</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {todos.length === 0 ? (
        <div className="text-center py-5">
          <div className="display-1 mb-3">✅</div>
          <h3 className="text-muted">No todos yet</h3>
          <p className="text-muted">Click "New Todo" to create your first task</p>
        </div>
      ) : (
        <>
          {/* Today Section */}
          {renderSection(
            'Today',
            categorizedTodos.today,
            '🔥',
            'No tasks due today. Great job!'
          )}

          {/* Upcoming Section */}
          {renderSection(
            'Upcoming',
            categorizedTodos.upcoming,
            '📅',
            'No upcoming tasks scheduled'
          )}

          {/* Completed Section */}
          {renderSection(
            'Completed',
            categorizedTodos.completed,
            '✓',
            'No completed tasks yet'
          )}
        </>
      )}

      {/* Add Todo Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-plus-circle me-2"></i>
                  New Todo
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter todo title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Add details..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-circle me-2"></i>
                    Create Todo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Todo Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Todo
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter todo title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Add details..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
