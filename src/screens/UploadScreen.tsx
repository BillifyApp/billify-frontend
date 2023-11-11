import React, {useEffect, useRef, useState} from 'react';
import {Button, Platform, Text, TouchableOpacity} from "react-native";
import {url} from "../stores/constants";
import {Camera} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {StatusBar} from "expo-status-bar";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {Thumbnail} from "../components/Thumbnail";
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import {useTranslation} from "react-i18next";
import {addReceiptAutoName, homeName, homeNavName} from "../stores/route_names";

//TUT https://blog.logrocket.com/how-to-upload-images-react-native-laravel-api/#setting-up-the-laravel-image-upload-api


// @ts-ignore
function UploadScreen({navigation}) {
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImageInfo>();
    const {t} = useTranslation();
    const auth = useAuth();

    const cameraRef = useRef<Camera>();
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = {quality: 0.5, base64: true, skipProcessing: true};
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                await cameraRef.current.pausePreview();
                console.log("picture source", source);
            }
        }
    }

    const checkFileSize = async (fileURI: string, maxSize = 10): Promise<boolean> => {
        const fileInfo = await FileSystem.getInfoAsync(fileURI);
        if (!fileInfo.size) return false;
        const sizeInMb = fileInfo.size / 1024 / 1024;
        return sizeInMb < maxSize;
    };

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
        });
        if (pickerResult.canceled) return;
        setSelectedImage(pickerResult.assets[0]);
    };

    const launchCameraFunc = async () => {
        let permissionResult = await Camera.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert('No permission for camera')
        }
        let imageResult = await ImagePicker.launchCameraAsync({
            quality: 1,
            base64: true,

        })
        if (imageResult.canceled) return;
        setSelectedImage(imageResult.assets[0])
    };

    const uploadImage = async () => {
        if (!selectedImage) return;
        const canUpload = await checkFileSize(selectedImage.uri);
        if (!canUpload) {
            alert("Cannot upload files larger than 2MB");
            setSelectedImage(undefined);
            return;
        }
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
        formData.append('id', id as string);

        console.log(`User_Id in Img upload: ${id}`)

        try {
            setIsProcessing(true)
            //Error nur beim lokalen entwickeln
            const data = await axios.post(`${url}/images/upload`, formData, {
                    headers: {'content-type': 'multipart/form-data'},
                }
            )

            if (!data) {
                alert("Image upload failed!");
                return;
            }
            console.log("Image Uploaded");

            navigation.navigate({
                name: addReceiptAutoName,
                params:
                    {
                        ocr_receipt: data.data.receipt,
                        image_path: data.data.image_path
                    },
            })

        } catch (err) {
            console.log(err);
            alert(`Something went wrong ${err}`);
        } finally {
            setIsProcessing(false);
            setSelectedImage(undefined);
        }
    };

    return (
        <>
            <CustomSafeAreaView>
                <Button title="<" onPress={() => {
                    navigation.navigate(homeNavName)
                }}></Button>
                <Text>{t('common.add_bill')}</Text>
                <Button title="manuell" onPress={() => {
                    navigation.navigate(homeName)
                }}></Button>

                {selectedImage ? (
                    <>
                        <Thumbnail uri={selectedImage.uri}/>
                        {!isProcessing ? <Button onPress={uploadImage} title="Upload"/> : <StatusBar/>}

                    </>
                ) : (
                    <Button onPress={openImagePickerAsync} title="Pick a photo"/>
                )}
                <TouchableOpacity
                    onPress={launchCameraFunc}>
                    <Text>Directly Launch Camera</Text>

                    <Camera
                        ref={cameraRef}
                        type={cameraType}
                        //flashMode={Camera.Constants.FlashMode}
                        onCameraReady={onCameraReady}
                        onMountError={(error) => {
                            console.log("camera error", error);
                        }}
                    />
                </TouchableOpacity>
                <StatusBar style="auto"/>

            </CustomSafeAreaView>
        </>
    );
}

export default UploadScreen;