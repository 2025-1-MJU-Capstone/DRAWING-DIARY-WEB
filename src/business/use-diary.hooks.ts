import { useState, useEffect } from "react";
import { FontsDetail, useGetFonts } from "../stores/query/font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { fileDownload } from "../utils/expo-file-system";

const readLocalFonts = async (): Promise<FontsDetail[]> => {
  const json = await AsyncStorage.getItem("fonts");
  return json ? (JSON.parse(json) as FontsDetail[]) : [];
};

const storeFonts = async (value: FontsDetail[]) => {
  try {
    await AsyncStorage.setItem("fonts", JSON.stringify(value));
  } catch (e) {
    console.error("AsyncStorage 저장 실패:", e);
  }
};

const notDownloadedFonts = (
  serverData: FontsDetail[],
  localData: FontsDetail[]
): FontsDetail[] =>
  serverData.filter((s) => !localData.some((l) => l.fontName === s.fontName));

const registerFonts = async (fonts: FontsDetail[]) => {
  try {
    const entries = await Promise.all(
      fonts.map(async (f) => {
        const uri = await fileDownload(f.ttfUrl, f.fontName);
        return uri ? { [f.fontName]: uri } : null;
      })
    );
    const valid = entries.filter((e): e is Record<string, string> => !!e);
    await Font.loadAsync(Object.assign({}, ...valid));
  } catch (e) {
    console.error("폰트 등록 실패:", e);
  }
};

export default function useDiary() {
  const { data: serverFonts, isLoading: fetching, error } = useGetFonts();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (fetching || !serverFonts) return;

    (async () => {
      const localFonts = await readLocalFonts();

      const toDownload = notDownloadedFonts(serverFonts, localFonts);

      if (toDownload.length > 0) {
        await registerFonts(toDownload);
        await storeFonts([...localFonts, ...toDownload]);
      }

      setInitializing(false);
    })();
  }, [serverFonts, fetching]);

  return {
    serverFonts,
    loading: fetching || initializing,
    error,
  };
}
