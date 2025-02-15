import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Text,
} from 'react-native';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Code,
  Link,
  CheckSquare,
  Image,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Table,
} from 'lucide-react-native';
import Animated, {useAnimatedStyle, SharedValue} from 'react-native-reanimated';

// Types
interface Tool {
  icon: any;
  action: string;
  tooltip: string;
}

interface ToolbarProps {
  onAction: (action: string) => void;
  theme: {
    surface: string;
    background: string;
    secondary: string;
    text: string;
    primary: string;
  };
  isDark: boolean;
  toolbarPosition: SharedValue<number>;
  inputRef?: React.RefObject<any>;
}

// Tools Configuration
const FORMATTING_TOOLS: Tool[] = [
  {icon: Bold, action: 'bold', tooltip: 'Bold'},
  {icon: Italic, action: 'italic', tooltip: 'Italic'},
  {icon: Heading1, action: 'h1', tooltip: 'Heading 1'},
  {icon: Heading2, action: 'h2', tooltip: 'Heading 2'},
];

const ALIGNMENT_TOOLS: Tool[] = [
  {icon: AlignLeft, action: 'align-left', tooltip: 'Align Left'},
  {icon: AlignCenter, action: 'align-center', tooltip: 'Align Center'},
  {icon: AlignRight, action: 'align-right', tooltip: 'Align Right'},
];

const LIST_TOOLS: Tool[] = [
  {icon: List, action: 'bullet', tooltip: 'Bullet List'},
  {icon: ListOrdered, action: 'number', tooltip: 'Numbered List'},
  {icon: CheckSquare, action: 'checkbox', tooltip: 'Checkbox'},
];

const INSERT_TOOLS: Tool[] = [
  {icon: Quote, action: 'quote', tooltip: 'Quote'},
  {icon: Code, action: 'code', tooltip: 'Code Block'},
  {icon: Link, action: 'link', tooltip: 'Link'},
  {icon: Image, action: 'image', tooltip: 'Image'},
  {icon: Table, action: 'table', tooltip: 'Table'},
  {icon: Minus, action: 'divider', tooltip: 'Divider'},
];

// Helper function to insert markdown
export const insertMarkdown = (
  content: string,
  selectionStart: number,
  selectionEnd: number,
  action: string,
): string => {
  const before = content.substring(0, selectionStart);
  const selection = content.substring(selectionStart, selectionEnd);
  const after = content.substring(selectionEnd);
  const hasSelection = selection.length > 0;

  // Helper to ensure proper spacing around block elements
  const ensureNewlines = (str: string) => {
    const needsNewlineBefore =
      !before.endsWith('\n\n') && !before.endsWith('\n') && before.length > 0;
    const needsNewlineAfter = !after.startsWith('\n') && after.length > 0;

    return `${needsNewlineBefore ? '\n' : ''}${str}${
      needsNewlineAfter ? '\n' : ''
    }`;
  };

  switch (action) {
    case 'bold':
      return `${before}**${hasSelection ? selection : 'bold text'}**${after}`;
    case 'italic':
      return `${before}_${hasSelection ? selection : 'italic text'}_${after}`;
    case 'h1':
      return `${before}${ensureNewlines(
        `# ${hasSelection ? selection : 'Heading 1'}`,
      )}${after}`;
    case 'h2':
      return `${before}${ensureNewlines(
        `## ${hasSelection ? selection : 'Heading 2'}`,
      )}${after}`;
    case 'bullet':
      return `${before}${ensureNewlines(
        `- ${hasSelection ? selection : 'List item'}`,
      )}${after}`;
    case 'number':
      return `${before}${ensureNewlines(
        `1. ${hasSelection ? selection : 'List item'}`,
      )}${after}`;
    case 'checkbox':
      return `${before}${ensureNewlines(
        `- [ ] ${hasSelection ? selection : 'Task'}`,
      )}${after}`;
    case 'quote':
      return `${before}${ensureNewlines(
        `> ${hasSelection ? selection : 'Quote'}`,
      )}${after}`;
    case 'code':
      return selection.includes('\n')
        ? `${before}${ensureNewlines(
            `\`\`\`\n${hasSelection ? selection : 'code'}\n\`\`\``,
          )}${after}`
        : `${before}\`${hasSelection ? selection : 'code'}\`${after}`;
    case 'link':
      return `${before}[${
        hasSelection ? selection : 'link text'
      }](url)${after}`;
    case 'image':
      return `${before}![${
        hasSelection ? selection : 'image alt'
      }](image-url)${after}`;
    case 'divider':
      return `${before}${ensureNewlines('---')}${after}`;
    case 'table':
      return `${before}${ensureNewlines(
        '| Header 1 | Header 2 | Header 3 |\n' +
          '|----------|----------|----------|\n' +
          '| Cell 1   | Cell 2   | Cell 3   |',
      )}${after}`;
    case 'align-left':
    case 'align-center':
    case 'align-right':
      const alignment = action.split('-')[1];
      return `${before}${ensureNewlines(
        `::: align-${alignment}\n${
          hasSelection ? selection : `${alignment} aligned text`
        }\n:::`,
      )}${after}`;
    default:
      return content;
  }
};

// Toolbar Component
const Toolbar: React.FC<ToolbarProps> = ({
  onAction,
  theme,
  isDark,
  toolbarPosition,
  inputRef,
}) => {
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: toolbarPosition.value}],
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDark ? theme.surface : 'white',
    borderTopWidth: 1,
    borderColor: theme.secondary + '20',
    zIndex: 1000,
  }));

  const handleToolbarPress = (action: string) => {
    // Ensure input maintains focus after toolbar action
    inputRef?.current?.focus();
    onAction(action);
  };

  const renderToolGroup = (tools: Tool[], groupIndex: number) => (
    <View key={groupIndex} style={styles.toolGroup}>
      {tools.map(tool => (
        <TouchableOpacity
          key={tool.action}
          style={[
            styles.toolbarButton,
            {backgroundColor: isDark ? theme.surface : theme.background},
          ]}
          onPress={() => handleToolbarPress(tool.action)}
          activeOpacity={0.7}>
          <tool.icon size={20} color={theme.secondary} strokeWidth={1.5} />
          {Platform.OS === 'ios' && (
            <Text style={[styles.tooltip, {color: theme.text}]}>
              {tool.tooltip}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Animated.View style={animatedStyles}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.toolbarContent}>
        {renderToolGroup(FORMATTING_TOOLS, 0)}
        <View style={styles.divider} />
        {renderToolGroup(ALIGNMENT_TOOLS, 1)}
        <View style={styles.divider} />
        {renderToolGroup(LIST_TOOLS, 2)}
        <View style={styles.divider} />
        {renderToolGroup(INSERT_TOOLS, 3)}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toolbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  toolGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  toolbarButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    position: 'absolute',
    bottom: -20,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    opacity: 0,
  },
});

export default Toolbar;
