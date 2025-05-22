import { useState, useCallback, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type MoodOption = {
  id: "realistic" | "cinematic" | "storybook";
  label: string;
};

export type ColorOption = {
  id: "crayon" | "paint" | "pencil";
  label: string;
};

interface StyleOption {
  moodId: MoodOption["id"];
  colorId: ColorOption["id"];
  customStyle: string;
}

export function useDrawingStyle() {
  const moodOptions: MoodOption[] = [
    { id: "realistic", label: "실제사진같은 현실적인 분위기" },
    { id: "cinematic", label: "영화같은 격동적인 분위기" },
    { id: "storybook", label: "동화처럼 아기자기한 분위기" },
  ];

  const colorOptions: ColorOption[] = [
    { id: "crayon", label: "색연필과 크레파스로 그린 그림" },
    { id: "paint", label: "물감으로 그린 그림" },
    { id: "pencil", label: "연필로 선만 딴 그림" },
  ];

  const [selectedMood, setSelectedMood] = useState<MoodOption["id"] | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<ColorOption["id"] | null>(
    null
  );
  const [note, setNote] = useState("");
  const router = useRouter();

  const getData = async (): Promise<StyleOption | null> => {
    try {
      const raw = await AsyncStorage.getItem("style");
      return raw ? (JSON.parse(raw) as StyleOption) : null;
    } catch (e) {
      console.error("getData error:", e);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getData();
      if (data) {
        setSelectedMood(data.moodId);
        setSelectedColor(data.colorId);
        setNote(data.customStyle);
      }
    })();
  }, []);

  const isFormValid = selectedMood !== null && selectedColor !== null;

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) return;
    const value: StyleOption = {
      moodId: selectedMood!,
      colorId: selectedColor!,
      customStyle: note,
    };
    try {
      await AsyncStorage.setItem("style", JSON.stringify(value));
    } catch (e) {
      console.error("handleSubmit error:", e);
    } finally {
      router.push("/(app)/home");
    }
  }, [isFormValid, selectedMood, selectedColor, note, router]);

  const handleSkip = useCallback(() => {
    router.push("/(app)/home");
  }, [router]);

  return {
    moodOptions,
    selectedMood,
    setSelectedMood,
    colorOptions,
    selectedColor,
    setSelectedColor,
    note,
    setNote,
    isFormValid,
    handleSubmit,
    handleSkip,
  };
}
