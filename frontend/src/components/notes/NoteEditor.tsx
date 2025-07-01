import React, { useState, useEffect } from 'react';
import { Star, Trash2, Tag, Clock, Hash } from 'lucide-react';
import { useNotesStore } from '../../store/useNotesStore';
import { useThemeStore } from '../../store/useThemeStore';
import { format } from 'date-fns';

const NoteEditor: React.FC = () => {
  const { activeNote, updateNote, deleteNote, toggleFavorite } = useNotesStore();
  const { isDark } = useThemeStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setTags(activeNote.tags);
    }
  }, [activeNote]);

  const handleSave = () => {
    if (!activeNote) return;
    updateNote(activeNote.id, { title, content, tags });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setNewTag('');
      if (activeNote) {
        updateNote(activeNote.id, { tags: updatedTags });
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    if (activeNote) {
      updateNote(activeNote.id, { tags: updatedTags });
    }
  };

  const handleDelete = () => {
    if (activeNote && confirm('Are you sure you want to delete this note?')) {
      deleteNote(activeNote.id);
    }
  };

  if (!activeNote) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Hash className="w-12 h-12 text-white" />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Select a note
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose a note from the sidebar to start editing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Note Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Clock className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Last updated {format(activeNote.updatedAt, 'MMM dd, yyyy HH:mm')}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(activeNote.id)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              activeNote.isFavorite
                ? 'text-yellow-500 hover:bg-yellow-50'
                : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Star className={`w-5 h-5 ${activeNote.isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleDelete}
            className={`p-2 rounded-lg transition-all duration-200 text-red-500 ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-red-50'
            }`}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Note Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          placeholder="Note title..."
          className={`w-full text-2xl font-bold mb-4 bg-transparent border-none outline-none ${
            isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
          }`}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleSave}
          placeholder="Start writing your note..."
          className={`w-full h-64 min-h-64 resize-none bg-transparent border-none outline-none text-base leading-relaxed ${
            isDark ? 'text-gray-300 placeholder-gray-400' : 'text-gray-700 placeholder-gray-500'
          }`}
        />

        {/* Tags Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Tags</h4>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a tag..."
              className={`flex-1 px-3 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Add
            </button>
          </div>
        </div>

        {/* Chat Origin Info */}
        {activeNote.fromChat && (
          <div className={`mt-6 p-4 rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Hash className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Generated from Chat
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              This note was created from a conversation in "{activeNote.fromChat.chatName}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;