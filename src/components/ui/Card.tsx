import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

const Card: React.FC<CardProps> = ({children, style}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
});

export default Card;
