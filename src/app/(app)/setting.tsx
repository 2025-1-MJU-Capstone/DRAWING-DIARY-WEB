import Button from "@/src/components/button";
import CustomCalender from "@/src/components/custom-calender";
import { useSession } from "@/src/stores/store/auth-context.store";
import { router } from "expo-router";
import { Text, View } from "react-native";
export default function Index() {
  const { signOut } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        theme='primary'
        label='로그아웃하기'
        backgroundColor='#B8E9C0'
        onPress={() => signOut()}
      />
      <Button
        theme='primary'
        label='Intro가기'
        backgroundColor='#FFECA5'
        onPress={() => {
          router.push("../(landing)/font-make");
        }}
      />
    </View>
  );
}
