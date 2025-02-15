import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Camera, Image as ImageIcon} from 'lucide-react-native';
import {useTheme} from '../../context/ThemeContext';
import type {ImagePickerProps} from '../../types/editor';

const ImagePicker: React.FC<ImagePickerProps> = ({onSelectSource, onClose}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, {backgroundColor: theme.primary + '15'}]}
        onPress={() => onSelectSource('camera')}>
        <Camera size={24} color={theme.primary} />
        <Text style={[styles.optionText, {color: theme.primary}]}>
          Take Photo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, {backgroundColor: theme.primary + '15'}]}
        onPress={() => onSelectSource('library')}>
        <ImageIcon size={24} color={theme.primary} />
        <Text style={[styles.optionText, {color: theme.primary}]}>
          Choose from Library
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default ImagePicker;
