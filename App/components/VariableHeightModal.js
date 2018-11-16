import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles, { secondaryColor } from '../Styles';

const windowHeight = Dimensions.get('window').height;

export default class VariableHeightModal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    goBack: PropTypes.func,
    backgroundStyle: PropTypes.shape({}),
    panelStyle: PropTypes.shape({}),
  };

  static defaultProps = {
    children: '',
    goBack: () => {},
    backgroundStyle: {},
    panelStyle: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      animatedEditPage: new Animated.Value(0),
      animatedEditPageColor: new Animated.Value(0),
      children: props.children,
    };
  }

  componentWillMount() {
    const { animatedEditPage, animatedEditPageColor } = this.state;
    Animated.parallel([
      Animated.timing(animatedEditPage, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Can't use native driver for backgroundColor
      Animated.timing(animatedEditPageColor, {
        toValue: 1,
        duration: 300,
      }),
    ]).start();
  }

  componentWillReceiveProps(nextProps) {
    const { children } = this.props;
    if (nextProps.children !== children) {
      this.setState({ children: nextProps.children });
    }
  }

  close = () => {
    const { animatedEditPage, animatedEditPageColor } = this.state;
    const { goBack } = this.props;
    Animated.parallel([
      Animated.timing(animatedEditPage, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // Can't use native driver for backgroundColor
      Animated.timing(animatedEditPageColor, {
        toValue: 0,
        duration: 300,
      }),
    ]).start(goBack);
  }

  render() {
    const { animatedEditPage, animatedEditPageColor, children } = this.state;
    const { backgroundStyle, panelStyle } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.close}>
        <Animated.View
          style={[
            styles.absView,
            {
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: animatedEditPageColor.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)'],
              }),
            },
            backgroundStyle,
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                {
                  position: 'relative',
                  backgroundColor: secondaryColor,
                  borderRadius: 10,
                  transform: [{
                    translateY: animatedEditPage.interpolate({
                      inputRange: [0, 1],
                      outputRange: [windowHeight, 0],
                    }),
                  }],
                },
                panelStyle,
              ]}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 1,
                }}
              >
                <TouchableOpacity onPress={this.close}>
                  <Feather
                    name="arrow-down"
                    size={28}
                    color="#fff"
                    style={{ padding: 20 }}
                  />
                </TouchableOpacity>
              </View>
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
