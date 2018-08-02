import React from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import colors from "../lib/Colors";

const deviceWidth = Dimensions.get("window").width;

class WorkoutOptions extends React.Component {
  render() {
    return (
      <View style={{ padding: 10, margin: 10, width: deviceWidth }}>
        <View style={{padding: 20}}> 
          <Text style={{fontSize: 30}}>Enter Workout Details</Text>
        </View>
        <FormLabel>Rounds</FormLabel>
        <FormInput keyboardType="numeric" onChangeText={console.log} />

        <FormLabel>Minutes</FormLabel>
        <FormInput keyboardType="numeric" onChangeText={console.log} />
        <Button
          large
          color={colors.white}
          backgroundColor={colors.green}
          rightIcon={{name: 'accessibility'}}
          title='READY'
        ></Button>
      </View>
    );
  }
}
export default WorkoutOptions;
