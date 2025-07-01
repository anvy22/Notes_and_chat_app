import React from 'react';
import NotesList from '../components/notes/NotesList';
import NoteEditor from '../components/notes/NoteEditor';

const NotesPage: React.FC = () => {
  return (
    <div className="flex h-full">
      <NotesList />
      <NoteEditor />
    </div>
  );
};

export default NotesPage;