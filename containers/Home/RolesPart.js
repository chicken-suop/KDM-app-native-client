import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import {
  primaryColor,
  secondaryColor,
} from '../../Styles';

const RolesPart = ({ isActiveDayItem, children }) => (
  <View
    style={[
      {
        flex: 8,
        justifyContent: 'center',
        backgroundColor: primaryColor,
      },
      isActiveDayItem && {
        backgroundColor: secondaryColor,
      },
    ]}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {children}
    </View>
  </View>
);

RolesPart.propTypes = {
  isActiveDayItem: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RolesPart.defaultProps = {
  children: '',
};

export default RolesPart;
