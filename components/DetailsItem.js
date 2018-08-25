import PropTypes from 'prop-types';
import React from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';
import NameRow from './NameRow';
import styles, { trinaryColor } from '../Styles';

const detailsItemStyles = StyleSheet.create({
  container: {
    backgroundColor: trinaryColor,
    flexDirection: 'row',
    flex: 1,
  },
  person: {

  },
  role: {

  },
});

const DetailsItem = ({ role }) => (
  <View style={detailsItemStyles.container}>
    <Text style={[detailsItemStyles.person, styles.whiteClr]}>
      {`${role.person.name} ${role.person.lastName}`}
    </Text>
    <Text style={[detailsItemStyles.role, styles.whiteClr]}>
      {role.name}
    </Text>
  </View>
);

DetailsItem.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    person: NameRow.propTypes.person,
  }).isRequired,
};

export default DetailsItem;
