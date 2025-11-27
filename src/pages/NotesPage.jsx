import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';

export default function NotesPage() {
  const { notes, addNote, editNote, deleteNote, searchQuery, setSearchQuery, getFilteredNotes } = useNotes();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleAddClick = () => {
    setFormData({ title: '', content: '' });
    setShowAddModal(true);
  };

  const handleEditClick = (note) => {
    setCurrentNote(note);
    setFormData({ title: note.title, content: note.content });
    setShowEditModal(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addNote(formData.title, formData.content);
      setShowAddModal(false);
      setFormData({ title: '', content: '' });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && currentNote) {
      editNote(currentNote.id, formData.title, formData.content);
      setShowEditModal(false);
      setCurrentNote(null);
      setFormData({ title: '', content: '' });
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteNote(id);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <h1 className="display-4 fw-bold mb-2">
            <span className="me-2">📝</span>
            Notes
          </h1>
          <p className="text-muted">Capture your thoughts and ideas</p>
        </div>
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end">
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleAddClick}
          >
            <i className="bi bi-plus-circle me-2"></i>
            New Note
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="btn btn-outline-secondary"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-5">
          <div className="display-1 mb-3">📝</div>
          <h3 className="text-muted">
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-muted">
            {searchQuery ? 'Try a different search term' : 'Click "New Note" to create your first note'}
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredNotes.map(note => (
            <div key={note.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ transition: 'all 0.3s' }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">{note.title}</h5>
                  <p className="card-text text-muted flex-grow-1" style={{ 
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {note.content || 'No content'}
                  </p>
                  <div className="mt-3">
                    <small className="text-muted d-block mb-2">
                      <i className="bi bi-clock me-1"></i>
                      {formatDate(note.updatedAt)}
                    </small>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-primary flex-fill"
                        onClick={() => handleEditClick(note)}
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(note.id, note.title)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-plus-circle me-2"></i>
                  New Note
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
                      className="form-control form-control-lg"
                      placeholder="Enter note title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Content</label>
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your note here..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    ></textarea>
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
                    Create Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Note
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
                      className="form-control form-control-lg"
                      placeholder="Enter note title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Content</label>
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your note here..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    ></textarea>
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

      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
