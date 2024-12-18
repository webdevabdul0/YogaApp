import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// Define types for your stack parameter list
export type StackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Otp: {email: string; otpCode: string; purpose: 'signup' | 'forgotPassword'};
  ForgotPassword: undefined;
  Main: {
    refresh?: boolean;
  };
  HomeScreen: {
    refresh?: boolean;
  };
  Profile: undefined;
  CameraStream: {
    pose: {
      id: number; // Unique identifier for the pose
      image: any; // Image source
      name: string; // Pose name
      difficulty: string; // Pose difficulty level
      gender: string; // Gender info (e.g., "Male & Female")
      description: string; // Description of the pose
      duration: string; // Duration (e.g., "2 minutes")
      targetMuscle: string; // Target muscle (e.g., "Core")
      goal: string; // Main goal (e.g., "Improve Posture, Improve Balance")
      videoUri: any;
    };
  };
  SettingsScreen: {refresh?: boolean};
  Notifications: undefined;
  Appearance: undefined;
  Language: undefined;
  Privacy: undefined;
  EditProfile: undefined;
  CameraSettings: undefined;
  PoseDetail: {
    pose: {
      id: number; // Unique identifier for the pose
      image: any; // Image source
      name: string; // Pose name
      difficulty: string; // Pose difficulty level
      gender: string; // Gender info (e.g., "Male & Female")
      description: string; // Description of the pose
      duration: string; // Duration (e.g., "2 minutes")
      targetMuscle: string; // Target muscle (e.g., "Core")
      goal: string; // Main goal (e.g., "Improve Posture, Improve Balance")
      videoUri: any;
    };
  }; // Updated PoseDetail with full pose object
};

// Define types for each screen's navigation and route props
export type OtpScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Otp'>;
  route: RouteProp<StackParamList, 'Otp'>;
};

export type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
};

export type SignupScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Signup'>;
};

export type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Onboarding'>;
};

export type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'ForgotPassword'>;
};

export type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Profile'>;
};

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Main'>;
  route: RouteProp<StackParamList, 'SettingsScreen'>;
};
export type PoseDetailScreenProps = NativeStackScreenProps<
  StackParamList,
  'PoseDetail'
>;

export type CameraScreenProps = NativeStackScreenProps<
  StackParamList,
  'CameraStream'
>;

export type SettingScreenProps = NativeStackScreenProps<
  StackParamList,
  'CameraSettings'
>;

// Define types for Settings Stack screens
export type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'SettingsScreen'>;
  route: RouteProp<StackParamList, 'SettingsScreen'>; // Ensure route is defined
};

export type NotificationsScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Notifications'>;
};

export type AppearanceScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Appearance'>;
};

export type LanguageScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Language'>;
};

export type PrivacyScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Privacy'>;
};

export type EditProfileScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'EditProfile'>;
};
