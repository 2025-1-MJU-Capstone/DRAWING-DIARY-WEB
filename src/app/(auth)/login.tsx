import Button from "@/src/components/button";
import { useSession } from "@/src/stores/store/auth-context.store";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View, StyleSheet, SafeAreaView } from "react-native";

export default function Login() {
  const { signIn } = useSession();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    await signIn({ loginId: id, password: password });
    router.replace("/(app)/home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>아이디</Text>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
            placeholder='아이디를 입력하세요'
            placeholderTextColor='#999'
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder='비밀번호를 입력하세요'
            placeholderTextColor='#999'
          />
        </View>
      </View>

      <View>
        <Button
          theme='primary'
          backgroundColor='#FFD6E0'
          label='로그인하기'
          onPress={handleLogin}
          style={{ marginVertical: 5 }}
        />
        <Button
          onPress={async () => router.replace("/(auth)/sign-in")}
          theme='primary'
          label='뒤로가기'
          style={{ marginVertical: 5 }}
          backgroundColor='#D9D9D9'
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#333",
  },
  form: {
    width: "100%",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  button: {
    width: "100%",
  },
});
