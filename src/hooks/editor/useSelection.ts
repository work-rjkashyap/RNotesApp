import {useState, useCallback} from 'react';

/**
 * Hook for managing text selection in the editor
 */
export const useSelection = () => {
  const [selection, setSelection] = useState({start: 0, end: 0});

  const handleSelectionChange = useCallback((start: number, end: number) => {
    setSelection({start, end});
  }, []);

  const isTextSelected = selection.start !== selection.end;

  return {
    selection,
    handleSelectionChange,
    isTextSelected,
  };
};
