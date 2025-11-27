import React, { createContext, useState, useEffect, useContext } from 'react';
import { updateStreak } from '../utils/streak';

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Error loading notes:', error);
        setNotes([]);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, content) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes(prev => [newNote, ...prev]);
    
    // Update notes streak
    updateStreak('notesStreak');
    
    return newNote;
  };

  const editNote = (id, title, content) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { 
            ...note, 
            title: title.trim(), 
            content: content.trim(),
            updatedAt: new Date().toISOString()
          }
        : note
    ));
    
    // Update notes streak
    updateStreak('notesStreak');
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getFilteredNotes = () => {
    if (!searchQuery.trim()) return notes;
    
    const query = searchQuery.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  };

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      editNote,
      deleteNote,
      searchQuery,
      setSearchQuery,
      getFilteredNotes
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
}

export default NotesProvider;
