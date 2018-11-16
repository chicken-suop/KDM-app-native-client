import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Easing } from 'react-native';

export default class AnimatedExpand extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);
    const { children } = this.props;
    this.state = {
      children,
      height: new Animated.Value(0),
      contentHeight: 0,
      measuring: false,
      measured: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { children } = this.state;

    if (children !== nextProps.children) {
      this.setState({ children: nextProps.children, measured: false }, () => {
        this.measureContent(height => this.transitionToHeight(height + 30));
      });
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  measureContent(callback) {
    this.setState({ measuring: true }, () => {
      requestAnimationFrame(() => {
        this.contentHandle.getNode().measure((x, y, width, height) => {
          this.setState(
            {
              measuring: false,
              measured: true,
              contentHeight: height,
            },
            () => callback(height),
          );
        });
      });
    });
  }

  transitionToHeight(inputHeight) {
    const { height } = this.state;
    if (this.animation) {
      this.animation.stop();
    }
    this.animation = Animated.timing(height, {
      toValue: inputHeight,
      duration: 300,
      easing: Easing.easeOutCubic,
    }).start();
  }

  render() {
    const {
      children,
      height,
      contentHeight,
      measuring,
      measured,
    } = this.state;
    const hasKnownHeight = !measuring && measured;
    const style = hasKnownHeight && {
      overflow: 'hidden',
      height,
    };

    const contentStyle = {
      transform: [{
        translateY: height.interpolate({
          inputRange: [0, contentHeight],
          outputRange: [-contentHeight, 0],
        }),
      }],
    };
    if (measuring) {
      contentStyle.position = 'absolute';
      contentStyle.opacity = 0;
    }

    return (
      <Animated.View style={[style, contentStyle]}>
        <Animated.View
          ref={(ref) => { this.contentHandle = ref; }}
        >
          {children}
        </Animated.View>
      </Animated.View>
    );
  }
}
