import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Note, NotesState} from './types';

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      const existingNoteIndex = state.notes.findIndex(
        note => note.id === action.payload.id,
      );

      if (existingNoteIndex !== -1) {
        // Update existing note
        state.notes[existingNoteIndex] = action.payload;
      } else {
        // Add new note
        state.notes.push(action.payload);
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    clearNotes: state => {
      state.notes = [];
    },
  },
});

export const {addNote, deleteNote, clearNotes} = notesSlice.actions;
export default notesSlice.reducer;
