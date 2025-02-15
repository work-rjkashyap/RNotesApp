// src/types/notes.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

export interface NoteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  note?: Note;
}

export interface TagModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (tags: string[]) => void;
  initialTags: string[];
}

export interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noteTitle: string;
}
