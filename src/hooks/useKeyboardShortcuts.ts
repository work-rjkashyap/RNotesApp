import {useEffect, useCallback} from 'react';
import {Platform, NativeEventSubscription, Keyboard} from 'react-native';
import {ContentBlock, TextStyle} from '../types';

interface KeyboardShortcutsProps {
  onUndo: () => void;
  onRedo: () => void;
  onStyleChange: (styles: Partial<TextStyle>) => void;
  onShowLinkEditor: () => void;
  selectedBlock?: ContentBlock;
}

export const useKeyboardShortcuts = ({
  onUndo,
  onRedo,
  onStyleChange,
  onShowLinkEditor,
  selectedBlock,
}: KeyboardShortcutsProps) => {
  const handleKeyboardShortcuts = useCallback(
    (e: any) => {
      const cmdKey = Platform.OS === 'ios' ? e.metaKey : e.ctrlKey;

      if (cmdKey) {
        switch (e.key) {
          case 'z':
            if (e.shiftKey) {
              onRedo();
            } else {
              onUndo();
            }
            e.preventDefault();
            break;

          case 'b':
            if (
              selectedBlock?.type === 'text' ||
              selectedBlock?.type === 'heading'
            ) {
              onStyleChange({bold: !selectedBlock.styles.bold});
            }
            e.preventDefault();
            break;

          case 'i':
            if (
              selectedBlock?.type === 'text' ||
              selectedBlock?.type === 'heading'
            ) {
              onStyleChange({italic: !selectedBlock.styles.italic});
            }
            e.preventDefault();
            break;

          case 'k':
            onShowLinkEditor();
            e.preventDefault();
            break;
        }
      }
    },
    [onUndo, onRedo, onStyleChange, onShowLinkEditor, selectedBlock],
  );

  useEffect(() => {
    let subscription: NativeEventSubscription;

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      subscription = Keyboard.addListener(
        'keyPressed',
        handleKeyboardShortcuts,
      );
    }

    return () => {
      subscription?.remove();
    };
  }, [handleKeyboardShortcuts]);
};
