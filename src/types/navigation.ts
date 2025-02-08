import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  NoteDetail: {noteId?: string};
  Settings: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainStack: undefined;
  Settings: undefined;
  Profile: undefined;
  Notifications: undefined;
  Security: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
export type DrawerNavigationProp = DrawerNavigationProp<DrawerParamList>;

export type HomeScreenProps = {
  navigation: RootStackNavigationProp;
};

export type NoteDetailScreenProps = {
  navigation: RootStackNavigationProp;
  route: RouteProp<RootStackParamList, 'NoteDetail'>;
};

export type SettingsScreenProps = {
  navigation: DrawerNavigationProp;
};

export type ProfileScreenProps = {
  navigation: DrawerNavigationProp;
};
