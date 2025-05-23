import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import useCalendar from "../business/use-calender.hooks";
import { useState } from "react";
interface DateDataType {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

export default function CustomCalender() {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const { markingDates, selectingDay } = useCalendar({
    month: month,
    year: year,
  });

  return (
    <View style={styles.container}>
      <Calendar
        onMonthChange={(dateData: DateDataType) => {
          setYear(dateData.year);
          setMonth(dateData.month);
        }}
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
