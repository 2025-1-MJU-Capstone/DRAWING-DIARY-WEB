import * as FileSystem from "expo-file-system";

export const fileDownload = async (serverUri: string, name: string) => {
  try {
    const result = await FileSystem.downloadAsync(
      serverUri,
      FileSystem.documentDirectory + name
    );
    return result.uri;
  } catch (error) {
    console.error("파일 다운로드에 실패하였습니다: ", error);
    return null;
  }
};
