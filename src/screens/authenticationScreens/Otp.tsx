import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth'; // Firebase auth import
import {OtpScreenProps} from '../../navigation/StackParamList'; // Ensure this is correctly defined

const Otp: React.FC<OtpScreenProps> = ({route, navigation}) => {
  const {email, otpCode} = route.params; // Receiving email and OTP from navigation params
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP

  // Function to handle input changes for OTP
  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...enteredOtp]; // Create a copy of the current OTP array
    newOtp[index] = value; // Update the digit at the specific index
    setEnteredOtp(newOtp); // Update the state with the new OTP
  };

  const handleOtpVerification = () => {
    const userEnteredOtp = enteredOtp.join(''); // Join entered digits to form the OTP string

    if (userEnteredOtp === otpCode) {
      // Mark user as verified in Firebase
      const user = auth().currentUser;
      if (user) {
        user
          .sendEmailVerification()
          .then(() => {
            Alert.alert('Success', 'Email verified!');
            navigation.navigate('Main'); // Navigate to the main screen of your app
          })
          .catch(error => {
            console.error('Email verification error:', error);
          });
      }
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>
          <Text style={styles.logoBlack}>My</Text>
          <Text style={styles.logoRed}>Yoga</Text>
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code we just sent to your email
        </Text>

        <View style={styles.otpContainer}>
          {enteredOtp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={value => handleInputChange(value, index)}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleOtpVerification}>
          <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
  },
  logoBlack: {
    color: 'black',
  },
  logoRed: {
    color: 'red',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
  },
  resendText: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Otp;
