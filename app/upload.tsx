import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet,TextInput ,TouchableOpacity, Image, Alert, Button } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"; // Import Camera from expo-camera
import Icon from "react-native-vector-icons/MaterialIcons"; 
import Icons from "react-native-vector-icons/Octicons"; 

import * as DocumentPicker from 'expo-document-picker';

export default function Upload() {
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null); 
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions(); // Request Camera Permission
  
  // Request permission when the component mounts
    useEffect(() => {
      if (!cameraPermission?.granted) {
        requestCameraPermission(); // Request camera permission
      }
    }, [cameraPermission]);

  // to upload document
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      // Log the result to understand the structure
      console.log(result);

      // Check if the result contains an asset and the uri
      if (result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0]; // Get the first file from assets

        if (selectedFile.uri) {
          setFileUri(selectedFile.uri);  // Set the URI of the selected document
          setFileName(selectedFile.name); // Set the name of the selected file
        } else {
          console.log('No file URI found.');
        }
      } else {
        console.log('No document selected or operation canceled.');
      }
    } catch (error) {
      console.error('Document Picker Error:', error);
    }
  };

  // to capture image\
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
 // delete the uploaded file
  const handleDeleteFile = () => {
    setFileUri(null);
    setFileName('');
  };

  // handling btn option
  const handleButtonPress = () => {
    if (fileUri) {
      // If fileUri is set, it means file was uploaded
      console.log('Uploading the file: ', fileUri);
      // You can put your file upload logic here
    } else {
      // If no fileUri, trigger camera capture
      handleCapture();
    }
  };

  return (
    <>
    <View style={styles.headerContianer}> 
        <Text style={styles.headerText}>Verify Your Identity</Text>
    </View>
    <View style={styles.container}>

          <Text style={styles.titleText}>Upload Document</Text>
          <Text style={styles.descriptionText}>
              Upload your <Text style={styles.span}>Aadhar</Text> card to complete the verification process securely.
          </Text>
          <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.captureIcon} >
              <Icon name="cloud-upload" style={styles.iconImage} onPress={pickDocument} size={36}  />

              </TouchableOpacity>
              <Text style={styles.uploadInstructions}>Capture it Fully visible and clear</Text>
          </View>
          
          {/* Show the picked document details */}
      {fileUri ? (
          // 
          <View>
            <Text style={styles.uploadedHead}>Uploaded</Text>
            <View style={styles.uploadedContainer}>
              <View style={styles.uploadedCenterCon}>
                <Text style={styles.filname}>{fileName}</Text>
                <TouchableOpacity onPress={handleDeleteFile}>
                <Icons name="trash" style={styles.trash} size={16} />
              </TouchableOpacity>
              </View>
            </View>
          </View>
      ) : (null)}
          <TouchableOpacity
              style={styles.captureButton}
              onPress={handleButtonPress}
          >
              <Text style={styles.captureButtonText}>{fileUri?"Upload":"Capture"}</Text>
          </TouchableOpacity>

          <Text style={styles.sizeInfo}>Upload Less than 5MB in Size</Text>
          
      </View></>
  );
}

