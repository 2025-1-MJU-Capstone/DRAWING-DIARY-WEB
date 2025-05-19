import { springInstance } from "@/src/utils/axios-instance";

// Request & Response Interfaces
export interface CreateDiaryPayload {
  diaryDate: string;
  title: string;
  content: string;
  fontId: number;
  feeling: string;
  color: string;
  customStyle: string;
}

export interface DiaryItem {
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

export interface CreatedDiaryResponse {
  id: number;
  imageUrl: string;
  createdAt: string;
}

export const diaryApi = {
  // 일기 생성 + 이미지 생성
  createDiary: async (
    payload: CreateDiaryPayload
  ): Promise<CreatedDiaryResponse> => {
    const { data } = await springInstance.post<CreatedDiaryResponse>(
      "/api/diaries",
      payload
    );
    return data;
  },

  // 월별 일기 목록 조회
  getDiariesByMonth: async (
    year: number,
    month: number
  ): Promise<DiaryItem[]> => {
    const { data } = await springInstance.get<DiaryItem[]>(
      `/api/diaries?year=${year}&month=${String(month).padStart(2, "0")}`
    );
    return data;
  },

  // 특정 일기 상세 조회
  getDiaryDetail: async (id: number): Promise<DiaryDetail> => {
    const { data } = await springInstance.get<DiaryDetail>(
      `/api/diaries/${id}`
    );
    return data;
  },

  // 특정 일기 삭제
  deleteDiary: async (id: number): Promise<void> => {
    await springInstance.delete(`/api/diaries/${id}`);
  },

  // 일기 폰트 변경
  updateDiaryFont: async (id: number, fontId: number): Promise<void> => {
    await springInstance.patch(`/api/diaries/${id}/font`, { fontId });
  },
};
