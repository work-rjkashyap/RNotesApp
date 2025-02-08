import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Icons
import {Settings, User, BookOpen} from 'lucide-react-native';

// Context
import {ThemeProvider, useTheme} from './src/context/ThemeContext';

// Navigation

// Screens
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Components
import CustomDrawerContent from './src/components/CustomDrawerContent';

// Types
import {DrawerParamList} from './src/types/navigation';
import NotificationPage from './src/screens/NotificationPage';
import SecurityPage from './src/screens/SecurityPage';
import CustomHeader from './src/components/CustomHeader';
import MainStack from './src/navigation/MainStack';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
  const {theme} = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        // headerShown: false,
        drawerStyle: {
          backgroundColor: theme.surface,
          width: 300,
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
        },
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        drawerActiveBackgroundColor: `${theme.primary}20`,
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.text,
        drawerItemStyle: {
          borderRadius: 12,
          paddingHorizontal: 8,
          marginHorizontal: 8,
        },
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 15,
          marginLeft: 6,
        },
      }}>
      <Drawer.Screen
        name="MainStack"
        component={MainStack}
        options={{
          headerShown: false,
          title: 'Notes',
          drawerIcon: ({color}) => (
            <BookOpen size={22} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: () => <CustomHeader title="Settings" showBackButton={true} />,
          drawerIcon: ({color}) => (
            <Settings size={22} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <CustomHeader title="Profile" showBackButton={true} />,
          drawerIcon: ({color}) => (
            <User size={22} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        options={{
          header: () => (
            <CustomHeader title="Notifications" showBackButton={true} />
          ),
          drawerIcon: ({color}) => (
            <User size={22} color={color} strokeWidth={1.5} />
          ),
        }}
        component={NotificationPage}
      />
      <Drawer.Screen
        name="Security"
        options={{
          header: () => <CustomHeader title="Security" showBackButton={true} />,
          drawerIcon: ({color}) => (
            <User size={22} color={color} strokeWidth={1.5} />
          ),
        }}
        component={SecurityPage}
      />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  const {theme, isDark} = useTheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDark ? 'light-content' : 'dark-content'}
              backgroundColor={theme.primary}
            />
            <NavigationContainer>
              <DrawerNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
