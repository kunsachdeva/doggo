import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, Animated, View, TouchableOpacity } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows-fixes";
import COLORS from "../globals/colors";
import FONTS from "../globals/fonts";
import StateContext from "../store/context";
import { getBreedImage } from "../store/network";

type Props = {
  breed: string;
  onPress?: () => void
};

const BreedTile: React.FC<Props> = (props: Props) => {
  const [image, setImage] = useState<string>()
  const [expanded, setExpanded] = useState(false)
  const [breeds, dispatch] = useContext(StateContext) as Array<any>;

  const name = props.breed[0].toUpperCase() + props.breed.slice(1)
  const heightAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;
  const subBreeds = breeds[props.breed];
  const toggleView = () => {
    heightAnim.stopAnimation()
    Animated.timing(heightAnim, {
      toValue: expanded ? 40 : subBreeds.length ? 320 : 200,
      useNativeDriver: false,
      duration: 200
    }).start()
    Animated.timing(opacityAnim, {
      toValue: expanded ? 0.7 : 1,
      useNativeDriver: false,
      duration: 200
    }).start()
    setExpanded(curr => !curr)
  }

  useEffect(() => {
    getBreedImage(props.breed).then(setImage)
  }, [])

  return (
    <TouchableOpacity onPress={toggleView}>
      <Animated.View style={{
        height: heightAnim,
        marginBottom: 24
      }}>
        <Neomorph
          style={{
            ...styles.container,
            backgroundColor: COLORS.light,
          }}
        >
          <Animated.View
            style={[styles.titleContainer, { opacity: opacityAnim }]}
          >
            <Text style={styles.title}>{name}</Text>
          </Animated.View>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.subBreeds}>Sub Breeds: {subBreeds?.join(', ')}</Text>
        </Neomorph>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default BreedTile;

const styles = StyleSheet.create({
  container: {
    shadowRadius: 10,
    borderRadius: 25,
    width: Dimensions.get("window").width - 32,
    height: "100%",
    margin: 16,
    overflow: "hidden",
  },
  image: {
    width: Dimensions.get("window").width - 32,
    height: 200, resizeMode: "cover",
  },
  titleContainer: {
    position: "absolute",
    zIndex: 1,
    shadowColor: COLORS.dark,
    shadowOffset: { height: -1, width: -1 },
    shadowOpacity: 1,
    shadowRadius: 10,
    height: 40,
    width: "100%",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.dark
  },
  title: {
    ...FONTS.heading1,
    zIndex: 1,
    color: COLORS.light,
    textAlign: "right",
    paddingRight: 16
  },
  subBreeds: {
    ...FONTS.text1,
    zIndex: 1,
    color: COLORS.dark,
    textAlign: "left",
    margin: 16,
  }
});
