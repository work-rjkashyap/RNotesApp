// src/utils/editor/imageUtils.ts
import {Platform, PermissionsAndroid} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import type {ImageSource} from '../../types/editor';

const IMAGE_OPTIONS = {
  mediaType: 'photo' as const,
  maxWidth: 1024,
  maxHeight: 1024,
  quality: 0.7,
  includeBase64: true,
};

export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Camera permission error:', err);
      return false;
    }
  } else {
    const permission = await check(PERMISSIONS.IOS.CAMERA);
    if (permission === RESULTS.DENIED) {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      return result === RESULTS.GRANTED;
    }
    return permission === RESULTS.GRANTED;
  }
};

export const requestPhotoLibraryPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Photo Library Permission',
          message: 'App needs access to your photo library.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Photo library permission error:', err);
      return false;
    }
  } else {
    const permission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (permission === RESULTS.DENIED) {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return result === RESULTS.GRANTED;
    }
    return permission === RESULTS.GRANTED;
  }
};

const handleImagePickerResponse = (
  response: ImagePickerResponse,
  onSuccess: (uri: string) => void,
  onError: (error: string) => void,
) => {
  if (response.didCancel) {
    return;
  }

  if (response.errorCode) {
    onError(response.errorMessage || 'Unknown error occurred');
    return;
  }

  if (response.assets && response.assets[0]) {
    const asset: Asset = response.assets[0];
    if (asset.uri) {
      onSuccess(asset.uri);
    } else {
      onError('No image selected');
    }
  } else {
    onError('No image selected');
  }
};

export const handleImagePicker = async (
  source: ImageSource,
  onSuccess: (uri: string) => void,
  onError: (error: string) => void,
) => {
  try {
    let hasPermission = false;

    if (source === 'camera') {
      hasPermission = await requestCameraPermission();
    } else {
      hasPermission = await requestPhotoLibraryPermission();
    }

    if (!hasPermission) {
      onError('Permission denied');
      return;
    }

    const launch = source === 'camera' ? launchCamera : launchImageLibrary;
    const response = await launch(IMAGE_OPTIONS);
    handleImagePickerResponse(response, onSuccess, onError);
  } catch (error) {
    console.error('Image picker error:', error);
    onError('Failed to pick image');
  }
};

export const generateImageHTML = (uri: string, alt: string = ''): string => {
  return `<img src="${uri}" alt="${alt}" style="max-width: 100%; height: auto; display: block; margin: 8px 0; border-radius: 8px;">`;
};

export const processImage = async (
  uri: string,
  options = {maxWidth: 1024, maxHeight: 1024, quality: 0.7},
): Promise<string> => {
  // Image processing logic here
  // You might want to add image compression, resizing, etc.
  return uri;
};
