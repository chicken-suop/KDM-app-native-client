import React from 'react';
import {
  Text, StyleSheet, TouchableWithoutFeedback, Image, Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import styles, { trinaryColor } from '../../Styles';

export default class DetailsItem extends React.Component {
  static propTypes = {
    data1: PropTypes.string,
    data2: PropTypes.string.isRequired,
    image: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isAddItemButton: PropTypes.bool,
    disablePress: PropTypes.bool,
  };

  static defaultProps = {
    data1: '',
    image: '',
    isAddItemButton: false,
    disablePress: false,
  };

  state = {
    animatedTouchScale: new Animated.Value(1),
  }

  animationStep = (toValue, callback, duration) => {
    const { animatedTouchScale } = this.state;
    Animated.timing(animatedTouchScale, {
      toValue,
      duration: duration || 100,
      useNativeDriver: true,
    }).start(callback);
  }

  // Scale the button down when the user "hovers" on it
  handlePressIn = () => this.animationStep(0.95);

  // Always scale out again, regardless if the touch is cancelled
  handlePressOut = () => this.animationStep(1);

  // If the user taps without holding, then animate in, trigger onPress, and animate out
  handlePress = () => {
    // onPress is an external function. Ex:
    // () => Alert.alert("Don't stop... (づ｡◕‿‿◕｡)づ")
    const { onPress } = this.props;
    onPress();
  }

  render() {
    const { animatedTouchScale } = this.state;
    const {
      data1, data2, image, isAddItemButton, disablePress,
    } = this.props;
    const output = isAddItemButton ? (
      <Animated.View
        style={[
          detailsItemStyles.container,
          // We'll scale the button down on touches
          { transform: [{ scale: animatedTouchScale }] },
        ]}
      >
        <Feather
          name="plus"
          size={18}
          color="white"
        />
      </Animated.View>
    ) : (
      <Animated.View
        style={[
          detailsItemStyles.container,
          { zIndex: 1, transform: [{ scale: animatedTouchScale }] },
          !!image && detailsItemStyles.containerImage,
        ]}
      >
        {!!image && (
          <Image source={{ uri: image }} style={detailsItemStyles.image} resizeMode="cover" />
        )}
        {!!data1 && (
          <Text style={[detailsItemStyles.person, styles.whiteClr]}>
            {data1}
          </Text>
        )}
        <Text
          style={[
            detailsItemStyles.role,
            styles.whiteClr,
            !!image && detailsItemStyles.roleImage,
          ]}
        >
          {data2}
        </Text>
      </Animated.View>
    );

    if (disablePress) {
      return output;
    }

    return (
      <TouchableWithoutFeedback
         // Called first, when you first touch
        onPressIn={this.handlePressIn}
         // Called second, regardless if the touch is cancelled
        onPressOut={this.handlePressOut}
         // Called last, only when touch is released, but not if it's cancelled
        onPress={this.handlePress}
      >
        {output}
      </TouchableWithoutFeedback>
    );
  }
}

const detailsItemStyles = StyleSheet.create({
  container: {
    backgroundColor: trinaryColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 20,
    marginTop: 1,
    marginBottom: 1,
  },
  containerImage: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 20,
  },
  person: {
    fontSize: 14,
  },
  role: {
    fontSize: 18,
    alignSelf: 'center',
  },
  roleImage: {
    marginRight: 'auto',
  },
});
