import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {RootState} from '../store';
import {useTheme} from '../context/ThemeContext';
import NoteCard from '../components/NoteCard';
import FAB from '../components/FAB';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {theme} = useTheme();
  const notes = useSelector((state: RootState) => state.notes.notes);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NoteCard
            note={item}
            onPress={() => navigation.navigate('NoteDetail', {noteId: item.id})}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <FAB onPress={() => navigation.navigate('NoteDetail')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 5,
  },
});

export default HomeScreen;
