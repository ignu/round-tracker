/* flow */
import React from "react";
import { StyleSheet, View } from "react-native";
import Start from "./components/StartScreen";
import WorkoutOptions from "./components/WorkoutOptions";
import Timer from "./components/Timer";
import TimerContext, { Provider } from "./components/Context";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider>
          <TimerContext.Consumer>
            {({ state }) => {
              if (!state.definition) return <WorkoutOptions />;
              if (!state.workout) return <Start />;
              return <Timer />;
            }}
          </TimerContext.Consumer>
        </Provider>
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
