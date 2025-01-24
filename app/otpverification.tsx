import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const router = useRouter();

  const handlePress = () => {
    if (isButtonEnabled) {
      router.push("/capture");}
  }

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus next input
    if (value && index < otp.length - 1) {
      const nextInput = `otpInput${index + 1}`;
      const nextInputRef = inputsRef[nextInput];
      if (nextInputRef) nextInputRef.focus();
    }
    if (newOtp.every((digit) => digit !== "")) {
      setIsButtonEnabled(true);  // Enable the button if all OTP fields are filled
    } else {
      setIsButtonEnabled(false); // Disable the button if any OTP field is empty
    }
  };

  
  
  const inputsRef: { [key: string]: any } = {};

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Confirm Signup</Text> */}
      <Text style={styles.subHeader}>It's really you?</Text>
      <View style={styles.inputContainer}>
      <Text style={styles.instructions}>
        An authentication code has been sent to          <Text style={styles.highlight}>9876543210</Text>
      </Text>
      </View>

      {/* OTP Input Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={(value) => handleChange(value, index)}
            ref={(input) => (inputsRef[`otpInput${index}`] = input)}
            placeholder='---'
          />
        ))}
      </View>

      <View style={styles.resend}>
        <Text style={styles.resendCode}>I didn't receive a code?<Text style={styles.resendButton}>Resend Code</Text></Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity       onPress={handlePress}
 style={[styles.nextButton, !isButtonEnabled && styles.nextButtonDisabled]}>
        <Text  style={styles.nextButtonTextLeft}>Next →</Text>
      </TouchableOpacity>

      <Text style={styles.footerContainer} >
        <View style={styles.footerCon}>
          <Text style={styles.footerText}>By Signing In, you agree to our 
          </Text>
          <Text style={styles.link}>Terms and Conditions</Text>

        </View>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 369, 
    height: 466, 
    padding: 32,
    gap: 24, // var(--SpacingSpacing-lg24) is typically handled with `margin` or `flex spacing`
    borderRadius: 32, // var(--RadiusRadius-xl32)
    borderWidth: 1, // Only the top border has width in the original CSS
    borderColor: '#E0E0E0', // Border color
    backgroundColor: '#FAFAFA', // Background color
    
  },
  subHeader: {
    width: 305, // Width in pixels
    height: 38, // Height in pixels
    gap: 0, // Gap is unused in this case since it's zero

    fontFamily: 'DM_Sans', // Ensure you have the font properly loaded in your project
    fontSize: 32, // Font size in pixels
    fontWeight: '500', // Font weight
    lineHeight: 38.4, // Line height in pixels
    letterSpacing: 0.02, // Letter spacing in em (React Native uses ems directly as numbers)
    textAlign: 'left', // Align text to the left

    textDecorationLine: 'none', // React Native equivalent for text-decoration
    color: '#292927',
  },
  inputContainer:{
    width: 305, // Width in pixels
    height: 36, // Height in pixels
    gap: 0, // React Native does not directly support 'gap' for text; can be omitted
  },
  instructions: {
   

    opacity: 0.5, // Opacity equivalent to --TextText-Opacity75

    fontFamily: 'DM_Sans', // Ensure the font is loaded in your project
    fontSize: 12, // Font size in pixels
    fontWeight: '500', // Font weight
    lineHeight: 18, // Line height in pixels
    letterSpacing: 0.02, // Letter spacing in em
    textAlign: 'left', // Align text to the left

    textDecorationLine: 'none',
  },
  highlight: {
    fontFamily: 'DM_Sans', // Ensure you load this font in your project
    fontSize: 14, // Font size in pixels
    fontWeight: '600', // Font weight
    lineHeight: 18, // Line height in pixels
    letterSpacing: 0.02, // Letter spacing in em
    textAlign: 'left', // Text alignment
    textDecorationLine: 'none',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // 'Fill' implies it should take the full width of its parent
    maxWidth: 305, // You can constrain it to 305px if needed
    height: 88, // Fixed height
    gap: 12,  },
  otpInput: {
    width: '100%', // 'Fill' implies full width
    maxWidth: 67.25, // Constrain width to 67.25px
    height: 88, // Fixed height
    padding: 16, // Equivalent to `var(--SpacingSpacing-md16)`
    gap: 16, // React Native does not directly support `gap`, use margin for spacing child elements
    borderRadius: 16, // Equivalent to `var(--RadiusRadius-mg16)`
    borderTopWidth: 2, // Only the top border is set
    borderTopColor: '#EBEBE6', // Color for the top border
    borderColor: 'g', // To ensure other borders are transparent
    borderWidth: 1,
    color: 'gray',
    fontSize:22,
    alignItems: 'center',
  },
  resend:{width: '100%',
    maxWidth: 305,
    height: 'auto',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 0,
    paddingRight: 0,},
  resendCode: {
    fontFamily: 'DM_Sans', // Ensure the font is available in your project
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.02, // React Native uses a number, not `em`
    textAlign: 'center',
  },
  resendButton:{
    fontFamily: 'DM_Sans', // Ensure the font is available in your project
    fontSize: 20,
    fontWeight: '700', // This corresponds to bold text
    lineHeight: 21,
    letterSpacing: 0.02, // React Native uses numbers for letter-spacing, no 'em' units
    textAlign: 'center',
  },
  nextButton: {
    width: 305,
    height: 56,
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 24,
    borderRadius: 360, 
    backgroundColor: '#1A5CFF', // Orange color
  },
  nextButtonTextLeft: {
    color: 'white',
    width: 35, // Fixed width in pixels
    height: 24, // Fixed height in pixels
    fontFamily: 'DM_Sans', // Ensure this font is available in your project
    fontSize: 16,
    fontWeight: '600', // Semi-bold weight in React Native
    lineHeight: 24,
    letterSpacing: -0.025, // React Native uses numbers, not 'em' units
    textAlign: 'center',
  },
  // nextButtonTextRight:{
  //   width: 24,
  //   height: 24,
  // },
bottomContainer:{
  width: 305, // Fixed width in pixels (Fill equivalent)
    height: 32, // Fixed height in pixels (Hug equivalent)
    paddingTop: 4, // Assuming `var(--SpacingSpacing-xxs4)` corresponds to 4px
    paddingBottom: 4, // Same as padding-top
    paddingLeft: 0,
    paddingRight: 0,
   
},
nextButtonDisabled: {
  backgroundColor: '#D3D3D3', // Grey out the button when disabled
},

footerContainer:{
  width: 305, // Fixed width in pixels (Fill equivalent)
    height: 32, // Fixed height in pixels (Hug equivalent)
    paddingTop: 4, // Assuming `var(--SpacingSpacing-xxs4)` corresponds to 4px
    paddingBottom: 4, // Same as padding-top
    paddingLeft: 4,
    paddingRight: 4,
    gap:24,
},
footerCon:{
  width: 279,  // Equivalent to width: 279px
    height: 42,  // Container height
    flexDirection: 'column',  // Ensures the layout is column-wise
    
},
  footerText: {
    
    fontFamily: 'DM_Sans',  // Ensure you load the font in your project
    fontSize: 14,  // Equivalent to 14px
    fontWeight: '400',  // Regular weight in React Native
    lineHeight: 21,  // Line height of 21px
    letterSpacing: 0.02,  // React Native uses numeric value directly for letter-spacing
    textAlign: 'center',  // Center the text horizontally
    textDecorationLine: 'none', 
    color: '#292927'
  },
  link: {
    fontFamily: 'DM_Sans',  // Ensure you load the font in your project
    fontSize: 14,  // Equivalent to 14px
    fontWeight: '700',  // Bold weight in React Native
    lineHeight: 21,  // Line height of 21px
    letterSpacing: 0.02,  // React Native uses numeric values for letter-spacing
    textAlign: 'center',  // Center the text horizontally
    textDecorationLine: 'none', 
  },
});
