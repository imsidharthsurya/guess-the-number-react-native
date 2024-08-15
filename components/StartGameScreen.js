import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "./Card";
import Colors from "../constants/colors";
import Input from "./Input";
import ShowNumber from "./ShowNumber";
import { useFonts } from "expo-font";
import MainButton from "./MainButton";

const StartGameScreen = (props) => {
  // console.log(Dimensions.get("screen").width);
  // console.log(Dimensions.get("screen").height);
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("screen").width / 4
  );

  useEffect(() => {
    const settingWidth = () => {
      setButtonWidth(Dimensions.get("screen").width / 4);
    };
    dimensionHandler=Dimensions.addEventListener("change", settingWidth);
    //cleanup fn. clear past eventlistener
    return () => {
      dimensionHandler.remove()
    };
  });

  const [loaded] = useFonts({
    "GreatVibes-Regular": require("../assets/fonts/GreatVibes-Regular.ttf"),
  });
  if (!loaded) {
    return <Text>Loading...</Text>;
  }
  const handleInputChange = (inputText) => {
    //replacing any char. other than 0-9 with empty string
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const handleReset = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const handleConfirm = () => {
    const num = parseInt(enteredValue);
    if (isNaN(num) || num <= 0 || num > 99) {
      //ie. invalid number entered
      Alert.alert(
        "Invalid Number!",
        "Please enter a valid number between 1 & 99",
        [
          {
            text: "Ok",
            onPress: handleReset,
            style: "destructive",
          },
        ]
      );
      return;
    }
    setEnteredValue("");
    setConfirmed(true);
    setSelectedNumber(enteredValue);
    Keyboard.dismiss();
    //order doesn't matter bc it'll happen in batch
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <Text style={styles.title}>Start a New Game!</Text>
          <Card style={styles.inputContainer}>
            <Text>Enter a Number</Text>
            <Input
              style={styles.input}
              blurOnSubmit={true}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={handleInputChange}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View style={{ width: buttonWidth }}>
                <Button
                  title="Reset"
                  onPress={handleReset}
                  color={Colors.secondaryColor}
                />
              </View>
              <View style={{ width: buttonWidth }}>
                <Button
                  title="Confirm"
                  onPress={handleConfirm}
                  color={Colors.primaryColor}
                />
              </View>
            </View>
          </Card>
          {confirmed && (
            <Card style={styles.summayContainer}>
              <Text>You selected</Text>
              <ShowNumber>{selectedNumber}</ShowNumber>
              <MainButton onPress={() => props.userNumber(selectedNumber)}>
                START GAME
              </MainButton>
            </Card>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 40,
    marginVertical: 10,
    fontFamily: "GreatVibes-Regular",
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: "300",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  button: {
    // width: 100,
    // width: buttonWidth,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summayContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
