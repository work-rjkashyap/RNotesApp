import {useRef, useCallback, useState, useEffect} from 'react';
import {Platform} from 'react-native';
import type {EditorRef} from '../../types/editor';

/**
 * Main hook for managing the rich text editor state and functionality
 */
export const useEditor = (initialContent: string = '') => {
  // Reference to the editor instance
  const editorRef = useRef<EditorRef>(null);

  // Editor state
  const [isReady, setIsReady] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isFocused, setIsFocused] = useState(false);

  // Initialize editor
  const handleEditorInit = useCallback(() => {
    setIsReady(true);
    // Set initial content if provided
    if (initialContent && editorRef.current) {
      editorRef.current.setContentHTML(initialContent);
    }
  }, [initialContent]);

  // Handle content changes
  const handleContentChange = useCallback((html: string) => {
    setContent(html);
  }, []);

  // Focus management
  const focusEditor = useCallback(() => {
    editorRef.current?.focusContentEditor();
    setIsFocused(true);
  }, []);

  const blurEditor = useCallback(() => {
    editorRef.current?.blurContentEditor();
    setIsFocused(false);
  }, []);

  return {
    editorRef,
    isReady,
    content,
    isFocused,
    handleEditorInit,
    handleContentChange,
    focusEditor,
    blurEditor,
  };
};
