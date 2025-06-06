import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Platform, Alert } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useGetImage } from "../stores/query/font";

export default function usePickImage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [permission, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const { data: imageData } = useGetImage();

  const pickImage = useCallback(async (): Promise<string | null> => {
    const currentPerm = permission?.granted
      ? permission
      : await requestPermission();

    if (!currentPerm.granted) {
      console.warn("Media library permission denied");
      return null;
    }

    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: false,
        quality: 1,
        aspect: [1, 1],
      });

      if (canceled || assets.length === 0) {
        return null;
      }

      const uri = assets[0].uri;
      setImageUri(uri);
      return uri;
    } catch (err) {
      console.error("ImagePicker error:", err);
      return null;
    }
  }, [permission, requestPermission]);

  const saveImage = useCallback(async (): Promise<boolean> => {
    const remoteUrl = imageData?.url;
    if (!remoteUrl) {
      Alert.alert("저장할 이미지가 없습니다.", "이미지를 불러와주세요.");
      return false;
    }

    const currentPerm = permission?.granted
      ? permission
      : await requestPermission();

    if (!currentPerm.granted) {
      Alert.alert(
        "저장 권한이 필요합니다.",
        "갤러리에 저장하려면 권한을 허용해주세요."
      );
      return false;
    }

    try {
      const fileName = remoteUrl.split("/").pop() || "downloaded_image";
      const downloadResult = await FileSystem.downloadAsync(
        remoteUrl,
        FileSystem.cacheDirectory + fileName
      );
      const uriForSave =
        Platform.OS === "android"
          ? downloadResult.uri
          : downloadResult.uri.replace("file://", "");

      await MediaLibrary.createAssetAsync(uriForSave);

      Alert.alert("저장 완료", "갤러리에 이미지가 저장되었습니다.");
      return true;
    } catch (e) {
      console.error("이미지 저장 중 오류:", e);
      Alert.alert("저장 실패", "갤러리를 저장하는 중 오류가 발생했습니다.");
      return false;
    }
  }, [imageData, permission, requestPermission]);

  const reset = () => {
    setImageUri(null);
  };

  const formDataMaker = async (uri: string, fontName: string) => {
    const uriWithoutPrefix =
      Platform.OS === "android" ? uri : uri.replace("file://", "");
    const uriParts = uriWithoutPrefix.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const response = await fetch(uriWithoutPrefix);
    const blob = await response.blob();
    const file = new File([blob], `handwriting.${fileType}`, {
      type: blob.type,
    });

    const formData = new FormData();
    formData.append("images", file);
    formData.append("fontName", fontName);

    return formData;
  };

  return { imageUri, pickImage, saveImage, reset, formDataMaker };
}
