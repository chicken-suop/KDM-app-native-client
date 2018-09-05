import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryColorBorder,
  secondaryColorBorder,
} from '../../Styles';

const RolesPart = ({ isOdd, children }) => (
  <View
    style={[
      {
        flex: 8,
        justifyContent: 'center',
        backgroundColor: primaryColor,
        borderBottomWidth: 1,
        borderColor: primaryColorBorder,
      },
      isOdd && {
        backgroundColor: secondaryColor,
        borderColor: secondaryColorBorder,
      },
    ]}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {children}
    </View>
  </View>
);

RolesPart.propTypes = {
  isOdd: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RolesPart.defaultProps = {
  children: '',
};

export default RolesPart;
