import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  matchCount: number;
  currentMatch: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onNext,
  onPrevious,
  matchCount,
  currentMatch,
}) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={text => {
            setQuery(text);
            onSearch(text);
          }}
          placeholder="Search..."
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              onSearch('');
            }}
            style={styles.clearButton}>
            <Icon name="clear" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {matchCount > 0 && (
        <View style={styles.navigationContainer}>
          <Text style={styles.matchCount}>
            {currentMatch} of {matchCount}
          </Text>
          <TouchableOpacity onPress={onPrevious} style={styles.navButton}>
            <Icon name="keyboard-arrow-up" size={24} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext} style={styles.navButton}>
            <Icon name="keyboard-arrow-down" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const searchStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  matchCount: {
    marginRight: 8,
    color: '#666',
  },
  navButton: {
    padding: 4,
    marginHorizontal: 2,
  },
});
