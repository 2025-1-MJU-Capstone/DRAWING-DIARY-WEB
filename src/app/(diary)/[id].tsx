import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DetailDiary() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  // TODO: id로 API 호출해서 diary 데이터를 가져오세요
  // 예시 데이터
  const diary = {
    diaryDate: "2025-05-22",
    title: "소중한 하루",
    imageUrl: "https://example.com/path/to/image.jpg",
    content:
      "오늘은 프로젝트 마감 전 마지막 점검을 했어요. 많은 버그를 잡고 UI도 다듬었더니 성취감이 컸습니다 😊",
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.replace("/(app)/home")}
            style={styles.backButton}
          >
            <AntDesign name='caretleft' size={24} color='#333' />
          </TouchableOpacity>
          <Text style={styles.header}>일기 보기</Text>
        </View>

        <View style={styles.metaContainer}>
          <Text style={styles.diaryTitle}>{diary.title}</Text>
          <Text style={styles.date}>{diary.diaryDate}</Text>
        </View>

        <View style={styles.divider} />

        <Image source={{ uri: diary.imageUrl }} style={styles.image} />

        <View style={styles.contentContainer}>
          <Text style={styles.content}>{diary.content}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFDF8",
  },
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
  },
  metaContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  diaryTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
    fontFamily: "Pretendard",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    marginBottom: 24,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: "#444",
    fontFamily: "Pretendard",
  },
});
