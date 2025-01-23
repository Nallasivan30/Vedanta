import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as Camera from 'expo-camera';
import { launchCamera, CameraOptions,  } from 'react-native-image-picker';

export default function App() {
   
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const handleCapture = async () => {
    const options: CameraOptions = {
      mediaType: "photo",
      cameraType: "front", // Front camera
      quality: 0.8, // Adjust quality (0-1 scale)
      saveToPhotos: true, // Optionally save to gallery
    };

    try {
      const result = await launchCamera(options);
      
      // If the user has taken a photo and there is a valid URI
      if (result.assets && result.assets[0]) {
        setCapturedImage(result.assets[0].uri || null);
      } else {
        Alert.alert("No photo captured", "Please try again.");
      }
    } catch (error) {
      console.error("Error launching camera:", error);
      Alert.alert("Camera error", "An error occurred while accessing the camera.");
    }
  };

  // Handle Retake Button Press
  const handleRetake = () => {
    setCapturedImage(null); // Reset captured image
  };

  // Handle Confirm Button Press
  const handleConfirm = () => {
    if (capturedImage) {
      // Proceed with the confirmed image (e.g., upload it or save it)
      Alert.alert("Image confirmed", "Your image is ready.");
    } else {
      Alert.alert("No image", "Please capture an image before confirming.");
    }
  };


  return (

      <View style={styles.captureContainer}>
        <Text style={styles.textInput}>Capture You!</Text>
        <View style={styles.circle}>
        <View style={styles.arc}></View>
        {capturedImage ? (
          <Image
            source={{ uri: capturedImage }}
            style={styles.capturedImage}
          />
        ) : (
          <View style={styles.progress}></View>
        )}
        </View>
        <View style={styles.instructContainer}>
        <Text style={styles.instructions}>
          Capture Your Best Face Here!
        </Text>
        </View>
        {!capturedImage ? (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapture}
        >
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}
        <View style={styles.alignTextContainer}>
        <Text style={styles.alignText}>Align your face within the frame for a </Text>
        <Text style={styles.span}>clear and accurate capture</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  
  captureContainer: {
    width: '100%', // 'Fill' in CSS means full width of the parent container
    maxWidth: 369, // To set a maximum width of 369px
    height: 'auto', // 'Hug' means height will adjust based on content
    maxHeight: 542, // Ensure it doesn't exceed 542px
    padding: 32, // Equivalent to `var(--SpacingSpacing-xl32)`
    gap: 24, // Gap is typically for flex spacing (use margin or spacing between children)
    borderRadius: 32, // Equivalent to `var(--RadiusRadius-xl32)`
    borderWidth: 1, // Border width of 1px
    borderTopWidth: 1, // Top border width of 1px
    borderColor: '#E0E0E0', // Border color
    backgroundColor: '#FAFAF9', // Background color
  },
  textInput: {
    fontFamily: 'DM Sans', // Ensure DM Sans is properly loaded in your project
    fontSize: 32, // Font size in pixels
    fontWeight: '500', // Medium weight
    lineHeight: 38.4, // Line height in pixels
    letterSpacing: 0.02, // Letter spacing in em
    textAlign: 'left', // Align text to the left
    textDecorationLine: 'none', // Removes underline
    color: '#000', // Default text color (change as needed)
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 224, // Width in pixels
    height: 224, // Height in pixels
    borderRadius: 224 / 2, // Ensure the borderRadius is half the width/height to make it a circle
    borderWidth: 2, // Border width
    borderColor: '#292927', // Border color
    opacity: 0.5, // Opacity setting
    backgroundColor: '#fff', // Optional, background color for visibility
    position: 'relative', // Make sure the arc is positioned relative to the circle
  },
  arc: {
    position: 'absolute', // Position it inside the circle
    top: 0, // Position the arc at the top
    left: 0, // Align the arc to the left
    width: 224, // Match the width of the circle
    height: 224, // Match the height of the circle
    borderRadius: 224 / 2, // Ensure the arc is circular
    borderTopWidth: 5, // Make it a border with width 5
    borderRightWidth: 5, // Apply width to the right
    borderTopColor: 'transparent', // Transparent to show the arc
    borderRightColor: '#4A90E2', // Blue color for the arc
    borderStyle: 'solid',
    transform: [{ rotate: '90deg' }], // Rotate to form the segment (from 12 o'clock to 3 o'clock)
    zIndex: 1, // Ensure arc stays above background
  },
  progress: {
    width: 180, // Width in pixels (slightly smaller than the circle)
    height: 180, // Height in pixels
    borderRadius: 180 / 2, // Ensure the borderRadius is half the width/height to make it a circle
    borderWidth: 0,
    backgroundColor: '#00000033', // Light black background color
    position: 'absolute', // Position it within the parent circle
    zIndex: 0, // Ensure the progress circle stays behind the arc
  },
  capturedImage: {
    width: 224,
    height: 224,
    borderRadius: 112,
  },
  instructContainer:{
    width: '100%', // 'Fill' means full width in React Native
    maxWidth: 305, // Constrain width to 305px
    height: 'auto', // 'Hug' means the height adjusts to the content
    paddingVertical: 4, // Corresponds to `var(--SpacingSpacing-xxs4)` for top and bottom
    paddingHorizontal: 0, // Left and right padding is 0
    gap: 24,
  },
  instructions: {
    width: 279, // Fixed width in pixels
    height: 21, // Fixed height in pixels
    marginVertical: 0, // Since gap is not directly supported
    fontFamily: 'DM Sans', // Ensure DM Sans is properly linked in your project
    fontSize: 20, // Font size in pixels
    fontWeight: '700', // Bold text
    lineHeight: 21, // Line height in pixels
    letterSpacing: 0.02, // Letter spacing in em
    textAlign: 'center', // Center-align text
    color: '#292927', // Background color for text
    textDecorationLine: 'none', // No underline decoration
  },
  captureButton: {
    width: 305, // Fixed width
    height: 56, // Fixed height
    paddingVertical: 16, // Equivalent to `var(--SpacingSpacing-md16)`
    paddingHorizontal: 24, // Equivalent to `var(--SpacingSpacing-lg24)`
    borderRadius: 360, // Equivalent to `var(--RadiusRadius-full360)`
    backgroundColor: '#1A5CFF', // Background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText: {
    fontFamily: 'DM Sans', // Ensure the font is linked properly in your project
    fontSize: 16, // Font size
    fontWeight: '600', // Semi-bold text
    lineHeight: 24, // Line height
    letterSpacing: -0.025, // Letter spacing
    color: '#FFFFFF', // Text color
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  alignTextContainer:{
    width: '100%', // Fill the width
    height: 'auto', // Hug the content
    paddingVertical: 0, // Equivalent to `var(--SpacingSpacing-xxs4)`
    paddingHorizontal: 2, // No horizontal padding
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', 
  },
  alignText: {
    fontSize: 14,
    color: "#707070",
    textAlign: "center",
    marginTop: 10,
  },
  retakeButton: {
    width: 140,
    height: 56,
    borderRadius: 360,
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    width: 140,
    height: 56,
    borderRadius: 360,
    backgroundColor: "#1A5CFF",
    justifyContent: "center",
    alignItems: "center",
  },
  
  span:{
    fontFamily: 'DM Sans', // Make sure you have the font loaded in your project
    fontSize: 14, // Equivalent to font-size: 14px
    fontWeight: '700', // Bold font weight (700)
    lineHeight: 21, // Equivalent to line-height: 21px
    letterSpacing: 0.02, // React Native uses numeric values for letter-spacing
    textAlign: 'center', // Align text in the center
    textDecorationLine: 'none'
  },
});

