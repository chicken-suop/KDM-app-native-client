import PropTypes from 'prop-types';
import React from 'react';
import {
  View, StyleSheet, Text, ImageBackground,
} from 'react-native';
import moment from 'moment';
import defaultStyles, { activeColor } from '../../Styles';
import images from '../../assets/index';
import Event from './ScheduleItemEvent';

export default class ScheduleItem extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    scheduleDay: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.string,
    ]).isRequired,
    isActive: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    isMonth: PropTypes.bool.isRequired,
    isFreeDay: PropTypes.bool.isRequired,
  }

  render() {
    const {
      date,
      scheduleDay,
      isActive,
      isMonth,
      isFreeDay,
      navigation,
    } = this.props;

    const theDate = isMonth ? date : moment(date);

    if (isMonth) {
      return (
        <ImageBackground
          source={images.months[date]}
          style={{ marginBottom: 30 }}
        >
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              paddingTop: 10,
              paddingHorizontal: 30,
              paddingBottom: 100,
            }}
          >
            <Text style={styles.monthDate} ref={(txt) => { this.heading = txt; }}>
              {date.toUpperCase()}
            </Text>
          </View>
        </ImageBackground>
      );
    }

    if (isFreeDay) {
      return (
        <View
          style={[
            styles.freeDay,
            isActive && { borderLeftColor: activeColor, borderLeftWidth: 2, paddingLeft: 5 },
          ]}
        >
          <Text style={[styles.freeDayDate, isActive && { color: activeColor }]}>
            {theDate.format('MMMM D')}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <View style={[styles.sideDate, isActive && { borderRightColor: activeColor }]}>
          <Text
            style={[
              defaultStyles.centerText,
              styles.sideDateText,
              isActive && { color: activeColor },
            ]}
          >
            {theDate.format('ddd').toUpperCase()}
          </Text>
          <Text
            style={[
              defaultStyles.centerText,
              styles.sideDateNum,
              isActive && { color: activeColor },
            ]}
          >
            {theDate.format('D')}
          </Text>
        </View>
        <View style={styles.events}>
          {scheduleDay.sort((a, b) => {
            // Sort by starting time desc.
            const t1 = parseFloat(a.start.replace(':', '.').replace(/[^\d.-]/g, ''));
            const t2 = parseFloat(b.end.replace(':', '.').replace(/[^\d.-]/g, ''));
            if (t1 < t2) return -1;
            if (t1 > t2) return 1;
            return 0;
          }).map((event, i) => {
            const sermon = event.people.filter(p => p.role.name === 'sermon');
            const lockup = event.people.filter(p => p.role.name === 'lockup');
            return (
              <Event
                key={event.id}
                isLast={i === 2}
                title={event.name}
                start={moment(event.start).format('H:mm')}
                end={moment(event.end).format('H:mm')}
                location={event.location.name}
                category={event.category !== null ? event.category.name : ''}
                sermon={sermon.length ? sermon[0].user.name : 'Not assigned'}
                lockup={lockup.length ? lockup[0].user.name : 'Not assigned'}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monthDate: {
    color: activeColor,
    fontSize: 26,
    fontWeight: '700',
  },
  freeDay: {
    marginLeft: 30,
    marginBottom: 30,
    justifyContent: 'center',
  },
  freeDayDate: {
    color: '#9B9B9B',
    fontWeight: '100',
    fontSize: 16,
  },
  main: {
    flexDirection: 'row',
    marginLeft: 30,
    flex: 1,
    marginBottom: 30,
  },
  sideDate: {
    flex: 1,
    marginRight: 10,
    borderRightWidth: 2,
  },
  sideDateText: {
    color: 'white',
    fontWeight: '100',
    fontSize: 16,
  },
  sideDateNum: {
    color: 'white',
    fontSize: 26,
  },
  events: {
    flex: 8,
  },
});
