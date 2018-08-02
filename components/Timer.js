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
import type { Workout } from "../types/index";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const secondLabel = (seconds: number) => {
  if (seconds > 9) return seconds.toString();

  return `0${seconds}`;
};

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
    return (
      <View style={styles.layout}>
        <TimerContext.Consumer>
          {({ state, nextRound }) => {
            const { workout } = state;
            const goal = Coach.roundGoal(workout);
            const average = Coach.averageRound(workout);
            return (
              <Fragment>
                {goal && <Slider duration={goal} />}

                <View
                  style={[
                    {
                      zIndex: 100,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: deviceHeight,
                      width: deviceWidth
                    }
                  ]}
                >
                  <View style={[styles.flex]}>
                    <View style={[styles.flex, { flex: 3 }]}>
                      <TouchableOpacity onPress={nextRound}>
                        <NumberCounter rounds={workout.rounds.length} />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                      {goal && <GoalLabel goal={goal} workout={workout} />}
                      {average && (
                        <Text style={styles.numberLabel}>
                          Average: {timeLabel(average)}
                        </Text>
                      )}
                    </View>
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
