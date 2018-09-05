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
      chosenOptionAV: new Animated.Value(15),
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
          toValue: 15,
          duration: 150,
        }),
        Animated.timing(optionsAV, {
          toValue: 0,
          duration: 150,
        }),
      ]).start();
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
      ]).start();
    }
  }

  handleOptionPress = (e, option) => {
    const { showingOptions } = this.state;
    // const { onPress } = this.props;
    this.setState({ chosenOption: option }, () => {
      setTimeout(() => {
        this.toggleShowingOptions(showingOptions);
        // onPress(e, option);
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
        <View>
          <View>
            <Text style={[styles.whiteClr, styles.fntWt700, { fontSize: 22, marginBottom: 5 }]}>
              {message}
            </Text>
          </View>
          <Animated.View
            style={{
              maxHeight: chosenOptionAV,
              overflow: 'hidden',
            }}
          >
            <Text style={[styles.whiteClr, styles.centerText, { fontSize: 16 }]}>
              {chosenOption}
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              maxHeight: optionsAV,
              overflow: 'hidden',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {options.map(option => (
              <TouchableWithoutFeedback
                onPress={e => this.handleOptionPress(e, option)}
                key={option}
              >
                <View
                  style={[
                    { padding: 5, borderRadius: 5 },
                    option === chosenOption && { backgroundColor: '#fff' },
                  ]}
                >
                  <Text
                    style={[
                      styles.whiteClr,
                      { fontSize: 18 },
                      option === chosenOption && { color: activeTextColor },
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
