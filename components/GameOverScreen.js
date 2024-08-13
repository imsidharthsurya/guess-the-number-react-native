import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Number of rounds: {props.computerGuess}</Text>
      <Text>Entered number: {props.userInput}</Text>
      <Button title="NEW GAME" onPress={props.newGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GameOverScreen;
