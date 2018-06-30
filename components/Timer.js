/* @flow */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TimerContext from "./Context";
import Coach from "../lib/Coach";

const styles = StyleSheet.create({
  numberLabel: {
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

const NumberCounter = ({ rounds }) => {
  const fontSize = rounds > 99 ? 110 : 170;
  return <Text style={[styles.numberLabel, { fontSize }]}>{rounds}</Text>;
};

class Timer extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.layout}>
        <TimerContext.Consumer>
          {({ state, nextRound }) => {
            const { workout } = state;
            const goal = Coach.roundGoal(workout);
            const average = Coach.averageRound(workout);
            return (
              <View>
                <TouchableOpacity onPress={nextRound}>
                  <NumberCounter rounds={workout.rounds.length} />
                  {/* <Text style={styles.numberLabel}>{goal}</Text>
                  <Text style={styles.numberLabel}>{average}</Text> */}
                </TouchableOpacity>
              </View>
            );
          }}
        </TimerContext.Consumer>
      </View>
    );
  }
}

export default Timer;
