import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"; // Import Camera from expo-camera
import { useRouter } from 'expo-router';


export default function App() {
  const [facing, setFacing] = useState<CameraType>("front");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null); // Create a reference for the camera
  const router = useRouter();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions(); // Request Camera Permission

  // Request permission when the component mounts
  useEffect(() => {
    if (!cameraPermission?.granted) {
      requestCameraPermission(); // Request camera permission
    }
  }, [cameraPermission]);

  const handleCapture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1, // Adjust quality (0-1 scale)
          base64: true, // Optional, returns base64 image data
          skipProcessing: false, // Optionally skips processing for faster capture
        });

        // If the photo is successfully captured, update the state
        if (photo?.uri) {
          setCapturedImage(photo.uri);
        } else {
          Alert.alert("No photo captured", "Please try again.");
        }
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      Alert.alert("Camera error", "An error occurred while capturing the photo.");
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
      Alert.alert("Image successfully captured", "Get into next step",[
        {
          text: "OK",
          onPress: () => {
            // Navigate to the Upload page upon pressing OK
            router.push("./upload"); // This will navigate to the 'UploadPage'
          },
        },
      ]);
    } else {
      Alert.alert("No image", "Please capture an image before confirming.");
    }
  };

  // If permission is denied, show an alert
  useEffect(() => {
    if (cameraPermission?.status === "denied") {
      Alert.alert(
        "Camera Permission Denied",
        "Please enable camera permissions in your device settings to continue.",
        [{ text: "OK" }]
      );
    }
  }, [cameraPermission]);

  return (
    <View style={styles.captureContainer}>
      <Text style={styles.textInput}>Capture You!</Text>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <View style={styles.arc}></View>
          {capturedImage ? (
            <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          ) : (
            <CameraView
              style={styles.progress}
              facing={facing}
              ref={cameraRef} // Assign the reference to the camera
            ></CameraView>
          )}
        </View>
      </View>
      <View style={styles.instructContainer}>
        <Text style={styles.instructions}>Capture Your Best Face Here!</Text>
      </View>
      {!capturedImage ? (
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Text style={styles.ConfirmbuttonText}>Capture</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.RetakebuttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.ConfirmbuttonText}>Confirm</Text>
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
    width: "100%",
    maxWidth: 369,
    height: "auto",
    maxHeight: 542,
    padding: 32,
    gap: 24,
    borderRadius: 32,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FAFAF9",
  },
  textInput: {
    fontFamily: "DM_Sans",
    fontSize: 32,
    fontWeight: "500",
    lineHeight: 38.4,
    letterSpacing: 0.02,
    textAlign: "left",
    textDecorationLine: "none",
    color: "#000",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 224,
    height: 224,
    borderRadius: 224 / 2,
    borderWidth: 2,
    borderColor: "#292927",
    opacity: 0.5,
    backgroundColor: "#fff",
    position: "relative",
  },
  arc: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 224,
    height: 224,
    borderRadius: 224 / 2,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopColor: "transparent",
    borderRightColor: "#4A90E2",
    borderStyle: "solid",
    transform: [{ rotate: "90deg" }],
    zIndex: 1,
  },
  progress: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    borderWidth: 0,
    position: "absolute",
    zIndex: 0,
  },
  capturedImage: {
    width: 224,
    height: 224,
    borderRadius: 112,
  },
  instructContainer: {
    width: "100%",
    maxWidth: 305,
    height: "auto",
    paddingVertical: 4,
    paddingHorizontal: 0,
    gap: 24,
    
  },
  instructions: {
    width: 279,
    height: 21,
    marginVertical: 0,
    fontFamily: "DM_Sans",
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.02,
    textAlign: "center",
    color: "#292927",
    textDecorationLine: "none",
  },
  captureButton: {
    width: 305,
    height: 56,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 360,
    backgroundColor: "#1A5CFF",
    justifyContent: "center",
    alignItems: "center",
  },
  RetakebuttonText:{
    fontFamily: "DM_Sans",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: -0.025,
    color: "#1A5CFF",
  },
  ConfirmbuttonText: {
    fontFamily: "DM_Sans",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: -0.025,
    color: "#FFFFFF",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  alignTextContainer: {
    width: "100%",
    height: "auto",
    paddingVertical: 0,
    paddingHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  alignText: {
    fontSize: 14,
    color: "#707070",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "DM_Sans",

  },
  retakeButton: {
    width: 140,
    height: 56,
    borderRadius: 360,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor:'#1A5CFF',
    borderWidth:1,
  },
  confirmButton: {
    width: 140,
    height: 56,
    borderRadius: 360,
    backgroundColor: "#1A5CFF",
    justifyContent: "center",
    alignItems: "center",
  },
  span: {
    fontFamily: "DM_Sans",
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.02,
    textAlign: "center",
    textDecorationLine: "none",
    fontWeight: "600",
  },
});
