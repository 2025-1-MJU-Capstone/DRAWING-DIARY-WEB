import { useCallback, useMemo } from "react";
import { useGetDiariesByMonth } from "@/src/stores/query/diary";
import { useMonthDiaryStore } from "@/src/stores/store/diary/month-list.store";

type Marking = {
  marked: boolean;
  dotColor: "red" | "green" | "blue" | "yellow";
};

export default function useCalendar({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const { diaryList, setSelectedDiary } = useMonthDiaryStore();

  const { isLoading, error } = useGetDiariesByMonth(year, month);

  const markingDates = useMemo<Record<string, Marking>>(
    () =>
      diaryList.reduce((acc, { diaryDate }) => {
        acc[diaryDate] = { marked: true, dotColor: "green" };
        return acc;
      }, {} as Record<string, Marking>),
    [diaryList]
  );

  const selectingDay = useCallback(
    (selectedDate: string) => {
      const diary = diaryList.find((d) => d.diaryDate === selectedDate);
      setSelectedDiary(diary);
    },
    [diaryList, setSelectedDiary]
  );

  return { markingDates, selectingDay, isLoading, error };
}
