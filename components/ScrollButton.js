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
import { activeColor } from '../Styles';

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

const ScrollButton = ({ isAbove, scrollToActiveDayItemIndex }) => {
  const opacity = new Animated.Value(0);
  Animated.timing(
    opacity,
    {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(2),
    },
  ).start();

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
    <TouchableWithoutFeedback onPress={scrollToActiveDayItemIndex}>
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
        <Ionicons name={name} size={32} color="white" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

ScrollButton.propTypes = {
  scrollToActiveDayItemIndex: PropTypes.func.isRequired,
  isAbove: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
};

export default ScrollButton;
