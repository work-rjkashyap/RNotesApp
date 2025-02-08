import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../context/ThemeContext';
import {ProfileScreenProps} from '../types/navigation';
import {UserProfile} from '../types';
import {
  User,
  Mail,
  FileText,
  Camera,
  Save,
  AlertCircle,
  Shield,
  MapPin,
} from 'lucide-react-native';

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    bio: '',
  });
  const {theme} = useTheme();
  const buttonScale = new Animated.Value(1);

  // Animation for save button
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('userProfile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      Alert.alert('Error', 'Could not load profile');
    }
  };

  const saveProfile = async () => {
    animateButton();
    try {
      if (!profile.name.trim()) {
        Alert.alert('Required Field', 'Please enter your name');
        return;
      }

      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not save profile');
    }
  };

  const CustomInput = ({
    icon: Icon,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
  }) => (
    <View style={[styles.inputWrapper, {backgroundColor: theme.surface}]}>
      <View style={styles.iconContainer}>
        <Icon size={20} color={theme.primary} strokeWidth={1.5} />
      </View>
      <TextInput
        style={[styles.input, {color: theme.text}]}
        placeholder={placeholder}
        placeholderTextColor={theme.secondary}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        style={[styles.container, {backgroundColor: theme.background}]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.headerSection}>
            <Text style={[styles.headerTitle, {color: theme.text}]}>
              Profile
            </Text>
            <Text style={[styles.headerSubtitle, {color: theme.secondary}]}>
              Manage your personal information
            </Text>
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View
              style={[
                styles.avatarContainer,
                {
                  backgroundColor: theme.surface,
                  // shadowColor: theme.primary,
                },
              ]}>
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${profile.name}&background=random&size=200`,
                }}
                style={styles.avatar}
              />
              <TouchableOpacity
                style={[styles.cameraButton, {backgroundColor: theme.primary}]}>
                <Camera size={20} color={theme.surface} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <CustomInput
              icon={User}
              placeholder="Full Name"
              value={profile.name}
              onChangeText={text => setProfile({...profile, name: text})}
            />

            <CustomInput
              icon={Mail}
              placeholder="Email Address"
              value={profile.email}
              onChangeText={text => setProfile({...profile, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              icon={MapPin}
              placeholder="Location"
              value={profile.location}
              onChangeText={text => setProfile({...profile, location: text})}
            />

            {/* Bio Section */}
            <View
              style={[styles.bioContainer, {backgroundColor: theme.surface}]}>
              <View style={styles.bioHeader}>
                <FileText size={20} color={theme.primary} strokeWidth={1.5} />
                <Text style={[styles.bioLabel, {color: theme.text}]}>Bio</Text>
              </View>
              <TextInput
                style={[styles.bioInput, {color: theme.text}]}
                placeholder="Tell us about yourself..."
                placeholderTextColor={theme.secondary}
                multiline
                textAlignVertical="top"
                value={profile.bio}
                onChangeText={text => setProfile({...profile, bio: text})}
              />
            </View>
          </View>

          {/* Privacy Section */}
          <View
            style={[styles.privacySection, {backgroundColor: theme.surface}]}>
            <Shield size={20} color={theme.primary} strokeWidth={1.5} />
            <View style={styles.privacyText}>
              <Text style={[styles.privacyTitle, {color: theme.text}]}>
                Privacy Protection
              </Text>
              <Text
                style={[styles.privacyDescription, {color: theme.secondary}]}>
                Your data is securely stored and never shared
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <Animated.View style={{transform: [{scale: buttonScale}]}}>
            <TouchableOpacity
              style={[styles.saveButton, {backgroundColor: theme.primary}]}
              onPress={saveProfile}
              activeOpacity={0.9}>
              <Save size={20} color={theme.surface} strokeWidth={1.5} />
              <Text style={[styles.saveButtonText, {color: theme.surface}]}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    opacity: 0.7,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSection: {
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  iconContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 12,
    paddingRight: 16,
  },
  bioContainer: {
    borderRadius: 12,
    padding: 16,
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  bioLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  bioInput: {
    minHeight: 100,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  privacySection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 24,
    gap: 12,
  },
  privacyText: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  privacyDescription: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    opacity: 0.7,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ProfileScreen;
