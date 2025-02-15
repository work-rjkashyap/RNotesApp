import React, {useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface EditorProps {
  content: string;
  onChangeText: (text: string) => void;
  theme: any;
  onSelectionChange?: (selection: {start: number; end: number}) => void;
  placeholder?: string;
  inputRef?: React.RefObject<TextInput>;
}

const MDXEditor: React.FC<EditorProps> = ({
  content,
  onChangeText,
  theme,
  onSelectionChange,
  placeholder,
  inputRef: externalRef,
}) => {
  const localRef = useRef<TextInput>(null);
  const ref = externalRef || localRef;

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          {
            color: theme.text,
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          },
        ]}
        multiline
        value={content}
        onChangeText={onChangeText}
        onSelectionChange={event =>
          onSelectionChange?.(event.nativeEvent.selection)
        }
        textAlignVertical="top"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={theme.secondary + '80'}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    lineHeight: 24,
    padding: 0,
    textAlignVertical: 'top',
  },
});

export default MDXEditor;
