import React from "react";
import { View, StyleSheet } from "react-native";

//but it's children will have width and all style so overwrite/append that
//we'll take children style as props
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 5,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default Card;
