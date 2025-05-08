import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SessionProvider } from "../stores/store/auth-context";

export default function RootLayout() {
  return (
    <SessionProvider>
      <GestureHandlerRootView>
        <Slot />
      </GestureHandlerRootView>
    </SessionProvider>
  );
}
