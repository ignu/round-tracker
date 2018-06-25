/* @flow */
import React from "react";
import { Workout, WorkoutDefinition } from "../types";
import Coach from "../lib/Coach";

// $FlowFixMe
const TimerContext = React.createContext();
export default TimerContext;

type ContextState = {
  definition?: WorkoutDefinition,
  workout?: Workout
};

export class Provider extends React.Component<any, ContextState> {
  state = {
    definition: {
      rounds: 12,
      minutes: 20
    },
    workout: null
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
