import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const Watermark: React.FC = () => {
  return (
    <Image
      source={{
        uri: "https://static.wixstatic.com/media/e947507779da3f10f50320b6ef1147bb.png/v1/fill/w_560,h_196,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Peeping%20Dog%20Wide.png",
      }}
      style={styles.logo}
    />
  );
};

export default Watermark;

const styles = StyleSheet.create({
  logo: { height: 100, width: 280, borderRadius: 25, alignSelf: "flex-end", position:'absolute', bottom: 0 },
});
