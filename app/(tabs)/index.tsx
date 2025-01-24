import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import the useRouter hook for navigation

export default function Verify() {
  const [isChecked, setChecked] = useState(false);
  const router = useRouter(); // Initialize the router
  const handleVerifyPress = () => {
    // Navigate to the "otpverification" tab (or another tab)
    router.push("/otpverification"); // Modify with the correct path to your screen
  };
  
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/logo.png")} style={styles.logo} />

      <View style={styles.views}>
        <Text style={styles.title}>Verify</Text>
        <Image source={require("../../assets/images/logo 1.png")} style={styles.verify} />
      </View>
      <TextInput placeholder="Your Name" style={styles.input} />
      <TextInput placeholder="Age" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setChecked(!isChecked)}
        >
          {isChecked && <View style={styles.checked} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>I accept the Terms & Conditions</Text>
      </View>

      <TouchableOpacity
      style={[styles.button, ]} // Opacity controlled by `isChecked`
      onPress={handleVerifyPress}
      disabled={!isChecked} // Disable button when `isChecked` is false
    >
      <Text style={styles.buttonText}>Verify</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 369, // Fixed width in px (React Native uses logical pixels)
    height: 562, // Fixed height in px (React Native uses logical pixels)
    padding: 32, // Replace with actual spacing variable
    gap: 24, // You can implement gap using margin if necessary
    borderRadius: 32, // Replace with actual border radius variable
    borderWidth: 1, // 1px border width
    borderTopWidth: 1, // For top border
    borderColor: '#E0E0E0', // Border color
    backgroundColor: '#FAFAF9', // Background color
  
  },
  logo: {
    width: 202,
    height: 57,
    alignSelf: "center",
    marginBottom: 20,
  },
  views: {
    flexDirection: "row",
    width: 305, // Fixed width in logical pixels
    height: 44, // Fixed height in logical pixels
    gap: 8,
    alignItems: "center",
    justifyContent: 'space-between',
    },
  title: {
    width: 253, // Fixed width in logical pixels
    height: 43, // Fixed height in logical pixels // Full transparency (0px opacity)
    fontFamily: 'DM_Sans', // Specify the font family
    fontSize: 36, // Font size in pixels
    fontWeight: '500', // Font weight
    lineHeight: 43.2, // Line height
    letterSpacing: 0.04, // Letter spacing in logical pixels (no 'em' units in React Native)
    textAlign: 'left', // Text alignment
    color: '#292927', // Background color
  },
  verify:{
    width: 44,
height: 44,
gap: 0

  },
  input: {
    width: 305, // Fixed width in logical pixels
    height: 56, // Fixed height in logical pixels
    padding: 16, // Replace with your actual spacing value (assuming 16px)
    gap: 16, // React Native does not support `gap`, but this could be used for spacing between child components via margin
    borderRadius: 16, // Border radius (replace with your actual radius value)
    
    borderColor: '#EBEBE6', // Top border color
    backgroundColor: '#FFFFFF', 
  },
  checkboxContainer: {
    flexDirection: "row",
    width: 305,
    height: 29,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 0,
    paddingRight: 0,
  },
  checkbox: {
    width: 18, // Fixed width in logical pixels
    height: 18, // Fixed height in logical pixels
    borderRadius: 4, // Border radius (4px for top-left corner)
    borderWidth: 1, // Assuming var(--BorderBorderWidth-sm1) is 1px. Replace with the actual value if it's different.
    borderColor: '#000'
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: "#007BFF",
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'DM_Sans', // Specify the font family
  },
  button: {
    width: 305, // Fixed width in logical pixels
    height: 56, // Fixed height in logical pixels
    paddingTop: 16, // Replace with your actual spacing for var(--SpacingSpacing-md16)
    paddingBottom: 16, // Same as paddingTop
    paddingLeft: 24, // Replace with your actual spacing for var(--SpacingSpacing-lg24)
    paddingRight: 24, // Same as paddingLeft
    borderRadius: 360, // Full rounded corners (assuming var(--RadiusRadius-full360) means full circle)
    backgroundColor: '#6200EE', // Background color (can be replaced with the color of your choice)
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: '#FFF', // Text color
    fontSize: 16, // Font size
    fontWeight: '500', // Font weight
    textAlign: 'center', // Center text
  }
});
