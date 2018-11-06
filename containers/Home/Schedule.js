import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import defaultStyles, { activeColor } from '../../Styles';
import daysData from '../../DaysData';
import ScheduleItem from './ScheduleItem';

export default class ScheduleScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    this.schMntRefs = {};

    const scheduleDays = this.generateData();

    this.state = {
      // scrollPosition: 0,
      scheduleDays,
    };
  }

  generateData = () => {
    let daysInThreeMonths = 90;
    const arrDays = {};
    const startDate = moment().subtract(1, 'weeks');

    while (daysInThreeMonths) {
      const current = startDate.clone().day(90 - daysInThreeMonths);

      // Add day to arrDays
      arrDays[current.format()] = daysData.filter(e => (
        current.isBetween(moment(e.start), moment(e.end), 'days', '[]')
      ));

      if (current.isSame(moment(), 'day')) {
        this.activeItemIndex = Object.keys(arrDays).indexOf(current.format());
      }

      const endMntDate = current.clone().endOf('month');
      if (current.isSame(endMntDate, 'days')) {
        // Add month to arrDays
        endMntDate.add(1, 'M');
        arrDays[endMntDate.format('MMMM')] = endMntDate.format('MMMM');
      }
      daysInThreeMonths -= 1;
    }
    return arrDays;
  }

  // scrollToToday = () => {
  //   this.flatListRef.scrollToIndex({ animated: true, index: this.activeItemIndex });
  // }

  render() {
    const { scheduleDays } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView
        style={[
          defaultStyles.blackBkgrnd,
          defaultStyles.absView,
          { flex: 1 },
        ]}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            SEPTEMBER
          </Text>
          <View style={styles.headerButtons}>
            {/* <TouchableWithoutFeedback onPress={this.scrollToToday}>
              <Feather
                name="sun"
                size={24}
                color="white"
                style={styles.headerButton}
              />
            </TouchableWithoutFeedback> */}
            <TouchableWithoutFeedback onPress={this.addEvent}>
              <Feather
                name="plus"
                size={24}
                color="white"
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            // ref={(list) => { this.flatListRef = list; }}
            onScroll={this.handleScroll}
            removeClippedSubviews
            data={Object.keys(scheduleDays)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const isMonth = this.months.indexOf(item.substring(0, 3).toLowerCase()) !== -1;
              return (
                <ScheduleItem
                  date={item}
                  scheduleDay={scheduleDays[item]}
                  isActive={this.activeItemIndex === Object.keys(scheduleDays).indexOf(item)}
                  isMonth={isMonth}
                  isFreeDay={scheduleDays[item].length === 0}
                  navigation={navigation}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 26,
    color: activeColor,
  },
  headerButtons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
  },
  headerButton: {
    paddingRight: 20,
  },
  body: {
    flex: 1,
  },
});
