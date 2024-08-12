import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import ShowNumber from "./ShowNumber";
import Card from "./Card";
const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max); //in case of decimal number
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  //if random number eqls to user guess in 1st attempt
  //we don't want that so again generate it
  if (randNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  }
  return randNum;
};
const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(1, 100, props.userInput)
  );
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <ShowNumber>{currentGuess}</ShowNumber>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => {}} />
        <Button title="GREATER" onPress={() => {}} />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
