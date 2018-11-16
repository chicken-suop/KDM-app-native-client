import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Animated,
  Easing,
} from 'react-native';
import Touchable from './Touchable';

/*
* Values from:
* https://material.io/design/motion/speed.html
*/

const easingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1),
};

const durationValues = {
  entry: 225,
  exit: 195,
};

class Snackbar extends Component {
  static propTypes = {
    actionColor: PropTypes.string,
    messageColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    position: PropTypes.string,
    visible: PropTypes.bool,
    onDismiss: PropTypes.func,
    textMessage: PropTypes.string.isRequired,
    actionHandler: PropTypes.func.isRequired,
    actionText: PropTypes.string.isRequired,
  };

  static defaultProps = {
    actionColor: 'orange',
    messageColor: '#FFFFFF',
    backgroundColor: '#484848',
    left: 0,
    right: 0,
    bottom: 0,
    position: 'bottom',
    visible: false,
    onDismiss: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { translateValue } = this.state;
    const { visible } = this.props;
    translateValue.setValue(visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    if (nextProps.visible && !visible) {
      this.show();
    } else if (!nextProps.visible && visible) {
      this.dismiss();
    }
  }

  show = () => {
    const { translateValue } = this.state;
    Animated.timing(
      translateValue,
      {
        duration: durationValues.entry,
        toValue: 1,
        easing: easingValues.entry,
      },
    ).start(() => setTimeout(this.dismiss, 4000));
  }

  dismiss = () => {
    const { translateValue } = this.state;
    const { onDismiss } = this.props;
    Animated.timing(
      translateValue,
      {
        duration: durationValues.exit,
        toValue: 0,
        easing: easingValues.exit,
      },
    ).start(onDismiss);
  }

  render() {
    const { translateValue } = this.state;
    const {
      backgroundColor,
      bottom,
      position,
      left,
      right,
      messageColor,
      textMessage,
      actionHandler,
      actionText,
      actionColor,
    } = this.props;

    const translateValueInterpolated = translateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-45, 0],
    });

    return (
      <Animated.View style={[
        styles.limitContainer,
        {
          height: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 45],
          }),
          backgroundColor,
        },
        position === 'bottom'
          ? { bottom }
          : { top: bottom },
      ]}
      >
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor,
              left,
              right,
            },
            position === 'bottom'
              ? { bottom: translateValueInterpolated }
              : { top: translateValueInterpolated },
          ]}
        >
          <Text style={[styles.textMsg, { color: messageColor }]}>
            {textMessage}
          </Text>
          {!!actionHandler && !!actionText
            && (
            <Touchable onPress={actionHandler}>
              <Text style={[styles.actionText, { color: actionColor }]}>
                {actionText.toUpperCase()}
              </Text>
            </Touchable>
            )
          }
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  limitContainer: {
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
  },
  textMsg: {
    fontSize: 14,
    flex: 1,
    paddingLeft: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },
});

export default Snackbar;
