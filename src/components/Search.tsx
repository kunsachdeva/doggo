import React, { useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, TextInput, Touchable, TouchableOpacity } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows-fixes";
import COLORS from "../globals/colors";
import FONTS from "../globals/fonts";
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

type Props = {
  onSubmit: (text: string) => void
};

const SearchInput: React.FC<Props> = (props: Props) => {
  const [location, setLocation] = useState<GeolocationResponse>()
  Geolocation.getCurrentPosition(info => setLocation(info));

  const placeholder = location ? `🔍 Search near ${location.coords.latitude.toFixed(2)},${location?.coords.longitude.toFixed(2)}` : '🔍 Search'
  return (
    <Neomorph
      style={{
        ...styles.container,
        backgroundColor: COLORS.light,
      }}
    >
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onSubmitEditing={(v) => props.onSubmit(v.nativeEvent.text)}
      />
    </Neomorph>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    shadowRadius: 10,
    borderRadius: 25,
    width: Dimensions.get("window").width - 32,
    height: 50,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: "100%", width: "100%", textAlign: "center",
    ...FONTS.text1
  }
});
