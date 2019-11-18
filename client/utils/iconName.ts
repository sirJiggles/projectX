import { Platform } from 'react-native';

export default function PlatformSpecificIconName(iconName: string) {
  return Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`;
}
