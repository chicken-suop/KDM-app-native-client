import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Text,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import styles, { secondaryColor } from '../../Styles';
import DetailsItem from '../DetailsItem';

const detailScreenStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  innerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '98%',
    width: '100%',
    backgroundColor: secondaryColor,
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'space-around',
  },
  scrollViewTitle: {
    fontSize: 12,
    paddingBottom: 10,
  },
});

const DetailScreen = ({ navigation }) => {
  const item = navigation.getParam('item', {});

  return (
    <View style={detailScreenStyles.outerContainer}>
      <View style={detailScreenStyles.innerContainer}>
        <View style={[styles.rowContainer, detailScreenStyles.header]}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={styles.container}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                size={32}
                color="white"
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.container, { flex: 6 }]}>
            <Text style={[styles.whiteClr, styles.title]}>
              {`${moment(item.fullDate).format('MMMM')} ${item.date.number}`.toUpperCase()}
            </Text>
          </View>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                size={32}
                color="white"
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{ flex: 10, flexDirection: 'row', justifyContent: 'center' }}>
          <ScrollView style={{ flex: 1 }}>
            <Text
              style={[
                detailScreenStyles.scrollViewTitle,
                styles.whiteClr,
                styles.centerText,
              ]}
            >
              ROLES
            </Text>
            {item.roles.map(role => (
              <DetailsItem role={role} key={role.id} />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

DetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default DetailScreen;
