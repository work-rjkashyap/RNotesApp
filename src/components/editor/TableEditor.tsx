import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TableEditorProps {
  data: string[][];
  onChange: (data: string[][]) => void;
  readOnly?: boolean;
}

const TableEditor: React.FC<TableEditorProps> = ({
  data,
  onChange,
  readOnly = false,
}) => {
  const addRow = () => {
    const newRow = new Array(data[0].length).fill('');
    onChange([...data, newRow]);
  };

  const addColumn = () => {
    const newData = data.map(row => [...row, '']);
    onChange(newData);
  };

  const deleteRow = (rowIndex: number) => {
    if (data.length <= 1) return;
    const newData = data.filter((_, index) => index !== rowIndex);
    onChange(newData);
  };

  const deleteColumn = (colIndex: number) => {
    if (data[0].length <= 1) return;
    const newData = data.map(row =>
      row.filter((_, index) => index !== colIndex),
    );
    onChange(newData);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = data.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === colIndex ? value : cell))
        : row,
    );
    onChange(newData);
  };

  return (
    <ScrollView horizontal style={styles.container}>
      <View>
        <View style={styles.table}>
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <View key={`${rowIndex}-${colIndex}`} style={styles.cell}>
                  <TextInput
                    style={styles.cellInput}
                    value={cell}
                    onChangeText={text => updateCell(rowIndex, colIndex, text)}
                    editable={!readOnly}
                  />
                </View>
              ))}
              {!readOnly && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteRow(rowIndex)}>
                  <Icon name="remove" size={20} color="#f44336" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        {!readOnly && (
          <View style={styles.controls}>
            <TouchableOpacity onPress={addRow} style={styles.controlButton}>
              <Icon name="add-box" size={24} color="#2196F3" />
              <Text style={styles.controlText}>Add Row</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addColumn} style={styles.controlButton}>
              <Icon name="playlist-add" size={24} color="#2196F3" />
              <Text style={styles.controlText}>Add Column</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    padding: 8,
    minWidth: 100,
  },
  cellInput: {
    minWidth: 80,
    padding: 4,
  },
  controls: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
  },
  controlText: {
    marginLeft: 4,
    color: '#2196F3',
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
  },
});
