/* flow */
import React from "react";
import { StyleSheet, View } from "react-native";
import Timer from "./components/Timer";

import { WorkoutDefinition } from "./types";

export default class App extends React.Component {
  render() {
    const workoutDefinition: WorkoutDefinition = {
      rounds: 15,
      minutes: 20
    };

    return (
      <View style={styles.container}>
        <Timer workoutDefinition={workoutDefinition} />
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
