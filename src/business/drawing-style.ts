import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DrawingStyleProps {
  feeling: "realistic" | "cinematic" | "storybook";
  color: "crayon" | "paint" | "pencil";
  customStyle: string;
}

export async function saveDrawingStyle(
  object: DrawingStyleProps
): Promise<void> {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem("styleObject", jsonValue);
  } catch (error) {
    console.error("Failed to save drawing style:", error);
  }
}

export async function getDrawingStyle(): Promise<
  DrawingStyleProps | undefined
> {
  try {
    const jsonValue = await AsyncStorage.getItem("styleObject");
    if (jsonValue) {
      return JSON.parse(jsonValue) as DrawingStyleProps;
    }
  } catch (error) {
    console.error("Failed to load drawing style:", error);
  }
  return undefined;
}
