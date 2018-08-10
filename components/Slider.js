/* @flow */
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

  constructor(props: SliderProps) {
    super(props);
    this.state = {
      backgroundColor: GREEN
    };
    this.height = new Animated.Value(1);
  }

  componentDidMount() {
    this.startAnimation();
  }

  overdue() {
    const round = this.props.round;
    return () => {
      if (round != this.props.round) return;

      this.setState({
        backgroundColor: RED
      });
    };
  }

  componentDidUpdate(otherProps: any, otherState: any) {
    if (otherProps.round != this.props.round) {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.state.animation && this.state.animation.stop();
    this.height = new Animated.Value(1);
    this.setState({ backgroundColor: GREEN });

    const animation = Animated.timing(this.height, {
      toValue: deviceHeight,
      duration: this.props.duration * 1000
    }).start(this.overdue().bind(this));

    this.setState({
      animation
    });
  }

  render() {
    const sliderStyle = {
      zIndex: 0,
      position: "absolute",
      height: this.height,
      top: 0,
      width: deviceWidth,
      backgroundColor: this.state.backgroundColor
    };

    console.log(sliderStyle);
    return <Animated.View ref="progress" style={sliderStyle} />;
  }
}

export default Slider;
