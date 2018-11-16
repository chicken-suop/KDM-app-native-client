import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import propTypes from 'prop-types';

const ErrorView = ({ error }) => (
  <View>
    <Text>
      {error.message}
    </Text>
  </View>
);

ErrorView.propTypes = {
  error: propTypes.shape({
    message: propTypes.string,
  }).isRequired,
};

export default ErrorView;
