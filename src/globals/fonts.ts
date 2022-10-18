import { TextStyle } from "react-native";

const FONTS: Record<string, Partial<TextStyle>> = {
  heading1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  heading2: { fontSize: 24, fontWeight: "bold" },
  heading3: { fontSize: 16, fontWeight: "bold" },
  text1: { fontSize: 16, fontWeight: "300" },
};
export default FONTS;
