import React from 'react';
import {View} from 'react-native';
import {RichToolbar} from 'react-native-pell-rich-editor';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useCustomActions} from '../../hooks/editor/useEditor';
import {ToolbarProps} from '../../types/editor';
import {styles} from './styles';

const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  theme,
  isDark,
  toolbarPosition,
  onAction,
}) => {
  const {actions, iconMap} = useCustomActions(editor, theme);

  const toolbarStyle = useAnimatedStyle(() => ({
    transform: [{translateY: toolbarPosition.value}],
  }));

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
        actions={actions}
        iconMap={iconMap}
        onPressAddImage={() => onAction?.('image')}
        style={styles.toolbar}
      />
    </Animated.View>
  );
};

export default Toolbar;
