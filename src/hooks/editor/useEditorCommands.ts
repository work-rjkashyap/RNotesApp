import {useCallback} from 'react';
import type {EditorRef} from '../../types/editor';

/**
 * Hook for managing editor commands and formatting
 */
export const useEditorCommands = (editorRef: React.RefObject<EditorRef>) => {
  // Text formatting commands
  const toggleBold = useCallback(() => {
    editorRef.current?.commandDOM('bold');
  }, []);

  const toggleItalic = useCallback(() => {
    editorRef.current?.commandDOM('italic');
  }, []);

  const toggleUnderline = useCallback(() => {
    editorRef.current?.commandDOM('underline');
  }, []);

  // List formatting
  const toggleBulletList = useCallback(() => {
    editorRef.current?.commandDOM('insertUnorderedList');
  }, []);

  const toggleNumberedList = useCallback(() => {
    editorRef.current?.commandDOM('insertOrderedList');
  }, []);

  // Insert content
  const insertLink = useCallback((url: string, text: string) => {
    const linkHTML = `<a href="${url}">${text}</a>`;
    editorRef.current?.insertHTML(linkHTML);
  }, []);

  const insertImage = useCallback((uri: string, alt: string = '') => {
    const imageHTML = `<img src="${uri}" alt="${alt}" style="max-width: 100%; height: auto;">`;
    editorRef.current?.insertHTML(imageHTML);
  }, []);

  // History commands
  const undo = useCallback(() => {
    editorRef.current?.commandDOM('undo');
  }, []);

  const redo = useCallback(() => {
    editorRef.current?.commandDOM('redo');
  }, []);

  return {
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleBulletList,
    toggleNumberedList,
    insertLink,
    insertImage,
    undo,
    redo,
  };
};
