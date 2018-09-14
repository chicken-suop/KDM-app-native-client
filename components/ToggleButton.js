import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableWithoutFeedback, View, Text, Animated,
} from 'react-native';
import styles from '../Styles';

export default class ToggleButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    chosenOption: PropTypes.string.isRequired,
    activeTextColor: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      chosenOption: props.chosenOption,
      showingOptions: false,
      chosenOptionAV: new Animated.Value(20),
      optionsAV: new Animated.Value(0),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { chosenOption, showingOptions } = this.state;
    return nextState.chosenOption !== chosenOption
      || nextState.showingOptions !== showingOptions;
  }

  toggleShowingOptions = (showingOptions) => {
    const { chosenOptionAV, optionsAV } = this.state;
    this.setState({ showingOptions: !showingOptions });
    if (showingOptions) {
      Animated.parallel([
        Animated.timing(chosenOptionAV, {
          toValue: 20,
          duration: 150,
        }),
        Animated.timing(optionsAV, {
          toValue: 0,
          duration: 150,
        }),
      ], { useNativeDriver: true }).start();
    } else {
      Animated.parallel([
        Animated.timing(chosenOptionAV, {
          toValue: 0,
          duration: 150,
        }),
        Animated.timing(optionsAV, {
          toValue: 30,
          duration: 150,
        }),
      ], { useNativeDriver: true }).start();
    }
  }

  handleOptionPress = (option) => {
    const { showingOptions } = this.state;
    const { onPress } = this.props;
    this.setState({ chosenOption: option }, () => {
      setTimeout(() => {
        this.toggleShowingOptions(showingOptions);
        onPress(option);
      }, 150);
    });
  }

  render() {
    const { message, options, activeTextColor } = this.props;
    const {
      showingOptions, chosenOption, chosenOptionAV, optionsAV,
    } = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => this.toggleShowingOptions(showingOptions)}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[styles.whiteClr, styles.fntWt700, { fontSize: 22, marginBottom: 5 }]}>
            {message}
          </Text>
          <Animated.Text
            style={[
              styles.whiteClr,
              styles.centerText,
              { maxHeight: chosenOptionAV, fontSize: 16 },
            ]}
          >
            {chosenOption}
          </Animated.Text>
          <Animated.View
            style={{
              maxHeight: optionsAV,
              overflow: 'hidden',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {options.map(option => (
              <TouchableWithoutFeedback onPress={() => this.handleOptionPress(option)} key={option}>
                <Animated.View
                  style={[
                    {
                      padding: optionsAV.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 5],
                      }),
                      borderRadius: 5,
                      marginHorizontal: 5,
                    },
                    option === chosenOption && { backgroundColor: '#fff' },
                  ]}
                >
                  <Animated.Text
                    style={[
                      styles.whiteClr,
                      { fontSize: 18 },
                      option === chosenOption && { color: activeTextColor },
                    ]}
                  >
                    {option}
                  </Animated.Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            ))}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
