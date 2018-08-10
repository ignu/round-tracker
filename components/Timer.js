/* @flow */
import React from "react";

import { Fragment } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import TimerContext from "./Context";
import Slider from "./Slider";
import Coach from "../lib/Coach";
import { Workout } from "../types/index";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const secondLabel = (seconds: number) => {
  if (seconds > 9) return seconds.toString();

  return `0${seconds}`;
};
const TRANSPARENT = "rgba(0, 0, 0, 0)";
const timeLabel = (seconds: number) => {
  seconds = Math.floor(seconds);
  if (seconds < 60) {
    return `${seconds} Seconds`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  return `${minutes}:${secondLabel(remainder)}`;
};

const styles = StyleSheet.create({
  numberLabel: {
    flex: 1,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  layout: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 80
  },
  flex: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const NumberCounter = ({ rounds }) => {
  const fontSize = rounds > 99 ? 110 : 170;
  return <Text style={[styles.numberLabel, { fontSize }]}>{rounds}</Text>;
};

const GoalLabel = ({ goal, workout }: { goal: number, workout: Workout }) => {
  if (Coach.remainingRounds(workout) < 1) {
    return <Text style={styles.numberLabel}>🎉 Goal Complete! 🎉</Text>;
  }
  return <Text style={styles.numberLabel}>Goal: {timeLabel(goal)}</Text>;
};

class Timer extends React.Component<any, any> {
  render() {
    const numberViewStyle = {
      backgroundColor: TRANSPARENT,
      width: deviceWidth,
      top: 100,
      flex: 1,
      alignItems: "center",
      position: "absolute",
      zIndex: 2
    };
    return (
      <View style={styles.layout}>
        <TimerContext.Consumer>
          {({ state, nextRound }) => {
            const { workout } = state;
            const goal = Coach.roundGoal(workout);
            const average = Coach.averageRound(workout);
            return (
              <Fragment>
                <View
                  style={[
                    {
                      position: "absolute",
                      height: deviceHeight,
                      width: deviceWidth
                    }
                  ]}
                >
                  <View style={numberViewStyle}>
                    <TouchableOpacity onPress={nextRound}>
                      <NumberCounter rounds={workout.rounds.length} />
                    </TouchableOpacity>
                  </View>

                  {goal && (
                    <Slider duration={goal} round={workout.rounds.length} />
                  )}

                  <View
                    style={{
                      position: "absolute",
                      zIndex: 2,
                      top: deviceHeight - 90,
                      left: 0,
                      flex: 1,
                      alignItems: "center",
                      backgroundColor: TRANSPARENT,
                      width: deviceWidth
                    }}
                  >
                    {goal && <GoalLabel goal={goal} workout={workout} />}
                    {average && (
                      <Text style={styles.numberLabel}>
                        Average: {timeLabel(average)}
                      </Text>
                    )}
                  </View>
                </View>
              </Fragment>
            );
          }}
        </TimerContext.Consumer>
      </View>
    );
  }
}

export default Timer;
