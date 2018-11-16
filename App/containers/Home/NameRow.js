import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import styles from '../../Styles';
import { daysDataItemRolePerson } from '../../helpers/propTypes';

const NameRow = ({ person, fontSize, active }) => (
  <Text
    numberOfLines={1}
    style={[
      styles.primaryText,
      { textAlignVertical: 'center', fontSize, fontWeight: active ? 'bold' : '400' },
    ]}
  >
    {person && (
      typeof person !== 'string'
        ? `  •  ${person.name} ${person.lastName}`
        : `  •  ${person}`
    )}
  </Text>
);

NameRow.propTypes = {
  person: PropTypes.oneOfType([
    PropTypes.string,
    daysDataItemRolePerson,
  ]).isRequired,
  fontSize: PropTypes.number,
  active: PropTypes.bool,
};

NameRow.defaultProps = {
  fontSize: 14,
  active: false,
};

export default NameRow;
