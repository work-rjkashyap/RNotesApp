import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';

// Screens
import HomeScreen from '../screens/HomeScreen';
// import NoteDetailScreen from '../screens/NoteDetailScreen';

// Types
import {RootStackParamList} from '../types/navigation';
import NoteDetailScreen from '../screens/NoteDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        header: () => {
          let title = 'My Notes';
          let showPlusIcon = false;
          let showBackButton = false;

          switch (route.name) {
            case 'Home':
              title = 'My Notes';
              showPlusIcon = true;
              break;
            case 'NoteDetail':
              title = route.params?.noteId ? 'Edit Note' : 'New Note';
              showBackButton = true;
              break;
          }

          return (
            <CustomHeader
              title={title}
              showBackButton={showBackButton}
              showPlusIcon={showPlusIcon}
              onPlusPress={() =>
                navigation.navigate('NoteDetail', {noteId: null})
              }
            />
          );
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
      })}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetailScreen}
        initialParams={{noteId: null}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
