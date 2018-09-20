import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  ViewPropTypes,
} from 'react-native';

const Touchable = ({ onPress, style, children }) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={onPress}
      >
        <View style={style}>
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
};

Touchable.defaultProps = {
  style: {},
};

export default Touchable;
