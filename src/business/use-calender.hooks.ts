import { useCallback, useMemo } from "react";
import {
  DiaryEntry,
  useMonthDiaryStore,
} from "../stores/store/diary/month-list";

type Marking = {
  marked: boolean;
  dotColor: "red" | "green" | "blue" | "yellow";
};
export default function useCalendar() {
  const { diaryList, setSelectedDiary } = useMonthDiaryStore();

  const markingDates = useMemo<Record<string, Marking>>(() => {
    return diaryList.reduce((acc, { diaryDate }) => {
      acc[diaryDate] = { marked: true, dotColor: "green" };
      return acc;
    }, {} as Record<string, Marking>);
  }, [diaryList]);

  const selectingDay = useCallback(
    (selectedDate: string): void => {
      const element = diaryList.find(
        (value) => value.diaryDate === selectedDate
      );
      setSelectedDiary(element);
    },
    [diaryList]
  );

  // 초기렌더링시 그림일기 월별조회 쿼리문 날리고 그 이후 markingDates 진행하는 useEffect 훅 추가하기
  return { markingDates, selectingDay };
}
