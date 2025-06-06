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
import { useGetDiaryDetail } from "@/src/stores/query/diary";
import useDiary from "@/src/business/use-diary.hooks";

export default function DetailDiary() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: diary, isLoading, error } = useGetDiaryDetail(Number(id));
  const { serverFonts, loading: fontsLoading } = useDiary();
  if (!serverFonts || !diary)
    return <Text>폰트를 불러오는 중 오류가 발생했습니다.</Text>;

  if (isLoading || fontsLoading) {
    return <Text>로딩 중…</Text>;
  }
  if (error || !diary) {
    return <Text>일기를 불러오는 중 오류가 발생했습니다.</Text>;
  }

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
          <Text
            style={[styles.content, { fontFamily: diary.fontId.toString() }]}
          >
            {diary.content}
          </Text>
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
    height: 400,
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
    fontSize: 19,
    color: "#000",
    fontFamily: "Pretendard",
  },
});
