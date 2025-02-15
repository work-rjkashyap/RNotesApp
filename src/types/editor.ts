import type {StyleProp, ViewStyle} from 'react-native';
import type {SharedValue} from 'react-native-reanimated';
import {Theme} from './theme';

export interface EditorRef {
  current: {
    focusContentEditor: () => void;
    blurContentEditor: () => void;
    insertHTML: (html: string) => void;
    setContentHTML: (html: string) => void;
    getContentHtml: () => Promise<string>;
    commandDOM: (command: string, value?: string) => void;
  } | null;
}

export interface RichEditorProps {
  initialContentHTML?: string;
  onChange?: (text: string) => void;
  onInit?: () => void;
  placeholder?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface ToolbarProps {
  editor: EditorRef;
  theme: Theme;
  isDark: boolean;
  toolbarPosition: SharedValue<number>;
  onAction?: (action: string) => void;
}

export type ImageSource = 'camera' | 'library';

export interface ImagePickerProps {
  onSelectSource: (source: ImageSource) => void;
  onClose: () => void;
}

export interface EditorContextType {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  content: string;
  setContent: (content: string) => void;
  selection: {
    start: number;
    end: number;
  };
  setSelection: (selection: {start: number; end: number}) => void;
}
