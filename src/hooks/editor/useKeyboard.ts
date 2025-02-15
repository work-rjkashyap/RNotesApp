import {useEffect} from 'react';
import {Platform, Keyboard, KeyboardEvent} from 'react-native';
import {useSharedValue, withTiming, withSpring} from 'react-native-reanimated';

/**
 * Hook for handling keyboard interactions with the editor
 */
export const useKeyboard = (toolbarHeight: number) => {
  // Animated value for toolbar position
  const toolbarPosition = useSharedValue(0);

  // Animation configurations
  const KEYBOARD_ANIMATION_DURATION = 250;
  const TOOLBAR_SPRING_CONFIG = {
    damping: 20,
    stiffness: 200,
  };

  useEffect(() => {
    // Handle keyboard show event
    const handleKeyboardShow = (event: KeyboardEvent) => {
      const keyboardHeight = event.endCoordinates.height;
      const targetPosition =
        Platform.OS === 'ios' ? keyboardHeight - toolbarHeight : 0;

      // Animate toolbar position
      if (Platform.OS === 'ios') {
        toolbarPosition.value = withTiming(targetPosition, {
          duration: KEYBOARD_ANIMATION_DURATION,
        });
      } else {
        toolbarPosition.value = withSpring(
          targetPosition,
          TOOLBAR_SPRING_CONFIG,
        );
      }
    };

    // Handle keyboard hide event
    const handleKeyboardHide = () => {
      if (Platform.OS === 'ios') {
        toolbarPosition.value = withTiming(0, {
          duration: KEYBOARD_ANIMATION_DURATION,
        });
      } else {
        toolbarPosition.value = withSpring(0, TOOLBAR_SPRING_CONFIG);
      }
    };

    // Set up keyboard listeners based on platform
    const keyboardShowListener =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillShow', handleKeyboardShow)
        : Keyboard.addListener('keyboardDidShow', handleKeyboardShow);

    const keyboardHideListener =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillHide', handleKeyboardHide)
        : Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    // Cleanup listeners
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [toolbarHeight]);

  return toolbarPosition;
};
