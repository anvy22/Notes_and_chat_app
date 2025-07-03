import React, { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';
import { useNotesStore } from '../../store/useNotesStore';
import { useThemeStore } from '../../store/useThemeStore';

const CategoryManager = () => {
  const { categories, selectedCategory, setSelectedCategory, addCategory } = useNotesStore();
  const { isDark } = useThemeStore();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      addCategory(trimmed);
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const categoryColors = {
    'all': 'bg-gray-500',
    'personal': 'bg-blue-500',
    'work': 'bg-green-500',
    'ideas': 'bg-yellow-500',
    'chat-generated': 'bg-purple-500',
  };

  return (
    <div className="pt-16 lg:pt-0 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Tag className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Categories</h4>
        <button
          onClick={() => setShowAddCategory(true)}
          className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Categories Scrollable */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
              : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <span className="truncate max-w-[120px]">All</span>
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${categoryColors[category] || 'bg-gray-400'}`}></div>
            <span className="truncate max-w-[120px]">{category}</span>
          </button>
        ))}
      </div>

      {/* Add Category Form */}
      {showAddCategory && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
            placeholder="Category name..."
            className={`flex-1 px-3 py-1 text-sm rounded border ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-1 focus:ring-purple-500`}
            autoFocus
          />
          <button
            onClick={handleAddCategory}
            className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
          >
            Add
          </button>
          <button
            onClick={() => {
              setShowAddCategory(false);
              setNewCategory('');
            }}
            className={`px-3 py-1 text-sm rounded ${
              isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
