import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import ShowNumber from "./ShowNumber";
import MainButton from "./MainButton";
import Card from "./Card";
import { Ionicons } from "@expo/vector-icons";

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
  const initialGuess = generateRandomNumber(1, 100, userInput);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess == userInput) {
      onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1;
    }
    const num = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(num);
    //increase the guess rounds
    // setRounds((currRounds) => currRounds + 1);
    setPastGuesses((oldGuesses) => [num, ...oldGuesses]);
    //b/c we want our recent guess to be on top or start of the array
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <ShowNumber>{currentGuess}</ShowNumber>
      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            nextGuessHandler("lower");
          }}
        >
          <Ionicons name="remove" size={24} color="white" />
        </MainButton>
        <MainButton
          onPress={() => {
            nextGuessHandler("greater");
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {pastGuesses.map((guess, index) => {
            //use guess as key b/c every guess will be unique now
            return (
              <View key={guess} style={styles.listItem}>
                <Text>#{pastGuesses.length - index}</Text>
                <Text>{guess}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
    width: 400,
    maxWidth: "100%",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  list: {
    width: "80%",
    flex: 1,
    marginTop: 20,
  },
  scroll: {
    alignItems: "center",
  },
});

export default GameScreen;
