// src/store/slices/noteSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Note, NotesState} from '../../types/notes';

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        note => note.id === action.payload.id,
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {addNote, updateNote, deleteNote, setLoading, setError} =
  noteSlice.actions;

export default noteSlice.reducer;
