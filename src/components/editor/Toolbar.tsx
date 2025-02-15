import React from 'react';
import {StyleSheet, View} from 'react-native';
import {actions, RichToolbar} from 'react-native-pell-rich-editor';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Undo,
  Redo,
} from 'lucide-react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

interface ToolbarProps {
  editor: any;
  theme: any;
  isDark: boolean;
  toolbarPosition: any;
}

const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  theme,
  isDark,
  toolbarPosition,
}) => {
  const toolbarStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: toolbarPosition.value}],
    };
  });

  return (
    <Animated.View
      style={[
        styles.toolbarContainer,
        toolbarStyle,
        {backgroundColor: isDark ? theme.surface : '#FFFFFF'},
      ]}>
      <RichToolbar
        editor={editor}
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
          [actions.setBold]: () => <Bold color={theme.secondary} size={20} />,
          [actions.setItalic]: () => (
            <Italic color={theme.secondary} size={20} />
          ),
          [actions.setUnderline]: () => (
            <Underline color={theme.secondary} size={20} />
          ),
          [actions.heading1]: () => (
            <Heading1 color={theme.secondary} size={20} />
          ),
          [actions.heading2]: () => (
            <Heading2 color={theme.secondary} size={20} />
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
          [actions.undo]: () => <Undo color={theme.secondary} size={20} />,
          [actions.redo]: () => <Redo color={theme.secondary} size={20} />,
        }}
        style={styles.toolbar}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  toolbar: {
    height: 48,
  },
});

export default Toolbar;
