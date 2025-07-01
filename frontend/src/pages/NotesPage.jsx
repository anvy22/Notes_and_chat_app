import React from 'react';
import NotesList from '../components/notes/NotesList';
import NoteEditor from '../components/notes/NoteEditor';

const NotesPage = () => {
  return (
    <div className="flex h-full">
      <NotesList />
      <NoteEditor />
    </div>
  );
};

export default NotesPage;