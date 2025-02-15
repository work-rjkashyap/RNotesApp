import {useCallback, useReducer} from 'react';
import {ContentBlock, EditorHistory} from '../types';

type HistoryAction =
  | {type: 'UNDO'}
  | {type: 'REDO'}
  | {type: 'UPDATE'; content: ContentBlock[]};

const HISTORY_LIMIT = 50;

const historyReducer = (
  state: EditorHistory,
  action: HistoryAction,
): EditorHistory => {
  switch (action.type) {
    case 'UNDO': {
      if (state.past.length === 0) return state;
      const [newPresent, ...past] = state.past;
      return {
        past,
        present: newPresent,
        future: [state.present, ...state.future],
      };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      const [newPresent, ...future] = state.future;
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future,
      };
    }
    case 'UPDATE': {
      if (JSON.stringify(state.present) === JSON.stringify(action.content)) {
        return state;
      }
      return {
        past: [state.present, ...state.past].slice(0, HISTORY_LIMIT),
        present: action.content,
        future: [],
      };
    }
  }
};

export const useEditorHistory = (initialContent: ContentBlock[]) => {
  const [history, dispatch] = useReducer(historyReducer, {
    past: [],
    present: initialContent,
    future: [],
  });

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const undo = useCallback(() => {
    if (canUndo) dispatch({type: 'UNDO'});
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) dispatch({type: 'REDO'});
  }, [canRedo]);

  const updateContent = useCallback((content: ContentBlock[]) => {
    dispatch({type: 'UPDATE', content});
  }, []);

  return {
    content: history.present,
    undo,
    redo,
    canUndo,
    canRedo,
    updateContent,
  };
};
