import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";

export default function usePickImage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [permission, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const pickImage = useCallback(async (): Promise<string | null> => {
    const { granted } = permission?.granted
      ? permission
      : await requestPermission();
    if (!granted) {
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

  const reset = () => {
    setImageUri(null);
  };

  return { imageUri, pickImage, reset };
}
