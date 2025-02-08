import {useColorScheme} from 'react-native';

export const useAppColorScheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
};
