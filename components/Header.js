import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    backgroundColor: "#f7287b",
  },
  headerTitle: {
    fontSize: 18,
    color: "black",
  },
});
export default Header;
