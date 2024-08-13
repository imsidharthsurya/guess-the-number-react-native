import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
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
  const { userInput, onGameOver } = props;
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(1, 100, userInput)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess == userInput) {
      onGameOver(rounds);
    }
  }, [currentGuess, userInput, onGameOver]);
  const nextGuessHandler = (direction) => {
    if (
      (direction == "lower" && currentGuess < userInput) ||
      (direction == "greater" && currentGuess > userInput)
    ) {
      //user is lying about the guess throw alert
      Alert.alert("Don't lie!", "you know this is not wrong...", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);
      return;
    }
    //user give correct direction
    if (direction == "lower") {
      currentHigh.current = currentGuess;
    } else {
      //direction=greater
      currentLow.current = currentGuess;
    }
    const num = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(num);
    //increase the guess rounds
    setRounds((currRounds) => currRounds + 1);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <ShowNumber>{currentGuess}</ShowNumber>
      <Card style={styles.buttonContainer}>
        <Button
          title="LOWER"
          onPress={() => {
            nextGuessHandler("lower");
          }}
        />
        <Button
          title="GREATER"
          onPress={() => {
            nextGuessHandler("greater");
          }}
        />
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
