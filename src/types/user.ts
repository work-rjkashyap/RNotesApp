export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  sortBy: 'date' | 'title' | 'category';
  notifications: boolean;
}
