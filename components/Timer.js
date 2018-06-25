/* @flow */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TimerContext from "./Context";

const styles = StyleSheet.create({
  numberLabel: {
    fontSize: 90,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  layout: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 80
  }
});

class Timer extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.layout}>
        <TimerContext.Consumer>
          {({ state, nextRound }) => {
            const { workout } = state;
            return (
              <TouchableOpacity onPress={nextRound}>
                <Text style={styles.numberLabel}>{workout.rounds.length}</Text>
              </TouchableOpacity>
            );
          }}
        </TimerContext.Consumer>
      </View>
    );
  }
}

export default Timer;
