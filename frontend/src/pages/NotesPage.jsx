import React, { useState } from 'react';
import { useNotesStore } from '../store/useNotesStore';
import { PlusCircle, Trash2, Save, Edit, Star, StarOff } from 'lucide-react';
import clsx from 'clsx';

const NotesPage = () => {
  const {
    notes,
    addNote,
    deleteNote,
    updateNote,
    toggleFavorite,
    setActiveNote,
    activeNote,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showFavorites,
    setShowFavorites,
  } = useNotesStore();

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('personal');

  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      selectedCategory === 'all' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavorites || note.isFavorite;
    return matchesCategory && matchesSearch && matchesFavorite;
  });

  const handleAddNote = () => {
    if (newTitle.trim() && newContent.trim()) {
      addNote({
        title: newTitle,
        content: newContent,
        category: newCategory,
        isFavorite: false,
      });
      setNewTitle('');
      setNewContent('');
      setNewCategory('personal');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center">📝 Notes Dashboard</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search notes..."
          className="p-2 w-full sm:w-64 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
          <span>Show Favorites</span>
        </label>
      </div>

      {/* Add New Note */}
      <div className="p-4 border rounded-lg shadow-md bg-gray-50 space-y-3">
        <h2 className="text-xl font-semibold">Create a New Note</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded"
          rows={4}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddNote}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No notes found.</p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={clsx(
                'p-4 border rounded-lg shadow-md bg-white space-y-2 relative',
                activeNote?.id === note.id && 'ring-2 ring-blue-500'
              )}
              onClick={() => setActiveNote(note)}
            >
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
              <p className="text-sm text-gray-400">Category: {note.category}</p>

              <div className="flex gap-3 mt-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  <Trash2 size={18} />
                </button>

                <button
                  className="text-yellow-500 hover:text-yellow-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(note.id);
                  }}
                >
                  {note.isFavorite ? <Star size={18} /> : <StarOff size={18} />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPage;
