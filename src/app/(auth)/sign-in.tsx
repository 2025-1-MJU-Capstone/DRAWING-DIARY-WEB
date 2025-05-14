import { router, useRouter } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "@/src/components/button";

export default function SignIn() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require("@/assets/images/logo.png")}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={async () => router.push("/(auth)/login")}
          theme='primary'
          label='이메일로그인'
          backgroundColor='#FFD6E0'
          style={{ marginVertical: 5 }}
        />

        <Button
          onPress={async () => router.replace("/(auth)/sign-up")}
          theme='primary'
          label='회원가입'
          backgroundColor='#D9D9D9'
          style={{ marginVertical: 5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    paddingVertical: 100,
    marginTop: 30,
  },
  logoImage: {
    width: 269,
    height: 106,
  },
  buttonContainer: {
    display: "flex",
    padding: 5,
  },
});
