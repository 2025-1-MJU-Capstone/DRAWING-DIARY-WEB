import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "@/src/components/button";

export default function WriteDiary() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>일기쓰기</Text>

      <ScrollView
        contentContainerStyle={styles.textInputContainer}
        keyboardShouldPersistTaps='handled'
      >
        <TextInput
          style={styles.inputTitle}
          placeholder='제목을 입력하세요'
          placeholderTextColor='#999'
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.inputContent}
          placeholder='내용을 입력하세요'
          placeholderTextColor='#999'
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical='top'
        />

        {/* 버튼을 가운데 정렬하는 래퍼 */}
        <View style={styles.buttonContainer}>
          <Button theme='primary' label='제출하기' backgroundColor='#FFECA5' />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 30,
    backgroundColor: "#FFFDF8",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  textInputContainer: {
    flexGrow: 1,
  },
  inputTitle: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    fontFamily: "Pretendard",
  },
  inputContent: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard",
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
});
