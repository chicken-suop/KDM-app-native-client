import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import styles, { activeColor } from '../../Styles';
import daysData from '../../DaysData';
import ScheduleItem from './ScheduleItem';

export default class ScheduleScreen extends React.Component {
  activeScheduleItem = daysData.find(e => (
    moment(e.date.fullDate).isSameOrAfter(moment(), 'day') // This comming Sunday
  ));

  activeScheduleItemIndex = daysData.indexOf(this.activeScheduleItem);

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  scrollToToday = () => {
    this.flatListRef.scrollToIndex({ animated: true, index: this.activeScheduleItemIndex });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View
        style={[
          styles.blackBkgrnd,
          styles.absView,
          { flex: 1 },
        ]}
      >
        <StatusBar hidden />
        <View style={scheduleScreenStyles.header}>
          <Text style={[styles.fntWt700, { fontSize: 24, color: activeColor }]}>
            SEPTEMBER
          </Text>
          <View style={{ position: 'absolute', right: 30, flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={this.scrollToToday}>
              <Feather
                name="sun"
                size={24}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.addEvent}>
              <Feather
                name="plus"
                size={24}
                color="white"
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            removeClippedSubviews
            maxToRenderPerBatch={3} // Default: 10
            ref={(list) => { this.flatListRef = list; }}
            data={daysData}
            renderItem={({ item, index }) => (
              <ScheduleItem
                item={item}
                index={index}
                isActiveScheduleItem={(this.activeScheduleItem === item)}
                navigation={navigation}
              />
            )}
            initialScrollIndex={this.activeScheduleItemIndex}
            keyExtractor={item => item.date.fullDate}
          />
        </View>
      </View>
    );
  }
}

const scheduleScreenStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
});
