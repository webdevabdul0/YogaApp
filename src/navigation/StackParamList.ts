import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Define types for your stack parameter list
export type StackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Otp: {email: string; otpCode: string; purpose: 'signup' | 'forgotPassword'};
  ForgotPassword: undefined;
  Main: undefined;
  Profile: undefined;
  PoseDetail: {poseId: number}; // Add this
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
export type PoseDetailScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'PoseDetail'>;
};
