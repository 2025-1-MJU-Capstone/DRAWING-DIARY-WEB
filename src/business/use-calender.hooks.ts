import { useEffect, useMemo, useCallback } from "react";
import { useMonthDiaryStore } from "../stores/store/diary/month-list.store";
import { useGetDiariesByMonth } from "../stores/query/diary";

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
  const { diaryList, setSelectedDiary, setDiaryList } = useMonthDiaryStore();
  const { data = [], isLoading } = useGetDiariesByMonth(year, month);

  useEffect(() => {
    if (!isLoading) {
      setDiaryList(data);
    }
  }, [isLoading, data, setDiaryList]);

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

  return { markingDates, selectingDay };
}
