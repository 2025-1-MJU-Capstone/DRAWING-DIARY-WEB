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
  const [extraInfo, setExtraInfo] = useState<string>("");

  const canSubmit = title.trim().length > 3 && content.trim().length > 20;

  const handleSubmit = () => {
    if (!canSubmit) return;
    console.log({ title, content, extraInfo });
  };

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

        <View style={styles.divider} />

        <TextInput
          style={styles.inputExtra}
          placeholder='그림에 참고할만한 추가적인 정보가 있나요? 있다면 작성해주세요!'
          placeholderTextColor='#999'
          value={extraInfo}
          onChangeText={setExtraInfo}
          multiline={false}
          returnKeyType='done'
        />

        <View style={styles.buttonContainer}>
          <Button
            theme='primary'
            label='제출하기'
            backgroundColor={canSubmit ? "#FFECA5" : "#E0E0E0"}
            onPress={canSubmit ? handleSubmit : undefined}
          />
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
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  inputExtra: {
    width: "100%",
    height: 40, // 한 줄 높이
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard",
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
});
