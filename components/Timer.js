/* @flow */
import React from "react";
import { Workout, WorkoutDefinition } from "../types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Coach from "../lib/Coach";

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

type TimerPropTypes = {
  workoutDefinition: WorkoutDefinition
};

type TimerState = {
  workout?: Workout
};

class Timer extends React.Component<TimerPropTypes, TimerState> {
  constructor(props: TimerPropTypes) {
    super(props);
    this.state = {};
  }

  start() {
    const definition: WorkoutDefinition = this.props.workoutDefinition;
    this.setState({
      workout: Coach.startWorkout(definition)
    });
  }

  nextRound() {
    this.setState({
      workout: Coach.addRound(this.state.workout)
    });
  }

  render() {
    const { workout } = this.state;
    if (!workout) {
      return (
        <View>
          <TouchableOpacity onPress={this.start.bind(this)}>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.layout}>
        <TouchableOpacity onPress={this.nextRound.bind(this)}>
          <Text style={styles.numberLabel}>{workout.rounds.length}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Timer;
