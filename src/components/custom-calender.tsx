import { StyleSheet, View } from "react-native";
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
    <View style={styles.container}>
      <Calendar
        //onMonthChange 속성 추가하기
        markedDates={markingDates}
        onDayPress={(dateData: DateDataType) => {
          selectingDay(dateData.dateString);
        }}
        firstDay={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 306,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
