import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth'; // Firebase auth import
import {OtpScreenProps} from '../../navigation/StackParamList'; // Ensure this is correctly defined

const Otp: React.FC<OtpScreenProps> = ({route, navigation}) => {
  const {email, otpCode, purpose} = route.params; // Receiving email and OTP from navigation params
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP
  const [activeIndex, setActiveIndex] = useState(0); // Track active input index
  const [resendDisabled, setResendDisabled] = useState(false); // Disable resend button
  const [timer, setTimer] = useState(30); // Countdown timer for resend
  const inputRefs = useRef<(TextInput | null)[]>([]); // Create a ref for each input

  // Function to handle input changes for OTP
  const handleInputChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value) || value === '') {
      // Allow only digits and empty
      const newOtp = [...enteredOtp]; // Create a copy of the current OTP array
      newOtp[index] = value; // Update the digit at the specific index
      setEnteredOtp(newOtp); // Update the state with the new OTP

      // Move to the next input box if a digit is entered
      if (value !== '' && index < 5) {
        setActiveIndex(index + 1);
        inputRefs.current[index + 1]?.focus(); // Focus on the next input
      }
    }
  };

  const handleOtpVerification = () => {
    const userEnteredOtp = enteredOtp.join(''); // Join entered digits to form the OTP string

    if (userEnteredOtp === otpCode) {
      // The OTP is valid, so we don't need to send any Firebase email verification
      Alert.alert('Success', 'OTP verified!');

      // Conditionally navigate based on the purpose
      if (route.params.purpose === 'forgotPassword') {
        navigation.navigate('Main'); // Navigate to Main screen if purpose is 'forgotPassword'
      } else if (route.params.purpose === 'signup') {
        navigation.navigate('Profile'); // Navigate to Profile Information screen if purpose is 'signup'
      }
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const sendOtpToEmail = (email: string, otpCode: string) => {
    fetch(
      'https://flourishing-kelpie-672381.netlify.app/.netlify/functions/send-otp',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otpCode,
        }),
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log('OTP sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
      });
  };

  const handleResendOtp = () => {
    sendOtpToEmail(email, otpCode);
    setResendDisabled(true); // Disable the button
    setTimer(30); // Reset timer to 30 seconds
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setResendDisabled(false); // Enable resend button when timer is done
    }
    return () => clearInterval(interval);
  }, [resendDisabled, timer]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}} // Use flex to fill the screen
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0} // Adjust this offset based on your header height if needed
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 20,
        }}>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={{fontSize: 40, fontWeight: '800'}}>
            <Text style={{color: 'black'}}>My</Text>
            <Text style={{color: 'red'}}>Yoga</Text>
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '800',
              color: 'black',
              marginBottom: 10,
            }}>
            Enter OTP
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'gray',
              textAlign: 'center',
              marginBottom: 20,
            }}>
            Enter the 6-digit code we just sent to your email
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            {enteredOtp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)} // Assign the ref to each input
                className="bg-slate-100	"
                style={{
                  padding: 10,
                  borderRadius: 10,
                  width: 50, // Increased width
                  height: 50, // Increased height
                  textAlign: 'center',
                  fontSize: 24,
                  marginHorizontal: 5,
                  borderColor: activeIndex === index ? 'red' : 'transparent', // Red border for active input
                  borderWidth: 2, // Set border width
                }}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={value => handleInputChange(value, index)}
                onFocus={() => setActiveIndex(index)} // Set active input on focus
              />
            ))}
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={resendDisabled}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 10,
                width: '100%',
                opacity: resendDisabled ? 0.6 : 1,
                backgroundColor: 'white', // Optional: make the background white
              }}>
              <Text className="text-red-500 text-sm font-bold">
                Resend OTP
                {resendDisabled && (
                  <Text style={{marginLeft: 10, fontSize: 16, color: 'gray'}}>
                    ({timer}s)
                  </Text>
                )}{' '}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-red-500 w-full py-4  rounded-3xl mt-5 flex items-center"
            onPress={handleOtpVerification}>
            <Text className="text-white text-sm font-bold">
              {' '}
              Verify & Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Otp;
