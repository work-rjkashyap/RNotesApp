import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useTheme} from '../context/ThemeContext';
import {
  Settings,
  User,
  Moon,
  Sun,
  Menu,
  Github,
  Twitter,
  Bell,
  Shield,
} from 'lucide-react-native';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const {theme, isDark, toggleTheme} = useTheme();
  const [activeRoute, setActiveRoute] = React.useState('Home');

  const NavItem = ({
    icon: Icon,
    label,
    route,
  }: {
    icon: any;
    label: string;
    route: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.navItem,
        {
          backgroundColor:
            activeRoute === route ? theme.primary + '15' : 'transparent',
        },
      ]}
      onPress={() => {
        setActiveRoute(route);
        props.navigation.navigate(route);
      }}>
      <View style={styles.iconContainer}>
        <Icon
          size={22}
          color={activeRoute === route ? theme.primary : theme.text}
          strokeWidth={1.5}
        />
      </View>
      <Text
        style={[
          styles.navText,
          {
            color: activeRoute === route ? theme.primary : theme.text,
            fontWeight: activeRoute === route ? '600' : '500',
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView
      {...props}
      style={[styles.container, {backgroundColor: theme.surface}]}>
      {/* User Profile Section */}
      <View
        style={[styles.profileCard, {backgroundColor: theme.primary + '20'}]}>
        <View style={styles.profileHeader}>
          <View
            style={[styles.avatarContainer, {backgroundColor: theme.surface}]}>
            <Image
              source={{uri: 'https://i.pravatar.cc/100'}}
              style={styles.avatar}
            />
            <View style={[styles.statusDot, {backgroundColor: '#4CAF50'}]} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, {color: theme.text}]}>John Doe</Text>
            <Text style={[styles.userEmail, {color: theme.secondary}]}>
              john.doe@example.com
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, {color: theme.primary}]}>28</Text>
            <Text style={[styles.statLabel, {color: theme.secondary}]}>
              Notes
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              {backgroundColor: theme.secondary + '30'},
            ]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, {color: theme.primary}]}>5</Text>
            <Text style={[styles.statLabel, {color: theme.secondary}]}>
              Folders
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Section */}
      <View
        style={[styles.navigationContainer, {backgroundColor: theme.surface}]}>
        <NavItem icon={Menu} label="My Notes" route="MainStack" />
        <NavItem icon={Bell} label="Notifications" route="Notifications" />
        <NavItem icon={Shield} label="Security" route="Security" />
        <NavItem icon={Settings} label="Settings" route="Settings" />
        <NavItem icon={User} label="Profile" route="Profile" />
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        {/* Theme Toggle */}
        <TouchableOpacity
          style={[styles.themeToggle, {backgroundColor: theme.primary + '10'}]}
          onPress={toggleTheme}>
          {isDark ? (
            <Moon size={20} color={theme.primary} strokeWidth={1.5} />
          ) : (
            <Sun size={20} color={theme.primary} strokeWidth={1.5} />
          )}
        </TouchableOpacity>

        {/* Social Links */}
        <View style={styles.socialLinks}>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: theme.surface}]}>
            <Github size={20} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: theme.surface}]}>
            <Twitter size={20} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <Text style={[styles.versionText, {color: theme.secondary}]}>
          Version 2.1.0
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    margin: 10,
    borderRadius: 12,
    padding: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    height: 20,
  },
  navigationContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  navText: {
    fontSize: 14,
  },
  footer: {
    padding: 16,
    marginTop: 'auto',
    alignItems: 'center',
  },
  themeToggle: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  socialButton: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  versionText: {
    fontSize: 12,
    opacity: 0.7,
  },
});

export default CustomDrawerContent;
