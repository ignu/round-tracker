/* flow */
import React from "react";
import { StyleSheet, View } from "react-native";
import Timer from "./components/Timer";

import { Workout } from "./types";

export default class App extends React.Component {
  render() {
    const workout: Workout = {
      definition: {
        rounds: 15,
        minutes: 20
      },
      rounds: []
    };

    return (
      <View style={styles.container}>
        <Timer workout={workout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
