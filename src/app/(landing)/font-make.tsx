// src/app/(landing)/font-make.tsx
import usePickImage from "@/src/business/use-pick-image.hooks";
import Button from "@/src/components/button";
import { router } from "expo-router";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";

export default function FontMake() {
  const { imageUri, pickImage, reset } = usePickImage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>손글씨 만들기</Text>

      <View style={styles.article}>
        <Text>손글씨를 폰트로 만들어드릴께요!</Text>
        <Text>아래 글자를 종이에 찍어서 업로드해주세요!</Text>
        <Text></Text>
        <Text>안 / 녕 / 하 / 세 / 요 / 만 / 나 / 서 / 반 / 가 / 워 / 요</Text>
        <Text></Text>
        <Text>저 / 희 / 는 / 손 / 글 / 씨 / 일 / 기 / 앱 / 이 / 에 / 요</Text>
        <Text></Text>
        <Text>저 / 희 / 서 / 비 / 스 / 잘 / 사 / 용 / 해 / 주 / 세 / 요</Text>
      </View>

      <View>
        {imageUri == null ? (
          <View>
            <Pressable onPress={pickImage} style={styles.imagePreview}>
              <Text>사진 미리보기</Text>
            </Pressable>
            <Button
              onPress={pickImage}
              theme='primary'
              label='사진 업로드'
              backgroundColor='#FFECA5'
            />
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: imageUri }}
              style={styles.imagePreview}
              resizeMode='contain'
            />
            <Button
              onPress={pickImage}
              theme='primary'
              label='사진 재업로드'
              style={{ marginBottom: 10 }}
              backgroundColor='#FFECA5'
            />
          </View>
        )}
      </View>

      <View>
        <Button
          style={{ marginVertical: 15 }}
          theme='primary'
          label='제출하기'
          backgroundColor='#FFECA5'
          onPress={() => router.push("/(landing)/font-make")}
        />
        <Button
          theme='primary'
          label='건너뛰기'
          backgroundColor='#D9D9D9'
          // onPress={() => router.push("/(landing)/drawing-style")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    padding: 30,
    fontFamily: "Pretendard",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  article: {
    padding: 21,
    fontWeight: "600",
    color: "#4B4B4B",
    backgroundColor: "#B8E9C0",
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
