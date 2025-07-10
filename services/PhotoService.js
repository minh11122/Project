import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export class PhotoService {
  static async requestPermissions() {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== 'granted') {
      Alert.alert('Quyền truy cập', 'Cần cấp quyền camera để chụp ảnh');
      return false;
    }

    const locationPermission = await Location.requestForegroundPermissionsAsync();
    if (locationPermission.status !== 'granted') {
      Alert.alert('Quyền truy cập', 'Cần quyền vị trí để lưu thông tin ảnh');
    }

    return true;
  }

  static async takePhoto() {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      exif: true,
    });

    if (result.canceled || !result.assets?.length) return null;

    return result.assets[0];
  }
}
