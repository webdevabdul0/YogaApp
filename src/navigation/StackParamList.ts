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
  Main: undefined;
  Home: undefined;
  Profile: undefined;
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
};
export type PoseDetailScreenProps = NativeStackScreenProps<
  StackParamList,
  'PoseDetail'
>;
