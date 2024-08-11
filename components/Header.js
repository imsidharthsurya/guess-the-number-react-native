import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
const Header = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 36,
    height: 90,
    backgroundColor: Colors.primaryColor,
  },
  headerTitle: {
    fontSize: 18,
    color: "black",
  },
});
export default Header;
