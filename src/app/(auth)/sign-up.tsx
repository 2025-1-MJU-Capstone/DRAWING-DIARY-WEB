// src/app/(auth)/sign-up.tsx
import Button from "@/src/components/button";
import { authApi } from "@/src/stores/query/auth";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View, StyleSheet, SafeAreaView } from "react-native";

export default function SignUp() {
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleSignUp = async () => {
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일을 입력해주세요");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirm) {
      setConfirmError("비밀번호가 일치하지 않습니다");
      valid = false;
    } else {
      setConfirmError("");
    }

    if (!valid) return;
    console.log({
      loginId: loginId,
      email: email,
      password: password,
    });
    await authApi
      .signup({
        loginId: loginId,
        email: email,
        password: password,
      })
      .catch((e) => console.log(e))
      .then(() => router.replace("/(auth)/sign-in"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>아이디</Text>
          <TextInput
            style={styles.input}
            value={loginId}
            onChangeText={setLoginId}
            placeholder='아이디를 입력하세요'
            placeholderTextColor='#999'
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder='예: example@mail.com'
            keyboardType='email-address'
            autoCapitalize='none'
            placeholderTextColor='#999'
          />
          {emailError !== "" && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder='비밀번호를 입력하세요'
            placeholderTextColor='#999'
          />
          {passwordError !== "" && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            placeholder='한 번 더 입력하세요'
            placeholderTextColor='#999'
          />
          {confirmError !== "" && (
            <Text style={styles.errorText}>{confirmError}</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Button
          theme='primary'
          backgroundColor='#A1C9F1'
          label='회원가입하기'
          onPress={handleSignUp}
          style={{ marginVertical: 5 }}
        />
        <Button
          theme='primary'
          backgroundColor='#D9D9D9'
          label='뒤로가기'
          onPress={() => router.replace("/(auth)/sign-in")}
          style={{ marginVertical: 5 }}
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
  },
});
