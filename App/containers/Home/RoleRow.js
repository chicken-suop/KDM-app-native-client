import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import styles from '../../Styles';
import { daysDataItemRole } from '../../helpers/propTypes';

const RoleRow = ({
  itemRole, fontSize, alignLeft, restrictLen, active,
}) => {
  if (typeof itemRole !== 'string') {
    return (
      <Text
        style={[
          { fontSize, textAlignVertical: 'center', fontWeight: active ? 'bold' : '400' },
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
        { fontSize, textAlignVertical: 'center', fontWeight: active ? 'bold' : '400' },
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
  active: PropTypes.bool,
};

RoleRow.defaultProps = {
  fontSize: 14,
  alignLeft: false,
  restrictLen: true,
  active: false,
};

export default RoleRow;
