import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTE_STORAGE_KEY = 'notes';

export const saveNotes = async (notes: any[]) => {
  try {
    await AsyncStorage.setItem(NOTE_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes:', error);
  }
};

export const loadNotes = async (): Promise<any[]> => {
  try {
    const notes = await AsyncStorage.getItem(NOTE_STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Failed to load notes:', error);
    return [];
  }
};
