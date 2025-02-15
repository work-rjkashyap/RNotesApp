import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Plus} from 'lucide-react-native';
import {useTheme} from '../context/ThemeContext';

interface FABProps {
  onPress: () => void;
}

const FAB: React.FC<FABProps> = ({onPress}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.fab, {backgroundColor: theme.accent}]}
      onPress={onPress}>
      <Plus color="#fff" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FAB;
