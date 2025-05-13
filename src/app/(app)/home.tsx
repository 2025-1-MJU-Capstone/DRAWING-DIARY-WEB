import Button from "@/src/components/button";
import CustomCalender from "@/src/components/custom-calender";
import { useSession } from "@/src/stores/store/auth-context";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <CustomCalender />
      <Button
        theme='primary'
        label='일기쓰러가기'
        backgroundColor='#FFECA5'
        onPress={() => {
          router.push("/(app)/write-diary");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
