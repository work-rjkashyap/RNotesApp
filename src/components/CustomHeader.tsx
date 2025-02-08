import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  Menu,
  Bell,
  Search,
  ChevronLeft,
  MoreVertical,
} from 'lucide-react-native';
import {useTheme} from '../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  showNotificationButton?: boolean;
  showSearchButton?: boolean;
  showMoreButton?: boolean;
  onSearch?: () => void;
  onNotification?: () => void;
  onMore?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  showMenuButton = true,
  showNotificationButton = true,
  showSearchButton = true,
  showMoreButton = false,
  onSearch,
  onNotification,
  onMore,
  containerStyle,
  titleStyle,
}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.background,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
      color: theme.text,
      marginLeft: 12,
    },
    iconButton: {
      marginLeft: 12,
    },
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftContainer}>
        {showMenuButton && !showBackButton && (
          <TouchableOpacity onPress={handleMenuPress}>
            <Menu size={24} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
        )}

        {showBackButton && (
          <TouchableOpacity onPress={handleBackPress}>
            <ChevronLeft size={24} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
        )}

        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      <View style={styles.rightContainer}>
        {showSearchButton && (
          <TouchableOpacity style={styles.iconButton} onPress={onSearch}>
            <Search size={22} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
        )}

        {showNotificationButton && (
          <TouchableOpacity style={styles.iconButton} onPress={onNotification}>
            <Bell size={22} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
        )}

        {showMoreButton && (
          <TouchableOpacity style={styles.iconButton} onPress={onMore}>
            <MoreVertical size={22} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
