import React from 'react';
import NotesList from '../components/notes/NotesList';
import NoteEditor from '../components/notes/NoteEditor';

const NotesPage = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Notes List Sidebar */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <NotesList />
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        <NoteEditor />
      </div>
    </div>
  );
};

export default NotesPage;
