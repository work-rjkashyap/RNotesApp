// src/components/editor/BlockRenderer.tsx
import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ContentBlock} from '../../types';
import CodeBlock from './CodeBlock';
import TableEditor from './TableEditor';

interface BlockRendererProps {
  block: ContentBlock;
  isSelected: boolean;
  onChange: (changes: Partial<ContentBlock>) => void;
  onFocus: () => void;
  onDragStart: () => void;
  onPaste: () => void;
  readOnly?: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected,
  onChange,
  onFocus,
  onDragStart,
  onPaste,
  readOnly = false,
}) => {
  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <TextInput
            style={[
              styles.textInput,
              {
                fontWeight: block.styles.bold ? 'bold' : 'normal',
                fontStyle: block.styles.italic ? 'italic' : 'normal',
                textDecorationLine: block.styles.underline
                  ? 'underline'
                  : 'none',
                textAlign: block.styles.alignment || 'left',
                color: block.styles.color || '#000',
                fontSize: block.styles.fontSize || 16,
              },
            ]}
            multiline
            value={block.content}
            onChangeText={text => onChange({content: text})}
            onFocus={onFocus}
            placeholder="Start typing..."
            editable={!readOnly}
          />
        );

      case 'heading':
        return (
          <TextInput
            style={[
              styles.textInput,
              styles[`h${block.level || 1}`],
              {
                fontWeight: 'bold',
                textAlign: block.styles.alignment || 'left',
                color: block.styles.color || '#000',
              },
            ]}
            multiline
            value={block.content}
            onChangeText={text => onChange({content: text})}
            onFocus={onFocus}
            placeholder="Heading"
            editable={!readOnly}
          />
        );

      case 'image':
        return (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: block.content}}
              style={styles.image}
              resizeMode="contain"
            />
            {!readOnly && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onChange({type: 'text', content: ''})}>
                <Icon name="close" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        );

      case 'code':
        return (
          <CodeBlock
            content={block.content}
            language={block.language || 'javascript'}
            onChange={(content, language) => onChange({content, language})}
            readOnly={readOnly}
          />
        );

      case 'table':
        return (
          <TableEditor
            data={
              block.tableData || [
                ['', ''],
                ['', ''],
              ]
            }
            onChange={tableData => onChange({tableData})}
            readOnly={readOnly}
          />
        );

      case 'checklist':
        return (
          <View style={styles.checklistContainer}>
            <TouchableOpacity
              onPress={() => !readOnly && onChange({checked: !block.checked})}
              style={styles.checkbox}
              disabled={readOnly}>
              <Icon
                name={block.checked ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="#2196F3"
              />
            </TouchableOpacity>
            <TextInput
              style={[
                styles.textInput,
                styles.checklistText,
                block.checked && styles.checkedText,
              ]}
              value={block.content}
              onChangeText={text => onChange({content: text})}
              onFocus={onFocus}
              placeholder="List item..."
              editable={!readOnly}
            />
          </View>
        );

      case 'link':
        return (
          <View style={styles.linkContainer}>
            <Icon
              name="link"
              size={20}
              color="#2196F3"
              style={styles.linkIcon}
            />
            <TextInput
              style={[styles.textInput, styles.linkText]}
              value={block.content}
              onChangeText={text => onChange({content: text})}
              onFocus={onFocus}
              placeholder="Link text"
              editable={!readOnly}
            />
            <TextInput
              style={[styles.textInput, styles.linkUrl]}
              value={block.url}
              onChangeText={url => onChange({url})}
              placeholder="URL"
              autoCapitalize="none"
              keyboardType="url"
              editable={!readOnly}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.blockContainer, isSelected && styles.selectedBlock]}>
      {!readOnly && (
        <TouchableOpacity style={styles.dragHandle} onLongPress={onDragStart}>
          <Icon name="drag-handle" size={24} color="#999" />
        </TouchableOpacity>
      )}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  selectedBlock: {
    backgroundColor: '#f5f5f5',
  },
  dragHandle: {
    padding: 8,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 40,
    padding: 8,
  },
  h1: {fontSize: 28},
  h2: {fontSize: 24},
  h3: {fontSize: 20},
  h4: {fontSize: 18},
  h5: {fontSize: 16},
  h6: {fontSize: 14},
  imageContainer: {
    flex: 1,
    marginVertical: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  checklistContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
  },
  checklistText: {
    flex: 1,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: {
    marginRight: 8,
  },
  linkText: {
    flex: 2,
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  linkUrl: {
    flex: 3,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default BlockRenderer;
