import React, { useState, useEffect, useRef } from 'react';
import { Smile } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

const EmojiPicker = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useThemeStore();
  const pickerRef = useRef();

  const emojiCategories = {
    'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
    'Gestures': ['👍', '👎', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '🤲', '🤝', '🙏'],
    'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
    'Objects': ['💻', '📱', '⌚', '📷', '📹', '🎵', '🎶', '🎤', '🎧', '📻', '🎸', '🎹', '🥁', '🎺', '🎷', '🎻', '🎮', '🕹️', '🎯', '🎲', '🎰', '🎳']
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
        aria-label="Toggle emoji picker"
      >
        <Smile className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute bottom-full right-0 translate-y-[10px] w-72 sm:w-80 h-64 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg shadow-lg z-50 overflow-hidden`}
        >
          <div className="h-full overflow-y-auto p-3">
            {Object.entries(emojiCategories).map(([category, emojis]) => (
              <div key={category} className="mb-4">
                <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {category}
                </h4>
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        onEmojiSelect(emoji);
                        setIsOpen(false);
                      }}
                      className="w-8 h-8 text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors flex items-center justify-center"
                      aria-label={`Select emoji ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
