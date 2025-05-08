import { Text } from "react-native";
import { Redirect, Stack, Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSession } from "@/src/stores/store/auth-context";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href='../(auth)/sign-in' />;
  }

  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name='view-diary'
        options={{
          tabBarLabel: "일기보기",
          tabBarIcon: ({ color, size }) => (
            <Entypo name='book' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='write-diary'
        options={{
          tabBarLabel: "일기쓰기",
          tabBarIcon: ({ color, size }) => (
            <Entypo name='pencil' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='home'
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ color, size }) => (
            <Entypo name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          tabBarLabel: "세팅",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
