import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import moment from 'moment';
import styles, { hexToRgbA, activeColor } from '../Styles';

const allSundays = () => {
  const start = moment().startOf('year');
  if (start.isoWeekday() !== 0) {
    start.add(1, 'weeks').isoWeekday(0);
  }
  const end = moment(start).endOf('year');
  const numTasksForUser = {
    '2018-08-05': 1,
    '2018-08-12': 1,
    '2018-08-19': 1,
    '2018-08-26': 1,
    '2018-09-02': 1,
    '2018-09-09': 1,
    '2018-09-16': 1,
    '2018-09-23': 3,
    '2018-09-30': 1,
    '2018-10-07': 1,
    '2018-10-14': 2,
    '2018-10-21': 1,
    '2018-10-28': 1,
    '2018-11-04': 1,
    '2018-11-11': 1,
    '2018-11-18': 1,
    '2018-11-25': 2,
    '2018-12-02': 1,
    '2018-12-09': 1,
    '2018-12-16': 3,
    '2018-12-23': 1,
    '2018-12-30': 1,
  };
  const months = [];
  const sundays = {};
  const opacitiesForNumTasks = {};
  while (start.isBefore(end)) {
    const month = start.format('MMM');

    if (months.indexOf(month) === -1) {
      months.push(month);
    }

    if (sundays[month]) {
      sundays[month].push(start.format('D'));
    } else {
      sundays[month] = [start.format('D')];
    }

    const thisTask = numTasksForUser[start.format('YYYY-MM-DD')];
    const opac = thisTask
      ? Math.round(thisTask / Math.max(...Object.values(numTasksForUser)) * 100) / 100
      : 0;
    if (opacitiesForNumTasks[month]) {
      opacitiesForNumTasks[month].push(opac);
    } else {
      opacitiesForNumTasks[month] = [opac];
    }

    start.add(1, 'weeks');
  }
  return { sundays, months, opacitiesForNumTasks };
};

const HeatMap = () => {
  const { sundays, months, opacitiesForNumTasks } = allSundays();
  return (
    <ScrollView
      contentContainerStyle={HeatMapStyles.container}
      decelerationRate={0}
      horizontal
    >
      {months.map(month => (
        <View style={HeatMapStyles.monthCol} key={month} onStartShouldSetResponder={() => true}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
            <Text style={[styles.centerText, HeatMapStyles.text]}>
              {month.toUpperCase()}
            </Text>
          </View>
          {sundays[month].map((sunday, i) => (
            <View
              style={[
                HeatMapStyles.day,
                { backgroundColor: hexToRgbA(activeColor, opacitiesForNumTasks[month][i]) },
              ]}
              key={sunday}
            >
              <Text style={[styles.whiteClr, styles.centerText]}>
                {sunday}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const HeatMapStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  monthCol: {
    marginHorizontal: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 50,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: activeColor,
  },
});


export default HeatMap;
