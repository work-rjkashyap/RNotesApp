import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '../../context/ThemeContext';
import {addNote, updateNote, deleteNote} from '../../store/slices/noteSlice';
import {Save, Trash2, Calendar, Tag, Edit3} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {RichEditor} from 'react-native-pell-rich-editor';
import {RootState} from '../../store';
import {TagModal} from './components/TagModal';
import {DeleteModal} from './components/DeleteModal';
// import {useEditor, useKeyboard, useEditorCommands} from '../../hooks/editor';
import type {NoteDetailScreenProps} from '../../types/navigation';
import Toolbar from '../../components/editor/Toolbar';
import {useEditor} from '../../hooks/editor/useEditor';
import {useKeyboard} from '../../hooks/editor/useKeyboard';
import {useEditorCommands} from '../../hooks/editor/useEditorCommands';

const TOOLBAR_HEIGHT = 56;

const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({
  navigation,
  route,
}) => {
  // Theme and Redux
  const {theme, isDark} = useTheme();
  const dispatch = useDispatch();
  const noteId = route.params?.noteId;

  // Editor Hooks
  const {editorRef, isReady, content, handleEditorInit, handleContentChange} =
    useEditor();

  const toolbarPosition = useKeyboard(TOOLBAR_HEIGHT);
  const editorCommands = useEditorCommands(editorRef);

  // State
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(!noteId);

  // Animations
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
      setTags(note.tags || []);
      if (editorRef.current) {
        editorRef.current.setContentHTML(note.content);
      }
    }
  }, [noteId, note]);

  // Handlers
  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Required Field', 'Please enter a title for your note');
      return;
    }

    try {
      const noteContent = (await editorRef.current?.getContentHtml()) || '';

      const noteData = {
        id: noteId || Date.now().toString(),
        title: title.trim(),
        content: noteContent.trim(),
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
    } catch (error) {
      Alert.alert('Error', 'Failed to save note. Please try again.');
    }
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

  // Animated Styles
  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: fabScale.value}, {rotateZ: `${fabRotate.value}deg`}],
  }));

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
              <RichEditor
                ref={editorRef}
                onChange={handleContentChange}
                initialContentHTML={content}
                editorInitializedCallback={handleEditorInit}
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
            <>
              <Toolbar
                editor={editorRef}
                theme={theme}
                isDark={isDark}
                toolbarPosition={toolbarPosition}
                onAction={editorCommands}
              />

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
            </>
          )}
        </KeyboardAvoidingView>

        <TagModal
          visible={showTagModal}
          onClose={() => setShowTagModal(false)}
          onSave={setTags}
          initialTags={tags}
        />

        <DeleteModal
          visible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteNote}
          noteTitle={title}
        />
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
  keyboardAvoidingView: {
    flex: 1,
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
  editorContainer: {
    flex: 1,
    minHeight: 400,
    borderRadius: 12,
    overflow: 'hidden',
  },
  editor: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: TOOLBAR_HEIGHT + 16,
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
});

export default NoteDetailScreen;
