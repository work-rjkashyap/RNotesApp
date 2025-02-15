import React, {useRef, useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

interface EditorProps {
  content: string;
  onChangeText: (text: string) => void;
  theme: any;
  onSelectionChange?: (selection: {start: number; end: number}) => void;
  placeholder?: string;
  inputRef?: React.RefObject<TextInput>;
}

interface FormattedText {
  text: string;
  isBold: boolean;
  isItalic: boolean;
  isHeading: boolean;
  isCode: boolean;
}

const RealTimeMarkdownEditor: React.FC<EditorProps> = ({
  content,
  onChangeText,
  theme,
  onSelectionChange,
  placeholder,
  inputRef: externalRef,
}) => {
  const [formattedContent, setFormattedContent] = useState<FormattedText[]>([]);
  const localRef = useRef<TextInput>(null);
  const ref = externalRef || localRef;

  useEffect(() => {
    parseContent(content);
  }, [content]);

  const parseContent = (text: string) => {
    const formatted: FormattedText[] = [];
    let currentIndex = 0;

    // Parse markdown syntax
    while (currentIndex < text.length) {
      if (text.startsWith('**', currentIndex)) {
        const endBold = text.indexOf('**', currentIndex + 2);
        if (endBold !== -1) {
          formatted.push({
            text: text.slice(currentIndex + 2, endBold),
            isBold: true,
            isItalic: false,
            isHeading: false,
            isCode: false,
          });
          currentIndex = endBold + 2;
          continue;
        }
      }

      if (text.startsWith('*', currentIndex)) {
        const endItalic = text.indexOf('*', currentIndex + 1);
        if (endItalic !== -1) {
          formatted.push({
            text: text.slice(currentIndex + 1, endItalic),
            isBold: false,
            isItalic: true,
            isHeading: false,
            isCode: false,
          });
          currentIndex = endItalic + 1;
          continue;
        }
      }

      if (text.startsWith('# ', currentIndex)) {
        const endLine = text.indexOf('\n', currentIndex);
        const end = endLine === -1 ? text.length : endLine;
        formatted.push({
          text: text.slice(currentIndex + 2, end),
          isBold: false,
          isItalic: false,
          isHeading: true,
          isCode: false,
        });
        currentIndex = end + 1;
        continue;
      }

      if (text.startsWith('`', currentIndex)) {
        const endCode = text.indexOf('`', currentIndex + 1);
        if (endCode !== -1) {
          formatted.push({
            text: text.slice(currentIndex + 1, endCode),
            isBold: false,
            isItalic: false,
            isHeading: false,
            isCode: true,
          });
          currentIndex = endCode + 1;
          continue;
        }
      }

      // Plain text
      let nextSpecial = text.length;
      ['**', '*', '# ', '`'].forEach(marker => {
        const index = text.indexOf(marker, currentIndex);
        if (index !== -1 && index < nextSpecial) {
          nextSpecial = index;
        }
      });

      formatted.push({
        text: text.slice(currentIndex, nextSpecial),
        isBold: false,
        isItalic: false,
        isHeading: false,
        isCode: false,
      });
      currentIndex = nextSpecial;
    }

    setFormattedContent(formatted);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={[styles.hiddenInput, {color: theme.text}]}
        multiline
        value={content}
        onChangeText={onChangeText}
        onSelectionChange={event => {
          onSelectionChange?.(event.nativeEvent.selection);
        }}
        textAlignVertical="top"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={theme.secondary + '80'}
      />
      <View style={styles.formattedContainer}>
        {formattedContent.map((item, index) => (
          <Text
            key={index}
            style={[
              styles.text,
              {
                color: theme.text,
                fontFamily: 'Poppins-Regular',
                fontSize: item.isHeading ? 24 : 16,
                fontWeight: item.isBold ? 'bold' : 'normal',
                fontStyle: item.isItalic ? 'italic' : 'normal',
                backgroundColor: item.isCode
                  ? theme.secondary + '15'
                  : 'transparent',
                borderRadius: item.isCode ? 4 : 0,
                padding: item.isCode ? 2 : 0,
              },
            ]}>
            {item.text}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  hiddenInput: {
    flex: 1,
    lineHeight: 24,
    padding: 0,
    textAlignVertical: 'top',
    color: 'transparent',
  },
  formattedContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
  },
  text: {
    lineHeight: 24,
  },
});

export default RealTimeMarkdownEditor;
