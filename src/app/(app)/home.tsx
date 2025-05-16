import Button from "@/src/components/button";
import CustomCalender from "@/src/components/custom-calender";
import { useMonthDiaryStore } from "@/src/stores/store/diary/month-list";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { selectedDiary } = useMonthDiaryStore();

  return (
    <View style={styles.container}>
      <CustomCalender />

      <View style={styles.diaryInfoContainer}>
        {selectedDiary ? (
          <>
            <Text
              style={styles.diaryTitle}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {selectedDiary.title}
            </Text>
            <Button
              theme='secondary'
              label='일기보기'
              backgroundColor='#B8E9C0'
              onPress={() => router.push(`/(diary)/${selectedDiary.id}`)}
            />
          </>
        ) : (
          <View style={styles.emptyPlaceholder} />
        )}
      </View>

      <View style={styles.writeButtonContainer}>
        <Button
          theme='primary'
          label='일기쓰러가기'
          backgroundColor='#FFECA5'
          onPress={() => router.push("/(app)/write-diary")}
        />
      </View>
    </View>
  );
}

const CAL_WIDTH = 306;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
  },
  diaryInfoContainer: {
    width: CAL_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  diaryTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
  },
  emptyPlaceholder: {
    height: 40,
  },
  writeButtonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
});
