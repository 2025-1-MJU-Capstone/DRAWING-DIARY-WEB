import { router } from "expo-router";
import { Button, View } from "react-native";

export default function SignUp() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={async () => router.replace("/(auth)/sign-in")}
        title='돌아가기'
      />
    </View>
  );
}
