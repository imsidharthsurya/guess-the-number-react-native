import { View, Text , StyleSheet,  } from 'react-native';
import Header from "../../components/Header"
import StartGameScreen from "../../components/StartGameScreen"
export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      <StartGameScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
