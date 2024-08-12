import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Header from "../../components/Header";
import StartGameScreen from "../../components/StartGameScreen";
import GameScreen from "../../components/GameScreen";
export default function HomeScreen() {
  const [userNumber, setUserNumber] = useState(null);
  const userNumberHandler = (number) => {
    setUserNumber(number);
  };
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {userNumber == null ? (
        <StartGameScreen userNumber={userNumberHandler} />
      ) : (
        <GameScreen userInput={userNumber} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
