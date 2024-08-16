import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";
import Header from "../../components/Header";
import StartGameScreen from "../../components/StartGameScreen";
import GameScreen from "../../components/GameScreen";
import GameOverScreen from "../../components/GameOverScreen";
export default function HomeScreen() {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };
  const newGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };
  const userNumberHandler = (number) => {
    setUserNumber(number);
    //starting the game so make guessRounds as 0
    setGuessRounds(0);
  };

  let content = <StartGameScreen userNumber={userNumberHandler} />;

  if (userNumber != null && guessRounds <= 0) {
    content = (
      <GameScreen userInput={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        computerGuess={guessRounds}
        userInput={userNumber}
        newGame={newGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
