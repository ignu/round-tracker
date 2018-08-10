import React from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import colors from "../lib/Colors";
import TimerContext from "./Context";

const deviceWidth = Dimensions.get("window").width;

class WorkoutOptions extends React.Component {
  render() {
    return (
      <TimerContext.Consumer>
        {({ state, createDefinition, ready }) => {
          const updateRounds = rounds => {
            console.log("rounds", rounds);
            createDefinition(state.definition.minutes, rounds);
          };

          const updateMinutes = minutes => {
            console.log("minutes", rounds);
            createDefinition(minutes, state.definition.rounds);
          };
          console.log("rendering...", state);
          return (
            <View style={{ padding: 10, margin: 10, width: deviceWidth }}>
              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 30 }}>Enter Workout Details</Text>
              </View>
              <FormLabel>Minutes</FormLabel>
              <FormInput
                defaultValue={state.definition.minutes.toString()}
                keyboardType="numeric"
                onChangeText={updateMinutes}
              />

              <FormLabel>Rounds</FormLabel>
              <FormInput keyboardType="numeric" onChangeText={updateRounds} />

              <Button
                large
                onPress={ready}
                color={colors.white}
                backgroundColor={colors.green}
                rightIcon={{ name: "accessibility" }}
                title="READY"
              />
            </View>
          );
        }}
      </TimerContext.Consumer>
    );
  }
}
export default WorkoutOptions;
