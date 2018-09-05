import PropTypes from 'prop-types';
import React from 'react';
import {
  Animated,
  Text,
} from 'react-native';
import moment from 'moment';
import styles from '../../Styles';
import { daysDataDate } from '../../helpers/propTypes';

const DateHeader = ({ date, style, fontSize }) => (
  <Animated.View style={[styles.rowContainer, { justifyContent: 'space-around', alignItems: 'center' }, style]}>
    <Text style={[styles.whiteClr, { fontSize }]}>
      {`${moment(date.fullDate).format('MMMM')} ${date.number}`.toUpperCase()}
    </Text>
  </Animated.View>
);

DateHeader.propTypes = {
  date: daysDataDate.isRequired,
  style: PropTypes.shape({}),
  fontSize: PropTypes.number,
};

DateHeader.defaultProps = {
  style: {},
  fontSize: 32,
};

export default DateHeader;
