import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import useCalendar from "../business/use-calender.hooks";
interface DateDataType {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

export default function CustomCalender() {
  const { markingDates, selectingDay } = useCalendar();

  return (
    <Calendar
      //onMonthChange 속성 추가하기
      markedDates={markingDates}
      onDayPress={(dateData: DateDataType) => {
        selectingDay(dateData.dateString);
      }}
      style={styles.container}
      firstDay={1}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 306,
    height: 150,
  },
});
