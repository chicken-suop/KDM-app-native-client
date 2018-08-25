import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import styles from '../Styles';
import NameRow from './NameRow';

const roleRowStyles = StyleSheet.create({
  roleRow: {
    fontSize: 12,
  },
});

const RoleRow = ({ role }) => (
  <Text style={[roleRowStyles.roleRow, styles.whiteClr, styles.textAlignRight]}>
    {role.name.length > 10 ? `${role.name.substring(0, 7)}...` : role.name}
  </Text>
);

RoleRow.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    person: NameRow.propTypes.person,
  }).isRequired,
};

export default RoleRow;
