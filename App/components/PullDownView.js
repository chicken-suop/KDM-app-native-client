import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Dimensions,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default class PullDownView extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    view: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    backgroundColor: 'black',
    children: '',
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(windowHeight),
    };
  }

  render() {
    const {
      backgroundColor, children, view, style,
    } = this.props;
    const { scrollY } = this.state;

    return (
      <Animated.ScrollView
        decelerationRate="fast"
        snapToInterval={windowHeight}
        contentOffset={{ x: 0, y: windowHeight }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        style={{ flex: 1, backgroundColor }}
      >
        <Animated.View
          style={{
            height: windowHeight,
            width: windowWidth,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [0, windowHeight],
                outputRange: [-30, 0],
              }),
            }],
          }}
        >
          {view}
        </Animated.View>
        <Animated.View
          style={[
            style,
            {
              minHeight: windowHeight,
              opacity: scrollY.interpolate({
                inputRange: [windowHeight * 0.1, windowHeight],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          {children}
        </Animated.View>
      </Animated.ScrollView>
    );
  }
}
