import { springInstance } from "@/src/utils/axios-instance";
import { useStorageState } from "@/src/utils/secure-storage-state";

export interface DiaryCreateParams {
  diaryDate: string;
  title: string;
  content: string;
  fontId: number;
  feeling: string;
  color: string;
  customStyle?: string;
}

export interface DiaryListItem {
  id: number;
  diaryDate: string;
  title: string;
}

export interface DiaryDetail {
  diaryDate: string;
  title: string;
  content: string;
  imageUrl: string;
  fontId: number;
  createdAt: string;
}

export interface PatchFontParams {
  fontId: number;
}

const [session] = useStorageState("session");

export const diaryApi = {
  createDiary: async (
    params: DiaryCreateParams
  ): Promise<{ id: number; imageUrl: string; createdAt: string }> => {
    const { data } = await springInstance.post("diaries", params, {
      headers: {
        "Authorization": `Bearer ${session}`,
      },
    });
    return data;
  },

  fetchMonthlyDiaries: async (
    year: number,
    month: number
  ): Promise<DiaryListItem[]> => {
    const query = `?year=${year}&month=${String(month).padStart(2, "0")}`;
    const { data } = await springInstance.get(`diaries${query}`, {
      headers: {
        "Authorization": `Bearer ${session}`,
      },
    });
    return data;
  },

  fetchDiaryById: async (id: number): Promise<DiaryDetail> => {
    const { data } = await springInstance.get(`diaries/${id}`, {
      headers: {
        "Authorization": `Bearer ${session}`,
      },
    });
    return data;
  },

  deleteDiary: async (id: number): Promise<void> => {
    await springInstance.delete(`diaries/${id}`, {
      headers: {
        "Authorization": `Bearer ${session}`,
      },
    });
  },

  patchDiaryFont: async (
    id: number,
    params: PatchFontParams
  ): Promise<void> => {
    await springInstance.patch(`diaries/${id}/font`, params, {
      headers: {
        "Authorization": `Bearer ${session}`,
      },
    });
  },
};
