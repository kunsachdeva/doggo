import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows-fixes";
import COLORS from "../globals/colors";
import FONTS from "../globals/fonts";

type Props = {
  isActive?: boolean;
  title: string;
  onPress?: Dispatch<SetStateAction<string | null>>
};

const Avatar: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress && props.onPress(props.title)}>
      <Neomorph
        style={{
          ...styles.container,
          backgroundColor: props.isActive ? COLORS.dark : COLORS.light,
          width: Math.max(50, props.title.length * 25)
        }}
      >
        <Text
          style={{
            ...FONTS.heading2,
            color: props.isActive ? COLORS.light : COLORS.dark,
          }}
        >
          {props.title}
        </Text>
      </Neomorph>
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    shadowRadius: 10,
    borderRadius: 25,
    height: 50,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
