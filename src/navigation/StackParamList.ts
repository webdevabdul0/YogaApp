// navigation/types.ts
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type StackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Otp: undefined;
  ForgotPassword: undefined;
  Main: undefined; // The Main screen corresponds to your TabNavigator
};

// Define types for each screen's navigation prop
export type LoginScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>;
};

export type SignupScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Signup'>;
};

export type OtpScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Otp'>;
};

export type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Onboarding'>;
};

export type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Welcome'>;
};

export type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'ForgotPassword'>;
};
