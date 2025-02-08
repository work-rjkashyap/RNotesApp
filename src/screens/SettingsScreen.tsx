import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Moon,
  Sun,
  Bell,
  CloudUpload,
  UserCircle,
  ChevronRight,
  Lock,
  HelpCircle,
  Trash2,
  LogOut,
} from 'lucide-react-native';
import {useTheme} from '../context/ThemeContext';
import {SettingsScreenProps} from '../types/navigation';

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const {isDark, theme, toggleTheme} = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [backupEnabled, setBackupEnabled] = useState(false);

  const SettingSection = ({title}: {title: string}) => (
    <Text style={[styles.sectionTitle, {color: theme.secondary}]}>{title}</Text>
  );

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    hasSwitch,
    switchValue,
    onSwitchChange,
    onPress,
    destructive,
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
    destructive?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, {backgroundColor: theme.surface}]}
      onPress={onPress}
      disabled={!onPress}>
      <View style={styles.settingItemLeft}>
        <View
          style={[
            styles.iconContainer,
            destructive && {backgroundColor: `${theme.error}20`},
          ]}>
          <Icon
            size={20}
            color={destructive ? theme.error : theme.primary}
            strokeWidth={1.5}
          />
        </View>
        <View style={styles.settingTexts}>
          <Text
            style={[
              styles.settingTitle,
              {color: destructive ? theme.error : theme.text},
            ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, {color: theme.secondary}]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{
            false: `${theme.secondary}50`,
            true: `${theme.primary}90`,
          }}
          thumbColor={theme.surface}
        />
      ) : (
        onPress && (
          <ChevronRight size={20} color={theme.secondary} strokeWidth={1.5} />
        )
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background}]}
      showsVerticalScrollIndicator={false}>
      <SettingSection title="Preferences" />
      <View style={styles.section}>
        <SettingItem
          icon={isDark ? Moon : Sun}
          title="Dark Mode"
          subtitle="Change app appearance"
          hasSwitch
          switchValue={isDark}
          onSwitchChange={toggleTheme}
        />
        <SettingItem
          icon={Bell}
          title="Notifications"
          subtitle="Stay updated with alerts"
          hasSwitch
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />
        <SettingItem
          icon={CloudUpload}
          title="Cloud Backup"
          subtitle="Sync notes across devices"
          hasSwitch
          switchValue={backupEnabled}
          onSwitchChange={setBackupEnabled}
        />
      </View>

      <SettingSection title="Account" />
      <View style={styles.section}>
        <SettingItem
          icon={UserCircle}
          title="Edit Profile"
          subtitle="Manage your information"
          onPress={() => navigation.navigate('Profile')}
        />
        <SettingItem
          icon={Lock}
          title="Privacy"
          subtitle="Control your data"
          onPress={() => {}}
        />
      </View>

      <SettingSection title="Support" />
      <View style={styles.section}>
        <SettingItem
          icon={HelpCircle}
          title="Help & FAQ"
          subtitle="Get assistance"
          onPress={() => {}}
        />
      </View>

      <SettingSection title="Danger Zone" />
      <View style={styles.section}>
        <SettingItem
          icon={Trash2}
          title="Clear All Notes"
          subtitle="This action cannot be undone"
          destructive
          onPress={() => {}}
        />
        <SettingItem
          icon={LogOut}
          title="Sign Out"
          destructive
          onPress={() => {}}
        />
      </View>

      <Text style={[styles.version, {color: theme.secondary}]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  section: {
    paddingHorizontal: 16,
    gap: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    marginRight: 12,
  },
  settingTexts: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  settingSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginTop: 32,
    marginBottom: 24,
  },
});

export default SettingsScreen;
