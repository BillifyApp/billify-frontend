import React, {useState} from 'react';
import {Button, Platform, Image} from "react-native";
import {url} from "../stores/constants";
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {StatusBar} from "expo-status-bar";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {Thumbnail} from "../components/Thumbnail";
import axios from "axios";
import {useAuth} from "../context/AuthContext";

//TUT https://blog.logrocket.com/how-to-upload-images-react-native-laravel-api/#setting-up-the-laravel-image-upload-api


// @ts-ignore
function UploadScreen({navigation}) {
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImageInfo>();

    const auth = useAuth();

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

    const checkFileSize = async (
        fileURI: string,
        maxSize = 2
    ): Promise<boolean> => {
        const fileInfo = await FileSystem.getInfoAsync(fileURI);
        if (!fileInfo.size) return false;
        const sizeInMb = fileInfo.size / 1024 / 1024;
        return sizeInMb < maxSize;
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
            //Error nur beim lokalen entwickeln
            const data = await axios.post(`${url}/images/upload`, formData, {
                headers: {'content-type': 'multipart/form-data'},
            });

            if (!data) {
                alert("Image upload failed!");
                return;
            }
            console.log("Image Uploaded");

        } catch (err) {
            console.log(err);
            alert(`Something went wrong ${err}`);
        } finally {
            setSelectedImage(undefined);
        }
    };

    return (
        <>
            <CustomSafeAreaView>
                <Button title="Back" onPress={() => {
                    navigation.navigate('Home')
                }}></Button>
                {selectedImage ? (
                    <>
                        <Thumbnail uri={selectedImage.uri}/>
                        <Button onPress={uploadImage} title="Upload"/>
                    </>
                ) : (
                    <Button onPress={openImagePickerAsync} title="Pick a photo"/>
                )}
                <StatusBar style="auto"/>
            </CustomSafeAreaView>
        </>
    );
}

export default UploadScreen;