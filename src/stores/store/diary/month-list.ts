import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface DiaryEntry {
  id: number;
  diaryDate: string;
  title: string;
}

interface MonthDiaryListState {
  diaryList: DiaryEntry[];
  selectedDiary?: DiaryEntry;
}

interface MonthDiaryListAction {
  setDiaryList: (list: DiaryEntry[]) => void;
  setSelectedDiary: (entry?: DiaryEntry) => void;
}

export const useMonthDiaryStore = create<
  MonthDiaryListState & MonthDiaryListAction
>()(
  combine<MonthDiaryListState, MonthDiaryListAction>(
    {
      diaryList: [],
      selectedDiary: undefined,
    },
    (set) => ({
      setDiaryList: (diaryList) => set({ diaryList }),
      setSelectedDiary: (entry) => set({ selectedDiary: entry }),
    })
  )
);
