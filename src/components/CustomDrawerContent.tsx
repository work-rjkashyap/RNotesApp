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
  Home,
  Timer,
  Grid,
  Palette,
  Cloud,
  Crown,
  Star,
  MessageCircle,
  Github,
  Twitter,
} from 'lucide-react-native';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const {theme, isDark, toggleTheme} = useTheme();
  const [activeRoute, setActiveRoute] = React.useState('Home');

  const getCurrentDate = () => {
    const date = new Date();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return {
      day: days[date.getDay()],
      date: `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`,
    };
  };

  const NavItem = ({
    icon: Icon,
    label,
    route,
    isHome = false,
  }: {
    icon: any;
    label: string;
    route: string;
    isHome?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.navItem,
        {
          backgroundColor: isHome
            ? '#FFF5E9'
            : activeRoute === route
            ? theme.primary + '15'
            : 'transparent',
        },
      ]}
      onPress={() => {
        setActiveRoute(route);
        props.navigation.navigate(route);
      }}>
      <View style={styles.iconContainer}>
        <Icon
          size={22}
          color={
            isHome
              ? '#E4A853'
              : activeRoute === route
              ? theme.primary
              : theme.text
          }
          strokeWidth={1.5}
        />
      </View>
      <Text
        style={[
          styles.navText,
          {
            color: isHome
              ? '#E4A853'
              : activeRoute === route
              ? theme.primary
              : theme.text,
            fontWeight: activeRoute === route ? '600' : '500',
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const currentDate = getCurrentDate();

  return (
    <DrawerContentScrollView
      {...props}
      style={[styles.container, {backgroundColor: theme.surface}]}>
      {/* App Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>RNotes</Text>
        <Text style={styles.date}>{currentDate.day}</Text>
        <Text style={styles.subDate}>{currentDate.date}</Text>
      </View>

      {/* Navigation Section */}
      <View style={styles.navigationContainer}>
        <NavItem icon={Home} label="Home" route="Home" />
        <NavItem icon={Timer} label="Timer" route="Timer" />
        <NavItem icon={Grid} label="Categories" route="Categories" />
        <NavItem icon={Palette} label="Customize" route="Customize" />
        <NavItem icon={Settings} label="Settings" route="Settings" />
        <NavItem icon={Cloud} label="Backups" route="Backups" />
        <NavItem icon={Crown} label="Premium" route="Premium" />
        <NavItem icon={Star} label="Rate this app" route="RateApp" />
        <NavItem icon={MessageCircle} label="Contact us" route="Contact" />
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        {/* Theme Toggle */}

        {/* Social Links */}
        <View style={styles.socialLinks}>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: theme.surface}]}>
            <Github size={25} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: theme.surface}]}>
            <Twitter size={25} color={theme.text} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              {backgroundColor: theme.primary + '10'},
            ]}
            onPress={toggleTheme}>
            {isDark ? (
              <Moon size={25} color={theme.primary} strokeWidth={1.5} />
            ) : (
              <Sun size={25} color={theme.primary} strokeWidth={1.5} />
            )}
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
  header: {
    padding: 20,
    paddingBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: '500',
    color: '#E4A853',
    marginBottom: 4,
  },
  date: {
    fontSize: 20,
    color: '#3C3C43',
    marginBottom: 2,
  },
  subDate: {
    fontSize: 16,
    color: '#8E8E93',
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
    padding: 10,
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
