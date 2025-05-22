import { springInstance } from "@/src/utils/axios-instance";
import { useStorageState } from "@/src/utils/secure-storage-state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface FontsPayload {
  images: File;
  fontName: string;
}

interface FontsDetail {
  id: number;
  fontName: string;
  ttfUrl: string;
  createdAt: string;
}
export interface PatchFontParams {
  fontId: number;
}

const [session] = useStorageState("session");

const fontApi = {
  createFont: (payload: FontsPayload) =>
    springInstance
      .post("/fonts", payload, {
        headers: {
          "Authorization": `Bearer ${session}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {}),
  fetchFonts: () =>
    springInstance
      .get<FontsDetail[]>("/fonts", {
        headers: {
          "Authorization": `Bearer ${session}`,
        },
      })
      .then((res) => res.data),
  deleteFont: (id: number) =>
    springInstance
      .delete(`fonts/${id}`, {
        headers: {
          "Authorization": `Bearer ${session}`,
        },
      })
      .then(() => {}),
};

export function useGetFonts() {
  return useQuery<FontsDetail[]>({
    queryKey: ["fontList"],
    queryFn: () => fontApi.fetchFonts(),
  });
}

export function useCreateFont() {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, FontsPayload>({
    mutationFn: (payload) => fontApi.createFont(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fontList"] });
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
