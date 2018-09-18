import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import styles from '../../Styles';
import { daysDataItemRole } from '../../helpers/propTypes';

const RoleRow = ({
  itemRole, fontSize, alignLeft, restrictLen,
}) => {
  if (typeof itemRole !== 'string') {
    return (
      <Text
        style={[
          { fontSize, textAlignVertical: 'center' },
          styles.primaryText,
          !alignLeft && styles.textAlignRight,
        ]}
      >
        {itemRole.name.length && restrictLen > 10 ? `${itemRole.name.substring(0, 7)}...` : itemRole.name}
      </Text>
    );
  }
  return (
    <Text
      style={[
        { fontSize, textAlignVertical: 'center' },
        styles.primaryText,
        !alignLeft && styles.textAlignRight,
      ]}
    >
      {itemRole.length && restrictLen > 10 ? `${itemRole.substring(0, 7)}...` : itemRole}
    </Text>
  );
};

RoleRow.propTypes = {
  itemRole: PropTypes.oneOfType([
    PropTypes.string,
    daysDataItemRole,
  ]).isRequired,
  fontSize: PropTypes.number,
  alignLeft: PropTypes.bool,
  restrictLen: PropTypes.bool,
};

RoleRow.defaultProps = {
  fontSize: 12,
  alignLeft: false,
  restrictLen: true,
};

export default RoleRow;
