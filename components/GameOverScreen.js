import React from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import Color from "../constants/colors";
import MainButton from "./MainButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        The Game is Over:
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 15,
          width: "80%",
        }}
      >
        Your Mobile took
        <Text style={styles.highlight}> {props.computerGuess} </Text>number of
        rounds to guess number
        <Text style={styles.highlight}> {props.userInput}</Text>
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        />
        {/* <Image
          source={{
            uri: "https://media.istockphoto.com/id/509920785/photo/empty-road-and-sign-symbolizing-success.jpg?s=612x612&w=0&k=20&c=QI1obXMhFiHSTGcuJOesp6Chc8XVDdc3fZ3SDx2Cm6k=",
          }}
          style={styles.image}
        /> */}
      </View>
      <MainButton onPress={props.newGame}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  highlight: {
    color: Color.primaryColor,
  },
});

export default GameOverScreen;
