import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TimerContext from "./Context";

export default class StartScreen extends React.Component {
  render() {
    return (
      <View>
        <TimerContext.Consumer>
          {({ start }) => {
            return (
              <TouchableOpacity onPress={start}>
                <Text style={{ fontSize: 120 }}>Start</Text>
              </TouchableOpacity>
            );
          }}
        </TimerContext.Consumer>
      </View>
    );
  }
}
