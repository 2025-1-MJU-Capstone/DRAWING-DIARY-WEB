import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  theme: "primary" | "secondary";
  onPress?: () => void;
  label: string;
  backgroundColor: string;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  theme,
  onPress,
  label,
  backgroundColor,
  icon,
  style,
}: ButtonProps) {
  const buttonStyle =
    theme === "primary" ? styles.primaryContainer : styles.secondaryContainer;
  return (
    <Pressable
      onPress={onPress}
      style={[buttonStyle, { backgroundColor }, style]}
    >
      {icon && (
        <Image
          style={{ width: 18, height: 18, marginRight: 5 }}
          source={icon}
        />
      )}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryContainer: {
    width: 300,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  secondaryContainer: {
    width: 125,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#4B4B4B",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "PretendardVariable",
  },
});
