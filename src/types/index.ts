export interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

export interface Theme {
  background: string;
  text: string;
  cardBackground: string;
  primaryColor: string;
}

export type BlockType =
  | 'text'
  | 'image'
  | 'checklist'
  | 'code'
  | 'table'
  | 'link'
  | 'heading';

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
  color?: string;
  alignment?: 'left' | 'center' | 'right';
  listType?: 'bullet' | 'number' | 'none';
  fontFamily?: string;
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  styles: TextStyle;
  checked?: boolean;
  url?: string;
  language?: string;
  tableData?: string[][];
  level?: number;
}

export interface EditorHistory {
  past: ContentBlock[][];
  present: ContentBlock[];
  future: ContentBlock[][];
}
