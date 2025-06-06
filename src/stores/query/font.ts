import { springInstance } from "@/src/utils/axios-instance";
import { useStorageState } from "@/src/utils/secure-storage-state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface FontsDetail {
  id: number;
  fontName: string;
  ttfUrl: string;
  createdAt: string;
}
export interface PatchFontParams {
  fontId: number;
}
interface fontImage {
  url: string;
}

const fontApi = {
  createFont: (payload: FormData) =>
    springInstance
      .post("fonts", payload)
      .then(() => {})
      .catch((e) => console.log(e.message)),

  fetchFonts: () =>
    springInstance.get<FontsDetail[]>("fonts").then((res) => res.data),
  deleteFont: (id: number) =>
    springInstance.delete(`fonts/${id}`).then(() => {}),

  getImage: () =>
    springInstance.get<fontImage>("fonts/image").then((res) => res.data),
};

export function useGetFonts() {
  return useQuery<FontsDetail[]>({
    queryKey: ["fontList"],
    queryFn: () => fontApi.fetchFonts(),
  });
}

export function useCreateFont() {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, FormData>({
    mutationFn: (payload) => fontApi.createFont(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fontList"] });
    },
    onError: (error) => {
      console.log("Error 객체:", error);
    },
  });
}

export function useDeleteFont() {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, number>({
    mutationFn: (id) => fontApi.deleteFont(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fontList"] });
    },
  });
}

export function useGetImage() {
  return useQuery<fontImage>({
    queryKey: ["fontImage"],
    queryFn: () => fontApi.getImage(),
  });
}
