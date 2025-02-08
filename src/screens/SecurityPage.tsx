import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Lock, ShieldCheck, KeyRound, Eye, EyeOff} from 'lucide-react-native';
import {useTheme} from '../context/ThemeContext';

const SecurityPage = () => {
  const {theme, isDark} = useTheme();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const securityOptions = [
    {
      icon: <Lock size={24} color={theme.text} />,
      title: 'Change Password',
      description: 'Update your account password regularly',
      onPress: () => {
        /* Navigate to change password screen */
      },
    },
    {
      icon: <ShieldCheck size={24} color={theme.text} />,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      toggle: {
        value: twoFactorEnabled,
        onValueChange: setTwoFactorEnabled,
      },
    },
    {
      icon: <KeyRound size={24} color={theme.text} />,
      title: 'Biometric Login',
      description: 'Use fingerprint or face recognition',
      toggle: {
        value: biometricEnabled,
        onValueChange: setBiometricEnabled,
      },
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: theme.secondary,
    },
    securitySection: {
      backgroundColor: theme.card,
      borderRadius: 10,
      marginHorizontal: 20,
      marginTop: 20,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    securityItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    securityItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    securityItemText: {
      flex: 1,
      marginLeft: 15,
    },
    securityItemTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    securityItemDescription: {
      fontSize: 12,
      color: theme.secondary,
      marginTop: 3,
    },
    actionText: {
      color: theme.accent,
      fontWeight: '600',
    },
    passwordSection: {
      backgroundColor: theme.card,
      borderRadius: 10,
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      shadowColor: theme.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    passwordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
    },
    showPasswordToggle: {
      padding: 5,
    },
    passwordItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    passwordLabel: {
      fontSize: 14,
      color: theme.secondary,
    },
    passwordValue: {
      fontSize: 14,
      color: theme.text,
      fontWeight: '500',
    },
    logoutButton: {
      backgroundColor: theme.error,
      marginHorizontal: 20,
      marginTop: 30,
      marginBottom: 20,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Security</Text>
          <Text style={styles.headerSubtitle}>
            Manage your account security and privacy settings
          </Text>
        </View>

        <View style={styles.securitySection}>
          {securityOptions.map((option, index) => (
            <View key={index} style={styles.securityItem}>
              <View style={styles.securityItemContent}>
                {option.icon}
                <View style={styles.securityItemText}>
                  <Text style={styles.securityItemTitle}>{option.title}</Text>
                  <Text style={styles.securityItemDescription}>
                    {option.description}
                  </Text>
                </View>
                {option.toggle ? (
                  <Switch
                    trackColor={{
                      false: isDark ? '#4A4A4A' : '#E0E0E0',
                      true: theme.accent + '50',
                    }}
                    thumbColor={option.toggle.value ? theme.accent : '#f4f3f4'}
                    ios_backgroundColor={isDark ? '#333333' : '#E0E0E0'}
                    onValueChange={option.toggle.onValueChange}
                    value={option.toggle.value}
                  />
                ) : (
                  <TouchableOpacity onPress={option.onPress}>
                    <Text style={styles.actionText}>Change</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.passwordSection}>
          <View style={styles.passwordHeader}>
            <Text style={styles.sectionTitle}>Password Management</Text>
            <TouchableOpacity
              style={styles.showPasswordToggle}
              onPress={() => setShowPasswords(!showPasswords)}>
              {showPasswords ? (
                <EyeOff size={20} color={theme.text} />
              ) : (
                <Eye size={20} color={theme.text} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.passwordItem}>
            <Text style={styles.passwordLabel}>Current Password</Text>
            <Text style={styles.passwordValue}>
              {showPasswords
                ? '**********************'
                : '••••••••••••••••••••'}
            </Text>
          </View>

          <View style={styles.passwordItem}>
            <Text style={styles.passwordLabel}>Last Changed</Text>
            <Text style={styles.passwordValue}>January 15, 2024</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecurityPage;
