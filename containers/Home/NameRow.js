import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import styles from '../../Styles';
import { daysDataItemRolePerson } from '../../helpers/propTypes';

const NameRow = ({ person, fontSize }) => (
  <Text
    numberOfLines={1}
    style={[
      styles.whiteClr,
      {
        textAlignVertical: 'center', lineHeight: fontSize, fontSize, flex: 1,
      },
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
};

NameRow.defaultProps = {
  fontSize: 14,
};

export default NameRow;
