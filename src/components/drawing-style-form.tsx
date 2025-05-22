import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import Button from "@/src/components/button";
import { ColorOption, MoodOption } from "../business/use-drawing-style.hooks";

type Props = {
  moodOptions: MoodOption[];
  selectedMood: MoodOption["id"] | null;
  setSelectedMood: (id: MoodOption["id"]) => void;
  colorOptions: ColorOption[];
  selectedColor: ColorOption["id"] | null;
  setSelectedColor: (id: ColorOption["id"]) => void;
  note: string;
  setNote: (text: string) => void;
  isFormValid: boolean;
  handleSubmit: () => void;
  handleSkip: () => void;
};

export default function DrawingStyleForm({
  moodOptions,
  selectedMood,
  setSelectedMood,
  colorOptions,
  selectedColor,
  setSelectedColor,
  note,
  setNote,
  isFormValid,
  handleSubmit,
  handleSkip,
}: Props) {
  return (
    <>
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
            <Text
              onPress={() => setSelectedMood(opt.id)}
              style={styles.optionLabel}
            >
              {opt.label}
            </Text>
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
            <Text
              onPress={() => setSelectedColor(opt.id)}
              style={styles.optionLabel}
            >
              {opt.label}
            </Text>
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
          style={{ marginBottom: 15, opacity: isFormValid ? 1 : 0.5 }}
          onPress={handleSubmit}
        />
        <Button
          theme='primary'
          label='건너뛰기'
          backgroundColor='#D9D9D9'
          onPress={handleSkip}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
