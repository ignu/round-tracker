/* @flow */
import React from "react";
import { Workout } from "../types";
import { View, Text } from "react-native";

type TimerPropTypes = {
  workout: Workout
};

class Timer extends React.Component<TimerPropTypes> {
  render() {
    const { workout } = this.props;
    return (
      <View>
        <Text>{workout.rounds.length}</Text>
      </View>
    );
  }
}

export default Timer;
