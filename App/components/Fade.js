import PropTypes from 'prop-types';
import React from 'react';
import { Animated } from 'react-native';

export default class Fade extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    style: PropTypes.shape({}),
    duration: PropTypes.number,
    disableScale: PropTypes.bool,
    disableMarginLeft: PropTypes.bool,
    disableMarginRight: PropTypes.bool,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
  }

  static defaultProps = {
    style: {},
    duration: 300,
    children: '',
    disableScale: false,
    disableMarginLeft: false,
    disableMarginRight: true,
    marginLeft: 10,
    marginRight: 10,
  }

  constructor(props) {
    super(props);
    const { visible, children } = this.props;

    this.state = {
      opacity: new Animated.Value(visible ? 1 : 0),
      children,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    const { opacity, children } = this.state;
    const toValue = nextProps.visible ? 1 : 0;

    if (children !== nextProps.children && visible === nextProps.visible) {
      Animated.timing(opacity, {
        toValue: toValue === 1 ? 0 : 1,
        duration: nextProps.duration,
      }).start(() => {
        this.setState({ children: nextProps.children }, () => {
          Animated.timing(opacity, {
            toValue,
            duration: nextProps.duration,
          }).start();
        });
      });
    } else {
      Animated.timing(opacity, {
        toValue,
        duration: nextProps.duration,
      }).start();
    }
  }

  render() {
    const {
      visible,
      style,
      marginLeft,
      marginRight,
      disableScale,
      disableMarginLeft,
      disableMarginRight,
      ...rest
    } = this.props;
    const { opacity, children } = this.state;

    return (
      <Animated.View
        style={[
          {
            marginLeft: disableMarginLeft ? 0 : opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, marginLeft],
            }),
            marginRight: disableMarginRight ? 0 : opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, marginRight],
            }),
            opacity,
            transform: [
              {
                scale: disableScale ? 1 : opacity.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [0.85, 1],
                }),
              },
            ],
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Animated.View>
    );
  }
}
