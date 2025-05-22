import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SessionProvider } from "../stores/store/auth-context.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <Slot />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SessionProvider>
  );
}
