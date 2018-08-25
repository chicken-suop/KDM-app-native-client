import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import styles from '../Styles';

const NameRow = ({ person }) => (
  <Text style={styles.whiteClr}>
    {`  •  ${person.name} ${person.lastName}`}
  </Text>
);

NameRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default NameRow;
