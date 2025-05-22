import { useDrawingStyle } from "@/src/business/use-drawing-style.hooks";
import DrawingStyleForm from "@/src/components/drawing-style-form";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function DrawingStyle() {
  const hookProps = useDrawingStyle();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <DrawingStyleForm {...hookProps} />
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
});
