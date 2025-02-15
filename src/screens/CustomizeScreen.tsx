import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
  Modal,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import {
  Palette,
  Type,
  Moon,
  Check,
  ArrowLeft,
  ChevronRight,
  X,
} from 'lucide-react-native';
import {useTheme} from '../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const CustomizeScreen = () => {
  const navigation = useNavigation();
  const {
    theme,
    isDark,
    toggleTheme,
    accentColor,
    setAccentColor,
    fontFamily,
    setFontFamily,
    availableAccentColors,
    availableFonts,
  } = useTheme();

  const [fontModalVisible, setFontModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(SCREEN_HEIGHT));

  const showFontModal = () => {
    setFontModalVisible(true);
    Animated.spring(modalAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const hideFontModal = () => {
    Animated.timing(modalAnimation, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setFontModalVisible(false));
  };

  const SectionTitle = ({title}: {title: string}) => (
    <Text style={[styles.sectionTitle, {color: theme.secondary}]}>{title}</Text>
  );

  const FontModal = () => (
    <Modal
      visible={fontModalVisible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={hideFontModal}>
      <Pressable style={styles.modalOverlay} onPress={hideFontModal}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.surface,
              transform: [{translateY: modalAnimation}],
            },
          ]}>
          <View style={[styles.modalHeader, {borderBottomColor: theme.border}]}>
            <Text style={[styles.modalTitle, {color: theme.text}]}>
              Select Font
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={hideFontModal}>
              <X size={24} color={theme.text} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.fontList}>
            {Object.entries(availableFonts).map(([key, font]) => (
              <TouchableOpacity
                key={key}
                style={[styles.fontItem, {borderBottomColor: theme.border}]}
                onPress={() => {
                  setFontFamily(key);
                  hideFontModal();
                }}>
                <View>
                  <Text
                    style={[
                      styles.fontName,
                      {color: theme.text, fontFamily: font.regular},
                    ]}>
                    {font.name}
                  </Text>
                  <Text
                    style={[
                      styles.fontPreview,
                      {color: theme.secondary, fontFamily: font.regular},
                    ]}>
                    The quick brown fox jumps over the lazy dog
                  </Text>
                </View>
                {fontFamily === key && (
                  <Check size={20} color={theme.primary} strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </Pressable>
    </Modal>
  );

  const ThemeCard = () => (
    <View style={[styles.themeCard, {backgroundColor: theme.surface}]}>
      <View style={styles.themeOption}>
        <View style={styles.themeInfo}>
          <Moon size={22} color={theme.text} strokeWidth={1.5} />
          <View style={styles.themeTextContainer}>
            <Text style={[styles.themeTitle, {color: theme.text}]}>
              Dark Mode
            </Text>
            <Text style={[styles.themeDescription, {color: theme.secondary}]}>
              Switch between light and dark theme
            </Text>
          </View>
        </View>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{false: '#767577', true: `${theme.primary}70`}}
          thumbColor={isDark ? theme.primary : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );

  const ColorSection = () => (
    <View style={[styles.colorGrid]}>
      {Object.entries(availableAccentColors).map(([name, color]) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorButton,
            {backgroundColor: theme.surface},
            accentColor === color && {borderColor: theme.primary},
          ]}
          onPress={() => setAccentColor(color)}>
          <View style={[styles.colorCircle, {backgroundColor: color}]}>
            {accentColor === color && (
              <Check size={16} color="white" strokeWidth={2} />
            )}
          </View>
          <Text style={[styles.colorName, {color: theme.text}]}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const FontSelector = () => (
    <TouchableOpacity
      style={[styles.fontSelector, {backgroundColor: theme.surface}]}
      onPress={showFontModal}>
      <View style={styles.fontSelectorContent}>
        <Type size={22} color={theme.text} strokeWidth={1.5} />
        <View style={styles.fontInfo}>
          <Text style={[styles.fontLabel, {color: theme.text}]}>Font</Text>
          <Text style={[styles.selectedFont, {color: theme.secondary}]}>
            {availableFonts[fontFamily].name}
          </Text>
        </View>
      </View>
      <ChevronRight size={20} color={theme.secondary} strokeWidth={1.5} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar
        backgroundColor={theme.surface}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <SectionTitle title="THEME" />
        <ThemeCard />

        <SectionTitle title="ACCENT COLOR" />
        <ColorSection />

        <SectionTitle title="TYPOGRAPHY" />
        <FontSelector />

        <View style={[styles.previewCard, {backgroundColor: theme.surface}]}>
          <Text style={[styles.previewTitle, {color: theme.text}]}>
            Preview
          </Text>
          <View style={styles.previewContent}>
            <Text
              style={[
                styles.previewText,
                {
                  color: theme.primary,
                  fontFamily: availableFonts[fontFamily].regular,
                },
              ]}>
              Sample Text
            </Text>
            <TouchableOpacity
              style={[styles.previewButton, {backgroundColor: theme.primary}]}>
              <Text
                style={[
                  styles.previewButtonText,
                  {fontFamily: availableFonts[fontFamily].medium},
                ]}>
                Button
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <FontModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  themeCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeTextContainer: {
    marginLeft: 12,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  colorButton: {
    width: '30%',
    padding: 4,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    margin: 5,
  },
  colorCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorName: {
    fontSize: 12,
    fontWeight: '500',
  },
  fontSelector: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontInfo: {
    marginLeft: 12,
  },
  fontLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedFont: {
    fontSize: 14,
  },
  previewCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  previewContent: {
    alignItems: 'center',
  },
  previewText: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 16,
  },
  previewButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  previewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  fontList: {
    padding: 16,
  },
  fontItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  fontName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  fontPreview: {
    fontSize: 14,
  },
});

export default CustomizeScreen;
