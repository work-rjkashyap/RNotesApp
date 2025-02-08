import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import {Bell, CheckCircle, XCircle, Info, Trash2} from 'lucide-react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {useTheme} from '../context/ThemeContext';

// Notification Interface
interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  timestamp: string;
}

// Initial Notifications Data
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    message: 'Your order has been shipped!',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'error',
    message: 'Payment failed. Please try again.',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    type: 'info',
    message: 'New updates are available.',
    timestamp: '3 days ago',
  },
];

const NotificationPage: React.FC = () => {
  const {theme} = useTheme();
  const [notificationsList, setNotificationsList] =
    useState<Notification[]>(initialNotifications);

  // Render Icon Based on Notification Type
  const renderIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} color={theme.accent} />;
      case 'error':
        return <XCircle size={24} color={theme.error} />;
      case 'info':
        return <Info size={24} color={theme.primary} />;
      default:
        return <Bell size={24} color={theme.secondary} />;
    }
  };

  // Handle Notification Dismissal
  const handleDismiss = (id: string) => {
    setNotificationsList(currentNotifications =>
      currentNotifications.filter(notification => notification.id !== id),
    );
  };

  // Render Right Actions (Swipe to Delete)
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
    item: Notification,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={[styles(theme).deleteButton, {backgroundColor: theme.error}]}
        onPress={() => handleDismiss(item.id)}>
        <Animated.View style={{transform: [{scale: scale}]}}>
          <Trash2 size={24} color={theme.background} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Render Individual Notification Item
  const renderNotificationItem = ({item}: {item: Notification}) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }>
      <View style={styles(theme).notificationItem}>
        {renderIcon(item.type)}
        <View style={styles(theme).notificationContent}>
          <Text style={styles(theme).notificationMessage}>{item.message}</Text>
          <Text style={styles(theme).notificationTimestamp}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    </Swipeable>
  );

  // Styles with Theme Integration
  const styles = (theme: any) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.background,
      },
      headerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        backgroundColor: theme.card,
      },
      title: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.text,
      },
      notificationList: {
        paddingTop: 16,
      },
      notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.card,
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        shadowColor: theme.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      notificationContent: {
        flex: 1,
        marginLeft: 12,
      },
      notificationMessage: {
        fontSize: 16,
        color: theme.text,
        marginBottom: 4,
      },
      notificationTimestamp: {
        fontSize: 12,
        color: theme.secondary,
      },
      deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 12,
      },
      emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      emptyStateText: {
        fontSize: 18,
        color: theme.secondary,
        textAlign: 'center',
        marginTop: 12,
      },
    });

  return (
    <GestureHandlerRootView style={styles(theme).container}>
      <SafeAreaView style={styles(theme).container}>
        {/* Notification List or Empty State */}
        {notificationsList.length > 0 ? (
          <FlatList
            data={notificationsList}
            keyExtractor={item => item.id}
            renderItem={renderNotificationItem}
            contentContainerStyle={styles(theme).notificationList}
          />
        ) : (
          <View style={styles(theme).emptyState}>
            <Bell size={64} color={theme.secondary} />
            <Text style={styles(theme).emptyStateText}>
              No notifications at the moment
            </Text>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default NotificationPage;
