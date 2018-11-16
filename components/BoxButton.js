import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import { kindaBlackColor } from '../Styles';

const BoxButton = ({ onPress, style, children }) => (
  <View style={[styles.box, style]}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.boxText}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  box: {
    height: 60,
    marginTop: 12,
    borderRadius: 10,
  },
  boxText: {
    color: kindaBlackColor,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

BoxButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
};

BoxButton.defaultProps = {
  style: {},
};

export default BoxButton;
