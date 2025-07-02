import React, { useMemo } from 'react';
import { Search, Plus, Star, FileText, Hash } from 'lucide-react';
import { useNotesStore } from '../../store/useNotesStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useAppStore } from '../../store/useAppStore';
import { format } from 'date-fns';
import CategoryManager from './CategoryManager';

const NotesList = () => {
  const {
    notes,
    activeNote,
    searchQuery,
    showFavorites,
    selectedCategory,
    setActiveNote,
    setSearchQuery,
    setShowFavorites,
    addNote,
  } = useNotesStore();
  const { isDark } = useThemeStore();
  const { isMobile, closeSidebar } = useAppStore();

  const filteredNotes = useMemo(() => {
    let filtered = notes;
    
    if (showFavorites) {
      filtered = filtered.filter(note => note.isFavorite);
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [notes, searchQuery, showFavorites, selectedCategory]);

  const handleNewNote = () => {
    addNote({
      title: 'Untitled Note',
      content: '',
      isFavorite: false,
      tags: [],
      category: selectedCategory !== 'all' ? selectedCategory : 'personal',
    });
  };

  const handleNoteSelect = (note) => {
    setActiveNote(note);
    if (isMobile) {
      closeSidebar();
    }
  };

  return (
   <div className={`w-full lg:w-80 ${isDark ? 'bg-gray-900' : 'bg-white'} border-r ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col`} style={{ height: '100vh' }}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Notes
          </h2>
          <button
            onClick={handleNewNote}
            className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative mb-4">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
          />
        </div>

        <CategoryManager />

        <div className="flex gap-2">
          <button
            onClick={() => setShowFavorites(false)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              !showFavorites
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Notes
          </button>
          <button
            onClick={() => setShowFavorites(true)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
              showFavorites
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Star className="w-4 h-4" />
            Favorites
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className="p-4 text-center">
            <FileText className={`w-12 h-12 mx-auto mb-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchQuery ? 'No notes found' : showFavorites ? 'No favorite notes' : 'No notes yet'}
            </p>
            {!searchQuery && (
              <button 
                onClick={handleNewNote}
                className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Create your first note
              </button>
            )}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteSelect(note)}
              className={`p-4 border-b cursor-pointer transition-all duration-200 ${
                activeNote?.id === note.id
                  ? ' bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200'
                  : `${isDark ? 'border-gray-700 hover:bg-gray-800/60' : 'border-gray-100 hover:bg-gray-50'}`
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className={`font-semibold truncate flex-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {note.title}
                </h3>
                {note.isFavorite && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
              </div>
              
              <p className={`text-sm line-clamp-2 mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {note.content || 'No content'}
              </p>
              
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                  {note.updatedAt && !isNaN(new Date(note.updatedAt).getTime())
                      ? format(new Date(note.updatedAt), 'MMM dd, yyyy')
                      : 'Unknown'}
                </span>
                
                {note.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                      {note.tags.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                {note.category && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {note.category}
                  </span>
                )}
                
                {note.fromChat && (
                  <div className={`text-xs px-2 py-1 rounded ${
                    isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'
                  }`}>
                    From Chat
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;