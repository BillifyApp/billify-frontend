import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { url } from "../stores/constants";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import { Thumbnail } from "../components/Thumbnail";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  addReceiptAutoName,
  homeName,
  homeNavName,
} from "../stores/route_names";
import { styles } from "../styles/styles";
import { COLORS } from "../styles/colors";
import AnimatedLottieView from "lottie-react-native";
import CustomText from "../components/atom/CustomText";
import { Icon } from "../styles/fonts";
//TUT https://blog.logrocket.com/how-to-upload-images-react-native-laravel-api/#setting-up-the-laravel-image-upload-api

interface CustomResizeResult {
  uri: string;
  width: number;
  height: number;
}

interface UploadModalProps {
  navigation: any;
  group_id?: string;
}


function UploadModal({navigation, group_id}: UploadModalProps) {
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset>();
  const { t } = useTranslation();
  const auth = useAuth();
  const cameraRef = useRef<Camera>();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  //const [hasPermission, setHasPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const maxWidth = 800; // Adjust maximum width
  const maxHeight = 1600; // Adjust maximum height
  const maxFileSize = 1448 * 1448; // Maximum file size in bytes (1MB)

/*   useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []); */

  const onCameraReady = () => {
    setIsCameraReady(true);
  };



/*   const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        console.log("picture source", source);
      }
    }
  }; */

/*   const checkFileSize = async (
    fileURI: string,
    maxSize = 10
  ): Promise<boolean> => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    if (!fileInfo.size) return false;
    const sizeInMb = fileInfo.size / 1024 / 1024;
    return sizeInMb < maxSize;
  }; */

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (pickerResult.canceled) return;
    else {
      console.log(pickerResult.assets[0]);
      setSelectedImage(pickerResult.assets[0]);
      console.log(selectedImage);
      //uploadImage();
    }
  };

    const launchCameraFunc = async () => {
      let permissionResult = await Camera.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert("No permission for camera");
      }
      let imageResult = await ImagePicker.launchCameraAsync({
        quality: 0.5,
        base64: true,
        allowsEditing: true,
      });
      if (imageResult.canceled) return;

      await setSelectedImage(imageResult.assets[0])
      //uploadImage();
    };
    const uploadImage = async () => {
      console.log(selectedImage?.uri);
      if (!selectedImage) return;
      setIsProcessing(true);
      //resizeImageIfNeeded(selectedImage.uri, maxWidth, maxHeight, maxFileSize);
      //const canUpload = await checkFileSize(selectedImage.uri);
      /* if (!canUpload) {
        alert("Cannot upload files larger than 2MB");
        setSelectedImage(undefined);
      } */
      const uri =
        Platform.OS === "android"
          ? selectedImage.uri
          : selectedImage.uri.replace("file://", "");
      const filename = selectedImage.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename as string);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;

      /*   const type = Platform.OS === "android"
                ? (match ? `image/${match[1]}` : '')
                : `image`;*/

      const id: string | null | undefined = auth.authState?.id;

      const formData = new FormData();
      formData.append("image", {
        uri,
        name: `image.${ext}`,
        type,
      } as any);
      formData.append("id", id as string);

      console.log(`User_Id in Img upload: ${id}`);

      try {
        //Error nur beim lokalen entwickeln
        const data = await axios.post(`${url}/images/upload`, formData, {
          headers: { "content-type": "multipart/form-data" },
        });

        if (!data) {
          alert("Image upload failed!");
          return;
        }
        console.log("Image Uploaded");
        console.log(group_id)
        if(group_id){
          navigation.navigate({
            name: addReceiptAutoName,
            params: {
              ocr_receipt: data.data.receipt,
              image_path: data.data.image_path,
              group_id: group_id
            },
            
          });
        }
        else{
          navigation.navigate({
            name: addReceiptAutoName,
            params: {
              ocr_receipt: data.data.receipt,
              image_path: data.data.image_path,
            },
          });
        }
        
      } catch (err) {
        console.log(err);
        alert(`Something went wrong ${err}`);
      } finally {
        setIsProcessing(false);
        setSelectedImage(undefined);
      }
    };

    useEffect(() => {
      if(selectedImage){
        uploadImage();
      }
  }, [selectedImage]);

  return (
    <>
      <SafeAreaView>
        <Text
          style={[
            styles.h1,
            { textAlign: "center", marginTop: 30, marginBottom: 5 },
          ]}
        >
          {t("common.add_bill")}
        </Text>
        <Text style={[styles.h3, { textAlign: "center", marginBottom: 30, width: "60%", alignSelf:"center" }]}>
          {t("common.add_bill_desc")}</Text>
        {selectedImage && isProcessing ? (
          <View style={{paddingTop: 250}}>
          <AnimatedLottieView
          source={require("../assets/animations/loading.json")}
          autoPlay
          loop
          /></View>
        ) : (
          <View
            style={{
              marginHorizontal: 30,
              height: 300,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={modalStyles.optionContainer}
                onPress={() => {
                  navigation.navigate("AddReceiptManually");
                }}
              >
                <Icon name="manuell" size={40}/>
                <CustomText style={[styles.h3, {paddingHorizontal: 20, paddingTop: 15, textAlign: "center"}]}>Enter manually</CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.optionContainer} onPress={openImagePickerAsync}>
              <Icon name="upload" size={40}/>
                <CustomText style={[styles.h3, {paddingHorizontal: 20, paddingTop: 15, textAlign: "center"}]} >
                  Upload File
                </CustomText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: "94%",
                height: 150,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                borderColor: COLORS.gray_mid,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={launchCameraFunc}
            >
              <View style={{flexDirection:"row", alignItems:"center"}}>
              <Icon name="camera" size={40}/>
              <CustomText style={[styles.h3, {paddingLeft: 15, paddingTop: 5}]}>Take a Picture</CustomText>
              </View>
              <Camera
                //ref={cameraRef}
                type={cameraType}
                //flashMode={Camera.Constants.FlashMode}
                onCameraReady={onCameraReady}
                onMountError={(error) => {
                  console.log("camera error", error);
                }}
              />
            </TouchableOpacity>
            
            
          </View>
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}
const modalStyles = StyleSheet.create({
  optionContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray_mid,
    borderWidth: 1,
    borderRadius: 10,
    height: 150,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UploadModal;
