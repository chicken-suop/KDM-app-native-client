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

export default class Schedule extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    this.offset = 0;
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this);
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };

    const scheduleDays = this.generateData();

    this.state = {
      // scrollPosition: 0,
      scheduleDays,
      currentMonth: 'October',
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

  handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    this.direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
  }

  handleViewableItemsChanged({ viewableItems }) {
    /* Updates the month in the header */

    // Select only months (we've got dates and months mixed in)
    const viewableMonth = viewableItems.filter(obj => !obj.item.includes('-'))[0];

    // this.direction is updated on scroll in the this.handleScroll method
    if (this.direction === 'down') {
      if (viewableMonth) {
        // We can see the month, but but don't update yet, cause it's at the bottom of the page
        this.nextMonth = viewableMonth.item;
      } else {
        // Okay, the month is no longer visible, so update header
        this.setState({ currentMonth: this.nextMonth });
      }
    } else if (this.direction === 'up') {
      if (viewableMonth) {
        // We can see the month so update it stright away
        this.nextMonth = moment().month(viewableMonth.item).subtract(1, 'months').format('MMMM');
        this.setState({ currentMonth: this.nextMonth });
      }
    }
  }

  // scrollToToday = () => {
  //   this.flatListRef.scrollToIndex({ animated: true, index: this.activeItemIndex });
  // }

  render() {
    const { scheduleDays, currentMonth } = this.state;
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
            {currentMonth.toUpperCase()}
          </Text>
          <View style={styles.headerButtons}>
            {/* This doesn't work with variable height renderItems in flatlist */}
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
            onViewableItemsChanged={this.handleViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
            renderItem={({ item }) => (
              <ScheduleItem
                date={item}
                scheduleDay={scheduleDays[item]}
                isActive={this.activeItemIndex === Object.keys(scheduleDays).indexOf(item)}
                isMonth={this.months.indexOf(item.substring(0, 3).toLowerCase()) !== -1}
                isFreeDay={scheduleDays[item].length === 0}
                navigation={navigation}
              />
            )}
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
