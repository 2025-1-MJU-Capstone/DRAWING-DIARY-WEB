import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { springInstance } from "@/src/utils/axios-instance";
import {
  DiaryEntry,
  useMonthDiaryStore,
} from "../store/diary/month-list.store";

export interface CreateDiaryPayload {
  diaryDate: string;
  title: string;
  content: string;
  fontId: number;
  feeling: string;
  color: string;
  customStyle: string;
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

const diaryApi = {
  createDiary: (payload: CreateDiaryPayload) =>
    springInstance
      .post<CreatedDiaryResponse>("/api/diaries", payload)
      .then((res) => res.data),

  getDiariesByMonth: (year: number, month: number) =>
    springInstance
      .get<DiaryEntry[]>(
        `/api/diaries?year=${year}&month=${String(month).padStart(2, "0")}`
      )
      .then((res) => res.data),

  getDiaryDetail: (id: number) =>
    springInstance
      .get<DiaryDetail>(`/api/diaries/${id}`)
      .then((res) => res.data),

  deleteDiary: (id: number) =>
    springInstance.delete(`/api/diaries/${id}`).then(() => {}),

  updateDiaryFont: (id: number, fontId: number) =>
    springInstance.patch(`/api/diaries/${id}/font`, { fontId }).then(() => {}),
};

const { setDiaryList } = useMonthDiaryStore();
export function useGetDiariesByMonth(year: number, month: number) {
  return useQuery({
    queryKey: ["diariesByMonth", year, month],
    queryFn: () => diaryApi.getDiariesByMonth(year, month),
    staleTime: 1000,
    select: (data) => setDiaryList(data),
  });
}

export function useGetDiaryDetail(id: number) {
  return useQuery<DiaryDetail>({
    queryKey: ["diaryDetail", id],
    queryFn: () => diaryApi.getDiaryDetail(id),
  });
}

export function useCreateDiary() {
  const queryClient = useQueryClient();
  return useMutation<CreatedDiaryResponse, unknown, CreateDiaryPayload>({
    mutationFn: (payload) => diaryApi.createDiary(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diariesByMonth"] });
    },
  });
}

export function useDeleteDiary() {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, number>({
    mutationFn: (id) => diaryApi.deleteDiary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diariesByMonth"] });
    },
  });
}

export function useUpdateDiaryFont() {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, { id: number; fontId: number }>({
    mutationFn: ({ id, fontId }) => diaryApi.updateDiaryFont(id, fontId),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["diaryDetail", id] });
    },
  });
}
