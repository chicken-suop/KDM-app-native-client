import PropTypes from 'prop-types';
import React from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { activeColor } from '../../Styles';

const scrollButtonStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: activeColor,
    borderRadius: 100,
  },
});

export default class ScrollButton extends React.Component {
  static propTypes = {
    scrollToActiveDay: PropTypes.func.isRequired,
    isAbove: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      isAbove: props.isAbove,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { opacity, isAbove } = this.state;
    if (isAbove !== nextProps.isAbove) {
      opacity.setValue(0);
      this.setState({
        isAbove: nextProps.isAbove,
      }, () => {
        if (nextProps.isAbove === true || nextProps.isAbove === false) {
          Animated.timing(
            opacity,
            {
              toValue: 1,
              duration: 500,
              easing: Easing.elastic(2),
              useNativeDriver: true,
            },
          ).start();
        }
      });
    }
  }

  render() {
    const { scrollToActiveDay } = this.props;
    const { isAbove, opacity } = this.state;

    let name;
    if (Platform.OS === 'ios') {
      name = isAbove
        ? 'ios-arrow-up'
        : 'ios-arrow-down';
    } else {
      name = isAbove
        ? 'md-arrow-up'
        : 'md-arrow-down';
    }

    return (
      <TouchableWithoutFeedback onPress={scrollToActiveDay}>
        <Animated.View
          style={[
            {
              opacity,
              transform: [
                {
                  scale: opacity.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
            scrollButtonStyles.button,
          ]}
        >
          <Ionicons name={name} size={32} color="black" />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
