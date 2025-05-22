import { useSession } from "../stores/store/auth-context.store";
import { Text } from "react-native";
import { Redirect } from "expo-router";
export default function Index() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href='../(auth)/sign-in' />;
  }
  return <Redirect href='../(app)/home' />;
}
