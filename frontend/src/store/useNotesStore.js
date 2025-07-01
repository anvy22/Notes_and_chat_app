import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNotesStore = create(
  persist(
    (set, get) => ({
      notes: [],
      activeNote: null,
      searchQuery: '',
      showFavorites: false,
      
      setActiveNote: (note) => set({ activeNote: note }),
      
      addNote: (noteData) => {
        const newNote = {
          ...noteData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({ 
          notes: [newNote, ...state.notes],
          activeNote: newNote,
        }));
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map(note =>
            note.id === id 
              ? { ...note, ...updates, updatedAt: new Date() }
              : note
          ),
          activeNote: state.activeNote?.id === id 
            ? { ...state.activeNote, ...updates, updatedAt: new Date() }
            : state.activeNote,
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter(note => note.id !== id),
          activeNote: state.activeNote?.id === id ? null : state.activeNote,
        }));
      },
      
      toggleFavorite: (id) => {
        const { updateNote } = get();
        const note = get().notes.find(n => n.id === id);
        if (note) {
          updateNote(id, { isFavorite: !note.isFavorite });
        }
      },
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setShowFavorites: (show) => set({ showFavorites: show }),
      
      createNoteFromChat: (chatId, chatName, content) => {
        const { addNote } = get();
        addNote({
          title: `Notes from ${chatName}`,
          content,
          isFavorite: false,
          tags: ['chat-generated'],
          fromChat: { chatId, chatName },
        });
      },
    }),
    {
      name: 'notes-storage',
    }
  )
);