import React from "react";
import { Animated, Dimensions, View } from "react-native";

const GREEN = "#009900";
const RED = "#990000";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

type SliderProps = {
  duration: number
};
class Slider extends React.Component<SliderProps, any> {
  height: any;
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: GREEN
    };
  }

  componentDidMount() {
    this.height = new Animated.Value(1);
    this.startAnimation();
  }

  overdue() {
    this.setState({
      backgroundColor: RED
    });
  }

  startAnimation() {
    Animated.timing(this.height, {
      toValue: deviceHeight,
      duration: this.props.duration * 1000
    }).start(this.overdue.bind(this));
  }

  render() {
    const sliderStyle = {
      zIndex: 1,
      position: "absolute",
      height: this.height,
      top: 0,
      width: deviceWidth,
      backgroundColor: this.state.backgroundColor
    };

    return <Animated.View ref="progress" style={sliderStyle} />;
  }
}

export default Slider;
