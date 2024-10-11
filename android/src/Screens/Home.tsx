import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  Animated,
} from "react-native";
import { Asset, launchCamera, launchImageLibrary, ImagePickerResponse } from "react-native-image-picker";

const Home = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [animationValue] = useState(new Animated.Value(0));

  // Request camera permission for Android
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "This app needs access to your camera",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true; // iOS permissions are handled automatically
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Function to open the camera
  const handleOpenCamera = async () => {
    const isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera({ mediaType: "photo", quality: 1 }, (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log("User cancelled camera");
        } else if (response.errorMessage) {
          console.log("Camera Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setImageUri(uri || null); // Update state with image URI
          closeModal(); // Close the modal after selecting an image
        }
      });
    } else {
      Alert.alert("Camera permission is required to capture images.");
    }
  };

  // Function to select image from the library
  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri || null); // Update state with image URI
        closeModal(); // Close the modal after selecting an image
      }
    });
  };

  // Function to remove the selected image
  const removeImage = () => {
    setImageUri(null); // Reset the image URI
  };

  // Function to show the modal with options
  const showModal = () => {
    setModalVisible(true);
    // Animate the modal entrance
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Function to close the modal
  const closeModal = () => {
    // Animate the modal exit
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drag files here or browse your computer</Text>
      <TouchableOpacity style={styles.uploadContainer} onPress={showModal}>
        {imageUri ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.uploadText}>Browse Files</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchButton} onPress={showModal}>
        <Text style={styles.searchButtonText}>Search the Product</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                opacity: animationValue,
                transform: [{ scale: animationValue }],
              },
            ]}
          >
            <Text style={styles.modalTitle}>Select an option:</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleOpenCamera}>
              <Text style={styles.modalButtonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleSelectImage}>
              <Text style={styles.modalButtonText}>Upload from Gallery</Text>
            </TouchableOpacity>
            {/* Removed Close Button */}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  uploadContainer: {
    width: 300,
    height: 350,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadText: {
    color: "#888",
    fontSize: 16,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    bottom: 0.1, // Adjust this value to move the button up from the bottom
    backgroundColor: "#D3D3D3", // Light gray background
    width: "100%", // Full width
    height: 30, // Fixed height
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#000",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default Home;