const styles = StyleSheet.create({
    headerContianer:{
        width: 393, // Set width to 393px
        height: 64, // Set height to 64px (fixed height)
        padding: 12, // Padding equivalent to var(--SpacingSpacing-sm12)
        justifyContent: "flex-start",
        gap: 8,
    },
    headerText: {
        width: 241, // Width: 241px
        height: 28, // Height: 28px
        fontFamily: "DM_Sans", // Font family
        fontSize: 20, // Font size: 20px
        fontWeight: "500", // Font weight: 500
        lineHeight: 28, // Line height: 28px
        letterSpacing: 0.02, // Letter spacing: 0.02em
        color: "#292927", // Background color equivalent: #292927
        textDecorationLine: "none", // text-decoration-skip-ink doesn't apply in React Native
      },
    container: {
    width: 369, // width: 369px
    height: 'auto', // height: 423px (React Native uses pixel values)
    padding: 32, // padding: 32px (mapped from --SpacingSpacing-xl32, adjust accordingly)
    gap: 24, // gap: 24px (React Native doesn't support gap directly, but use margin or padding on children elements)
    borderRadius: 32, // border-radius: 32px (mapped from --RadiusRadius-xl32)
    borderWidth: 1, // border-top: 1px (Only top border is defined as per original CSS)
    borderColor: "#E0E0E0", // border color
   
    backgroundColor: "#FAFAF9", // background color: #FAFAF9
  },
  
  titleText: {
    fontFamily: "DM_Sans", // font-family: DM Sans
    fontSize: 32, // font-size: 32px
    fontWeight: "500", // font-weight: 500
    lineHeight: 38.4, // line-height: 38.4px
    letterSpacing: 0.02, // letter-spacing: 0.02em
    textAlign: "left", 
  },
  descriptionText: {
    fontFamily: "DM_Sans",// font-family: DM Sans
    fontSize: 14, // font-size: 14px
    fontWeight: "400", // font-weight: 400
    lineHeight: 21, // line-height: 21px
    letterSpacing: 0.02, // letter-spacing: 0.02em
    textAlign: "center", // text-align: center
    // React Native does not directly support `text-underline-position` or `text-decoration-skip-ink`
    // If underline is required:
  },
  span:{
    fontSize: 14, // font-size: 14px
    fontWeight: "600",//font-weight: 600
    lineHeight: 21, // line-height: 21px
    letterSpacing: 0.02, // letter-spacing: 0.02em
    textAlign: "center", // text-align: center
    // React Native does not directly support text-underline-position or text-decoration-skip-ink
    textDecorationLine: "none", 
  },

  fileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  uploadContainer: {
    width: "100%", // Fill width (305px in the design translates to full width in RN layout)
    maxWidth: 305, // Ensures it doesn't exceed 305px if constrained
    height: 116, // Hug height (React Native automatically adjusts height)
    maxHeight: 116, // Sets a maximum height of 116px
    padding: 16, // padding: var(--spacinglg) assumed as 16px
    gap: 12, // gap: 12px (use in layout as flex spacing or padding between children)
    borderRadius: 12, // border-radius: var(--radimlg), assumed as 12px
    borderWidth: 1, // Specifies border width
    borderColor: "#1A5CFF", // Border color
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderStyle: 'dashed'
  },
  captureIcon: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  iconImage: {
    color:'#1A5CFF'
  },
  uploadInstructions: {
    fontFamily: "DM_Sans", // Font family
    fontSize: 14, // Font size
    fontWeight: "400", // Font weight
    lineHeight: 20, // Line height
    textAlign: "left", // Text alignment
    color: "#98989D",
  },
  uploadedHead:{
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 15.4,
    letterSpacing: -0.025,
    textAlign: 'left',
    color: '#292927',
    fontFamily:"DM_Sans"
  },
  uploadedContainer:{
    width: 305,
    height: 44,
    marginTop: 25,
    padding: 10,
    gap: 6, 
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1A5CFF',
    backgroundColor: '#FFFFFF',
    
  },
  uploadedCenterCon:{
    justifyContent:'center',
    display:"flex",
    alignItems:"center",
    flexDirection:"row"
  },
  filname:{
    flex:1,
  },
  trash:{
    flex:1,

    color:"#BE0000",
    textAlign:"right"
  },
  captureButton: {
    width: 305, // Fixed width
    height: 56, // Fixed height
    paddingVertical: 16, // Padding for vertical spacing
    paddingHorizontal: 24, // Padding for horizontal spacing
    borderRadius: 360, // Full border radius
    backgroundColor: "#1A5CFF", // Button background color
    justifyContent: "center", // Center text vertically
    alignItems: "center", 
  },
  captureButtonText: {
    fontFamily: "DM_Sans", // Font family
    fontSize: 16, // Font size
    fontWeight: "600", // Font weight
    color: "#FFFFFF", // Text color
  },
  sizeInfo: {
    fontFamily: "DM_Sans", // Font family
    fontSize: 14, // Font size
    fontWeight: "400", // Font weight
    lineHeight: 21, // Line height
    letterSpacing: 0.02, // Letter spacing (in em, use 0.02 as raw value)
    textAlign: "center", // Text alignment
    color: "#292927", // Background color converted to text color
    textDecorationLine: "none", 
  },
});