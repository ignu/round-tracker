/* @flow */
import React from "react";
import type { Workout, WorkoutDefinition } from "../types/index";
import Coach from "../lib/Coach";

// $FlowFixMe
const TimerContext = React.createContext();
export default TimerContext;

type ContextState = {
  definition?: WorkoutDefinition,
  workout?: Workout
};

let defaultDefinition: WorkoutDefinition = {
  goal: 10,
  minutes: 20
};

export class Provider extends React.Component<any, ContextState> {
  state = {
  };
  render() {
    return (
      <TimerContext.Provider
        value={{
          state: this.state,
          start: () => {
            this.setState({
              workout: Coach.startWorkout(this.state.definition)
            });
          },
          createDefinition: (minutes: number, goal: ?number) => {
            this.setState({
              definition: { minutes, goal }
            });
          },

          nextRound: () => {
            if (!this.state.workout) {
              throw new Error("Can not advance rounds if workout is not set");
            }
            this.setState({
              workout: Coach.addRound(this.state.workout)
            });
          }
        }}
      >
        {this.props.children}
      </TimerContext.Provider>
    );
  }
}
