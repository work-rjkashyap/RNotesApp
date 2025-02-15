import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Modal,
  ActivityIndicator,
  Keyboard,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '../context/ThemeContext';
import {addNote, updateNote, deleteNote} from '../store/slices/noteSlice';
import {
  Save,
  Trash2,
  Calendar,
  Tag,
  Plus,
  X,
  Edit3,
  CheckCircle,
  AlertTriangle,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image as ImageIcon,
  Undo,
  Redo,
} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import {RootStackParamList} from '../types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootState} from '../store';

// Types
type NoteDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NoteDetail'
>;

type NoteDetailScreenRouteProp = RouteProp<RootStackParamList, 'NoteDetail'>;

type NoteDetailScreenProps = {
  navigation: NoteDetailScreenNavigationProp;
  route: NoteDetailScreenRouteProp;
};

// Constants
const PRESET_TAGS = ['Personal', 'Work', 'Ideas', 'Important', 'Todo'];
const TOOLBAR_HEIGHT = 56;

const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({
  navigation,
  route,
}) => {
  // Theme and Redux
  const {theme, isDark} = useTheme();
  const dispatch = useDispatch();
  const noteId = route.params?.noteId;

  // State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(!noteId);

  // Rich Editor Ref
  const richText = useRef<RichEditor>();

  // Animated values
  const fabScale = useSharedValue(1);
  const fabRotate = useSharedValue(0);

  // Selectors
  const note = useSelector((state: RootState) =>
    state.notes.notes.find(n => n.id === noteId),
  );

  // Effects
  useEffect(() => {
    if (noteId && note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
    }
  }, [noteId, note]);

  // Handlers
  const handleEditorChange = (text: string) => {
    setContent(text);
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Required Field', 'Please enter a title for your note');
      return;
    }

    const noteData = {
      id: noteId || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      tags,
      createdAt: noteId ? note?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (noteId) {
      dispatch(updateNote(noteData));
    } else {
      dispatch(addNote(noteData));
    }

    navigation.goBack();
  };

  const handleFabPress = () => {
    fabScale.value = withSpring(0.8);
    fabRotate.value = withTiming(45, {duration: 250});

    setTimeout(() => {
      fabScale.value = withSpring(1);
      fabRotate.value = withTiming(0, {duration: 250});
      handleSave();
    }, 250);
  };

  const handleDeleteNote = async () => {
    try {
      await dispatch(deleteNote(noteId));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete note. Please try again.');
    }
  };

  // Custom toolbar actions
  const editorInitializedCallback = () => {
    richText.current?.setContentHTML(content);
  };

  // Animations
  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: withSpring(fabScale.value)},
      {rotateZ: `${fabRotate.value}deg`},
    ],
  }));

  // Sub-components
  const TagModal = () => {
    const [localTags, setLocalTags] = useState<string[]>(tags);
    const [inputValue, setInputValue] = useState('');

    const handleAddTag = () => {
      if (inputValue.trim() && !localTags.includes(inputValue.trim())) {
        setLocalTags(prev => [...prev, inputValue.trim()]);
        setInputValue('');
      }
    };

    const handleRemoveTag = (tagToRemove: string) => {
      setLocalTags(prev => prev.filter(tag => tag !== tagToRemove));
    };

    const handleSaveTags = () => {
      setTags(localTags);
      setShowTagModal(false);
    };

    return (
      <Modal
        visible={showTagModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTagModal(false)}>
        <View
          style={[
            styles.modalOverlay,
            {backgroundColor: 'rgba(0, 0, 0, 0.75)'},
          ]}>
          <View
            style={[
              styles.tagModalContainer,
              {backgroundColor: isDark ? theme.surface : '#FFFFFF'},
            ]}>
            <View style={styles.tagModalHeader}>
              <Text style={[styles.tagModalTitle, {color: theme.text}]}>
                Manage Tags
              </Text>
              <TouchableOpacity
                onPress={() => setShowTagModal(false)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <X size={20} color={theme.text} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>

            <View style={styles.tagInputContainer}>
              <View style={styles.tagInputWrapper}>
                <TextInput
                  style={[
                    styles.tagInput,
                    {
                      color: theme.text,
                      backgroundColor: isDark
                        ? theme.background
                        : theme.surface,
                      borderColor: theme.secondary + '30',
                    },
                  ]}
                  placeholder="Add new tag..."
                  placeholderTextColor={theme.secondary}
                  value={inputValue}
                  onChangeText={setInputValue}
                  onSubmitEditing={handleAddTag}
                />
                <TouchableOpacity
                  style={[
                    styles.addTagButton,
                    {
                      backgroundColor: theme.primary,
                      opacity: inputValue.trim() ? 1 : 0.6,
                    },
                  ]}
                  onPress={handleAddTag}
                  disabled={!inputValue.trim()}
                  activeOpacity={0.7}>
                  <Plus size={20} color="#FFFFFF" strokeWidth={1.5} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tagSection}>
              <Text style={[styles.sectionTitle, {color: theme.secondary}]}>
                Preset Tags
              </Text>
              <View style={styles.presetTagsGrid}>
                {PRESET_TAGS.map(tag => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.presetTag,
                      {
                        backgroundColor: localTags.includes(tag)
                          ? theme.primary + '20'
                          : 'transparent',
                        borderColor: theme.primary + '40',
                      },
                    ]}
                    onPress={() => {
                      if (localTags.includes(tag)) {
                        handleRemoveTag(tag);
                      } else {
                        setLocalTags(prev => [...prev, tag]);
                      }
                    }}
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.presetTagText,
                        {
                          color: localTags.includes(tag)
                            ? theme.primary
                            : theme.text,
                        },
                      ]}>
                      {tag}
                    </Text>
                    {localTags.includes(tag) && (
                      <CheckCircle
                        size={14}
                        color={theme.primary}
                        strokeWidth={1.5}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.tagSection}>
              <Text style={[styles.sectionTitle, {color: theme.secondary}]}>
                Selected Tags ({localTags.length})
              </Text>
              <View style={styles.selectedTagsGrid}>
                {localTags.map(tag => (
                  <View
                    key={tag}
                    style={[
                      styles.selectedTag,
                      {backgroundColor: theme.primary + '15'},
                    ]}>
                    <Text
                      style={[styles.selectedTagText, {color: theme.primary}]}>
                      {tag}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveTag(tag)}
                      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
                      <X size={14} color={theme.primary} strokeWidth={1.5} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {borderColor: theme.secondary + '30'},
                ]}
                onPress={() => setShowTagModal(false)}
                activeOpacity={0.7}>
                <Text
                  style={[styles.cancelButtonText, {color: theme.secondary}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, {backgroundColor: theme.primary}]}
                onPress={handleSaveTags}
                activeOpacity={0.7}>
                <Text style={[styles.saveButtonText, {color: '#FFFFFF'}]}>
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const DeleteNoteModal = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
      setIsDeleting(true);
      try {
        await handleDeleteNote();
      } finally {
        setIsDeleting(false);
        setShowDeleteModal(false);
      }
    };

    return (
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}>
        <View
          style={[
            styles.modalOverlay,
            {backgroundColor: 'rgba(0, 0, 0, 0.75)'},
          ]}>
          <View
            style={[
              styles.modalContainer,
              {backgroundColor: isDark ? theme.surface : '#FFFFFF'},
            ]}>
            <View style={styles.modalIconContainer}>
              <View
                style={[
                  styles.iconCircle,
                  {backgroundColor: theme.error + '15'},
                ]}>
                <AlertTriangle size={32} color={theme.error} strokeWidth={2} />
              </View>
            </View>

            <Text style={[styles.modalTitle, {color: theme.text}]}>
              Delete Note
            </Text>

            <Text style={[styles.modalMessage, {color: theme.secondary}]}>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </Text>

            <View
              style={[
                styles.previewBox,
                {
                  backgroundColor: isDark ? theme.background : theme.surface,
                  borderColor: theme.error + '20',
                },
              ]}>
              <Text
                style={[styles.previewTitle, {color: theme.text}]}
                numberOfLines={1}>
                {note?.title}
              </Text>
              <Text
                style={[styles.previewContent, {color: theme.secondary}]}
                numberOfLines={2}>
                {note?.content}
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.cancelBtn,
                  {borderColor: theme.secondary + '30'},
                ]}
                onPress={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                activeOpacity={0.7}>
                <Text style={[styles.cancelBtnText, {color: theme.secondary}]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deleteBtn, {backgroundColor: theme.error}]}
                onPress={handleDelete}
                disabled={isDeleting}
                activeOpacity={0.7}>
                {isDeleting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Trash2 size={20} color="#FFFFFF" strokeWidth={1.5} />
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Main Render
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, {backgroundColor: theme.background}]}>
        <View
          style={[styles.header, {borderBottomColor: theme.secondary + '20'}]}>
          <View style={styles.headerLeft}>
            <View style={styles.dateWrapper}>
              <Calendar size={16} color={theme.secondary} strokeWidth={1.5} />
              <Text style={[styles.dateText, {color: theme.secondary}]}>
                {new Date(note?.updatedAt || Date.now()).toLocaleDateString()}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.tagBtn, {backgroundColor: theme.primary + '15'}]}
              onPress={() => setShowTagModal(true)}>
              <Tag size={16} color={theme.primary} strokeWidth={1.5} />
              <Text style={[styles.tagBtnText, {color: theme.primary}]}>
                {tags.length} Tags
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerRight}>
            {noteId && !isEditing && (
              <TouchableOpacity
                style={[styles.iconBtn, {backgroundColor: theme.error + '15'}]}
                onPress={() => setShowDeleteModal(true)}>
                <Trash2 size={20} color={theme.error} strokeWidth={1.5} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.iconBtn, {backgroundColor: theme.primary + '15'}]}
              onPress={() => setIsEditing(!isEditing)}>
              <Edit3 size={20} color={theme.primary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? TOOLBAR_HEIGHT : 0}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <TextInput
              style={[styles.titleInput, {color: theme.text}]}
              placeholder="Note Title"
              placeholderTextColor={theme.secondary + '80'}
              value={title}
              onChangeText={setTitle}
              editable={isEditing}
              multiline
            />

            {tags.length > 0 && (
              <View style={styles.tagList}>
                {tags.map(tag => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tag,
                      {backgroundColor: theme.primary + '15'},
                    ]}>
                    <Text style={[styles.tagText, {color: theme.primary}]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.editorContainer}>
              {isEditing && (
                <RichToolbar
                  editor={richText}
                  selectedIconTint={theme.primary}
                  iconTint={theme.secondary}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.heading1,
                    actions.heading2,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertLink,
                    actions.insertImage,
                    actions.undo,
                    actions.redo,
                  ]}
                  iconMap={{
                    [actions.setBold]: () => (
                      <Bold color={theme.secondary} size={20} />
                    ),
                    [actions.setItalic]: () => (
                      <Italic color={theme.secondary} size={20} />
                    ),
                    [actions.insertBulletsList]: () => (
                      <List color={theme.secondary} size={20} />
                    ),
                    [actions.insertOrderedList]: () => (
                      <ListOrdered color={theme.secondary} size={20} />
                    ),
                    [actions.insertLink]: () => (
                      <Link color={theme.secondary} size={20} />
                    ),
                    [actions.insertImage]: () => (
                      <ImageIcon color={theme.secondary} size={20} />
                    ),
                    [actions.undo]: () => (
                      <Undo color={theme.secondary} size={20} />
                    ),
                    [actions.redo]: () => (
                      <Redo color={theme.secondary} size={20} />
                    ),
                  }}
                  style={[
                    styles.toolbar,
                    {backgroundColor: isDark ? theme.surface : '#FFFFFF'},
                  ]}
                />
              )}

              <RichEditor
                ref={richText}
                onChange={handleEditorChange}
                initialContentHTML={content}
                editorInitializedCallback={editorInitializedCallback}
                disabled={!isEditing}
                placeholder="Start writing..."
                initialHeight={400}
                style={styles.editor}
                containerStyle={[
                  styles.editorContainer,
                  {backgroundColor: theme.background},
                ]}
                editorStyle={{
                  backgroundColor: theme.background,
                  color: theme.text,
                  placeholderColor: theme.secondary + '80',
                  contentCSSText: `
                    font-family: 'Poppins-Regular';
                    font-size: 16px;
                    line-height: 24px;
                    color: ${theme.text};
                  `,
                }}
              />
            </View>
          </ScrollView>

          {isEditing && (
            <Animated.View
              style={[
                styles.fab,
                fabAnimatedStyle,
                {
                  backgroundColor: theme.primary,
                  shadowColor: theme.primary,
                },
              ]}>
              <TouchableOpacity
                onPress={handleFabPress}
                activeOpacity={0.8}
                style={styles.fabTouchable}>
                <Save color="#FFFFFF" size={24} strokeWidth={1.5} />
              </TouchableOpacity>
            </Animated.View>
          )}
        </KeyboardAvoidingView>

        <TagModal />
        <DeleteNoteModal />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  tagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  tagBtnText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
    paddingVertical: 8,
  },
  liveEditContainer: {
    position: 'relative',
    flex: 1,
    minHeight: 200,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: 'transparent',
    padding: 0,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    zIndex: 1,
  },
  markdownContainer: {
    flex: 1,
    minHeight: 200,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  fab: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalIconContainer: {
    marginBottom: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  previewBox: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  previewContent: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
  },
  deleteBtn: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    gap: 8,
  },
  cancelBtnText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
  },
  deleteBtnText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  tagModalContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
  },
  tagModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tagModalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  tagInputContainer: {
    marginBottom: 24,
  },
  tagInputWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  tagInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  addTagButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 12,
  },
  presetTagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  selectedTagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
  },
  saveButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.3,
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.3,
  },
  editorContainer: {
    flex: 1,
    minHeight: 400,
    borderRadius: 12,
    overflow: 'hidden',
  },
  editor: {
    flex: 1,
  },
  toolbar: {
    height: TOOLBAR_HEIGHT,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default NoteDetailScreen;
