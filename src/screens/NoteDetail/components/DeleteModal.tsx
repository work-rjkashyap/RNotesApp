import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {AlertTriangle, Trash2} from 'lucide-react-native';
import {useTheme} from '../../../context/ThemeContext';
import type {DeleteModalProps} from '../../../types/notes';

export const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onConfirm,
  noteTitle,
}) => {
  const {theme, isDark} = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
      onClose();
    }
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
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: `${theme.error}15`},
            ]}>
            <AlertTriangle size={32} color={theme.error} />
          </View>

          <Text style={[styles.title, {color: theme.text}]}>Delete Note</Text>

          <Text style={[styles.message, {color: theme.textSecondary}]}>
            Are you sure you want to delete this note? This action cannot be
            undone.
          </Text>

          <View
            style={[
              styles.notePreview,
              {
                backgroundColor: isDark ? theme.background : theme.surface,
                borderColor: `${theme.error}20`,
              },
            ]}>
            <Text
              style={[styles.noteTitle, {color: theme.text}]}
              numberOfLines={1}>
              {noteTitle}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                {borderColor: theme.borderColor},
              ]}
              onPress={onClose}
              disabled={isDeleting}>
              <Text style={[styles.buttonText, {color: theme.textSecondary}]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.deleteButton,
                {backgroundColor: theme.error},
              ]}
              onPress={handleDelete}
              disabled={isDeleting}>
              {isDeleting ? (
                <ActivityIndicator color={theme.textInverse} />
              ) : (
                <>
                  <Trash2 size={20} color={theme.textInverse} />
                  <Text style={[styles.buttonText, {color: theme.textInverse}]}>
                    Delete
                  </Text>
                </>
              )}
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
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  notePreview: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  noteTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    borderWidth: 1.5,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.3,
  },
});
