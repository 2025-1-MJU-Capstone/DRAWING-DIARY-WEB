import { router, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useSession } from "../../stores/store/auth-context";

export default function SignIn() {
  const { signIn } = useSession();
  const router = useRouter();
  const handleLogin = async () => {
    await signIn();
    router.replace("/(app)/home");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={handleLogin}>Sign In</Text>
    </View>
  );
}
