import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import Button from "@/src/components/button";
import { router } from "expo-router";

export default function DrawingStyle() {
  const [selectedMood, setSelectedMood] = useState<
    "realistic" | "cinematic" | "storybook" | null
  >(null);
  const moodOptions: {
    id: "realistic" | "cinematic" | "storybook";
    label: string;
  }[] = [
    { id: "realistic", label: "실제사진같은 현실적인 분위기" },
    { id: "cinematic", label: "영화같은 격동적인 분위기" },
    { id: "storybook", label: "동화처럼 아기자기한 분위기" },
  ];

  const [selectedColor, setSelectedColor] = useState<
    "crayon" | "paint" | "pencil" | null
  >(null);
  const colorOptions: { id: "crayon" | "paint" | "pencil"; label: string }[] = [
    { id: "crayon", label: "색연필과 크레파스로 그린 그림" },
    { id: "paint", label: "물감으로 그린 그림" },
    { id: "pencil", label: "연필로 선만 딴 그림" },
  ];

  const [note, setNote] = useState("");

  const isFormValid = selectedMood !== null && selectedColor !== null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>기초 그림스타일 만들기</Text>

        <View style={styles.article}>
          <Text>그림 일기의 그림을 위한 선호 조사를 할께요!</Text>
          <Text>해당 설문은 단순히 기초 스타일을 조사하기 위함이니</Text>
          <Text>편하게 작성해주세요!!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>어떤 그림느낌을 좋아하세요?</Text>
          {moodOptions.map((opt) => (
            <View key={opt.id} style={styles.optionRow}>
              <Checkbox
                style={styles.checkbox}
                value={selectedMood === opt.id}
                onValueChange={() => setSelectedMood(opt.id)}
              />
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>어떤 색감 느낌을 좋아하세요?</Text>
          {colorOptions.map((opt) => (
            <View key={opt.id} style={styles.optionRow}>
              <Checkbox
                style={styles.checkbox}
                value={selectedColor === opt.id}
                onValueChange={() => setSelectedColor(opt.id)}
              />
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            추가적으로 참고했으면 하는 내용을 말해주세요!
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder='희망하는 내용을 말해주세요!'
            value={note}
            onChangeText={setNote}
            multiline
          />
        </View>

        <View>
          <Button
            theme='primary'
            label='제출하기'
            backgroundColor='#FFECA5'
            disabled={!isFormValid}
            style={{
              marginBottom: 15,
              opacity: isFormValid ? 1 : 0.5,
            }}
            onPress={() => {
              if (isFormValid) {
                router.push("/(app)/home");
              }
            }}
          />
          <Button
            theme='primary'
            label='건너뛰기'
            backgroundColor='#D9D9D9'
            onPress={() => router.push("/(app)/home")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    marginHorizontal: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard",
  },
  inner: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  article: {
    width: "100%",
    padding: 21,
    backgroundColor: "#B8E9C0",
    borderRadius: 12,
    marginBottom: 30,
  },
  section: {
    width: "100%",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
    color: "#222222",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  optionLabel: {
    fontSize: 16,
    color: "#333333",
  },
  textInput: {
    width: "100%",
    minHeight: 80,
    padding: 12,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    fontSize: 16,
    color: "#333333",
  },
});
