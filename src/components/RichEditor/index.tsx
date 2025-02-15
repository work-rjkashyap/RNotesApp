import React, {forwardRef} from 'react';
import {View} from 'react-native';
import {RichEditor as BaseEditor} from 'react-native-pell-rich-editor';
import {useTheme} from '../../context/ThemeContext';
import {getEditorStyle} from './styles';
import type {RichEditorProps} from '../../types/editor';

const RichEditor = forwardRef<any, RichEditorProps>((props, ref) => {
  const {theme, isDark} = useTheme();
  const editorStyle = getEditorStyle(theme, isDark);

  return (
    <View style={props.containerStyle}>
      <BaseEditor
        {...props}
        ref={ref}
        style={[editorStyle.editor, props.style]}
        initialContentStyle={editorStyle.content}
        placeholder={props.placeholder || 'Start writing...'}
        placeholderTextColor={theme.secondary + '80'}
        onChange={props.onChange}
        editorInitializedCallback={props.onInit}
        useContainer={true}
      />
    </View>
  );
});

export default RichEditor;
