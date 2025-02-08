import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Note {
  id: string;
  content: string;
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: [] as Note[],
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const {id, content} = action.payload;
      const note = state.find(note => note.id === id);
      if (note) {
        note.content = content;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      return state.filter(note => note.id !== action.payload);
    },
  },
});

export const {addNote, updateNote, deleteNote} = notesSlice.actions;
export default notesSlice.reducer;
