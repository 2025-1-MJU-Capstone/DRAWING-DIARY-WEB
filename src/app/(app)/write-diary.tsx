import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Button from "@/src/components/button";
import { useDrawingStyle } from "@/src/business/use-drawing-style.hooks";
import { CreateDiaryPayload, useCreateDiary } from "@/src/stores/query/diary";
import { router } from "expo-router";
import useDiary from "@/src/business/use-diary.hooks";
import { AxiosError } from "axios";

const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

export default function WriteDiary() {
  const {
    selectedMood: mood,
    selectedColor: color,
    note: customStyle,
  } = useDrawingStyle();

  const { serverFonts = [], loading, error } = useDiary();

  useEffect(() => {
    if (!loading && serverFonts.length === 0) {
      router.push("../(landing)/font-make");
    }
  }, [loading, serverFonts]);

  const createDiary = useCreateDiary();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [fontId, setFontId] = useState<number | null>(
    serverFonts.length > 0 ? serverFonts[0].id : null
  );
  const [date, setDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit =
    title.trim().length > 3 && content.trim().length > 20 && fontId !== null;

  const toggleDatePicker = useCallback(() => {
    setDatePickerVisible((prev) => !prev);
  }, []);

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, selected?: Date) => {
      const current = selected ?? date;
      setDatePickerVisible(Platform.OS === "ios");
      if (event.type === "set") {
        setDate(current);
      }
    },
    [date]
  );

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    setIsLoading(true);

    const payload: CreateDiaryPayload = {
      diaryDate: date.toISOString().split("T")[0],
      title,
      content,
      fontId: fontId!,
      feeling: mood || "cinematic",
      color: color || "crayon",
      customStyle: `${customStyle} ${extraInfo}`,
    };

    createDiary.mutate(payload, {
      onSuccess: () => {
        setIsLoading(false);
        router.push("./home");
      },
      onError: (err) => {
        const axiosErr = err as AxiosError;
        console.error("일기 작성 실패:", axiosErr.message);
      },
    });
  }, [
    canSubmit,
    date,
    title,
    content,
    fontId,
    mood,
    color,
    customStyle,
    extraInfo,
    createDiary,
  ]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>로딩 중…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>오류가 발생했습니다.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.title}>일기 쓰기</Text>

        <FormField label='날짜 선택하기'>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={toggleDatePicker}
          >
            <Text style={styles.dateText}>
              {date.toLocaleDateString("ko-KR")}
            </Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={date}
              mode='date'
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}
        </FormField>

        <FormField label='제목'>
          <TextInput
            style={styles.inputTitle}
            placeholder='제목을 입력하세요'
            placeholderTextColor='#999'
            value={title}
            onChangeText={setTitle}
          />
        </FormField>

        <FormField label='내용'>
          <TextInput
            style={styles.inputContent}
            placeholder='내용을 입력하세요'
            placeholderTextColor='#999'
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={3}
            textAlignVertical='top'
          />
        </FormField>

        <FormField label='폰트 선택하기'>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={fontId}
              onValueChange={(value) => setFontId(value)}
              style={Platform.OS === "ios" ? styles.pickerIOS : styles.picker}
              itemStyle={Platform.OS === "ios" ? { height: 120 } : undefined}
              dropdownIconColor='#000'
            >
              {serverFonts.map((font) => (
                <Picker.Item
                  key={font.id}
                  label={font.fontName}
                  value={font.id}
                />
              ))}
            </Picker>
          </View>
        </FormField>

        <FormField label='추가 정보'>
          <TextInput
            style={styles.inputExtra}
            placeholder='추가 정보가 있나요?'
            placeholderTextColor='#999'
            value={extraInfo}
            onChangeText={setExtraInfo}
            returnKeyType='done'
          />
        </FormField>

        <View style={styles.buttonContainer}>
          <Button
            theme='primary'
            backgroundColor={canSubmit ? "#FFECA5" : "#E0E0E0"}
            label={isLoading ? "로딩중,,," : "제출하기"}
            onPress={handleSubmit}
            disabled={!canSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFDF8" },
  contentContainer: { paddingHorizontal: 30, paddingVertical: 70 },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  fieldContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 8 },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  dateText: { fontSize: 16 },
  inputTitle: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard",
  },
  inputContent: {
    flex: 1,
    minHeight: 160,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  picker: { width: "100%", height: 44 },
  pickerIOS: { width: "100%", height: 120 },
  inputExtra: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontFamily: "Pretendard",
  },
  buttonContainer: { marginTop: 20, alignItems: "center" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
