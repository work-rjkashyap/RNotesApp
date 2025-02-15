// src/screens/NoteDetail/components/TagModal.tsx
import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Tag, X, Plus, CheckCircle} from 'lucide-react-native';
import {useTheme} from '../../../context/ThemeContext';
import type {TagModalProps} from '../../../types/notes';

const PRESET_TAGS = ['Personal', 'Work', 'Ideas', 'Important', 'Todo'];

export const TagModal: React.FC<TagModalProps> = ({
  visible,
  onClose,
  onSave,
  initialTags,
}) => {
  const {theme, isDark} = useTheme();
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    onSave(tags);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
        <View
          style={[
            styles.content,
            {backgroundColor: isDark ? theme.surface : theme.background},
          ]}>
          <View style={styles.header}>
            <Tag color={theme.primary} size={24} />
            <Text style={[styles.title, {color: theme.text}]}>Manage Tags</Text>
            <TouchableOpacity onPress={onClose}>
              <X color={theme.textSecondary} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.background,
                  borderColor: theme.borderColor,
                },
              ]}
              placeholder="Add new tag..."
              placeholderTextColor={theme.placeholderText}
              value={newTag}
              onChangeText={setNewTag}
              onSubmitEditing={handleAddTag}
            />
            <TouchableOpacity
              style={[
                styles.addButton,
                {
                  backgroundColor: theme.primary,
                  opacity: newTag.trim() ? 1 : 0.6,
                },
              ]}
              onPress={handleAddTag}
              disabled={!newTag.trim()}>
              <Plus color={theme.textInverse} size={24} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.sectionTitle, {color: theme.textSecondary}]}>
            Preset Tags
          </Text>
          <View style={styles.presetTags}>
            {PRESET_TAGS.map(tag => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.presetTag,
                  {
                    backgroundColor: tags.includes(tag)
                      ? `${theme.primary}15`
                      : 'transparent',
                    borderColor: theme.borderColor,
                  },
                ]}
                onPress={() => {
                  if (tags.includes(tag)) {
                    handleRemoveTag(tag);
                  } else {
                    setTags([...tags, tag]);
                  }
                }}>
                <Text
                  style={[
                    styles.presetTagText,
                    {
                      color: tags.includes(tag) ? theme.primary : theme.text,
                    },
                  ]}>
                  {tag}
                </Text>
                {tags.includes(tag) && (
                  <CheckCircle size={16} color={theme.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, {color: theme.textSecondary}]}>
            Selected Tags ({tags.length})
          </Text>
          <View style={styles.selectedTags}>
            {tags.map(tag => (
              <View
                key={tag}
                style={[
                  styles.selectedTag,
                  {backgroundColor: `${theme.primary}15`},
                ]}>
                <Text style={[styles.selectedTagText, {color: theme.primary}]}>
                  {tag}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveTag(tag)}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                  <X size={16} color={theme.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                {borderColor: theme.borderColor},
              ]}
              onPress={onClose}>
              <Text style={[styles.buttonText, {color: theme.textSecondary}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                {backgroundColor: theme.primary},
              ]}
              onPress={handleSave}>
              <Text style={[styles.buttonText, {color: theme.textInverse}]}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginLeft: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 12,
  },
  presetTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  presetTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  presetTagText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  selectedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  selectedTagText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1.5,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.3,
  },
});
