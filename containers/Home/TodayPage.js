import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import moment from 'moment';
import daysData from '../../DaysData';
import styles, { activeColor } from '../../Styles';
import TodayPageParagraph from './TodayPageParagraph';
import Songs from './Songs';
import PullDownView from '../../components/PullDownView';

const TodayPage = () => {
  const activeWeekItem = daysData.find(e => (
    moment(e.date.fullDate).isSameOrAfter(moment(), 'day') // This comming Sunday
  ));

  const roles = {};
  Object.keys(activeWeekItem.roles).forEach((k) => {
    const { category, person } = activeWeekItem.roles[k];
    roles[category] = roles[category] || [];
    roles[category].push(`${person.name} ${person.lastName}`);
  });

  const paragraphs = {
    '9:15': [
      ['Setup', roles.Setup ? roles.Setup.join(', ') : ''],
      ['Cafeteria', roles.Cafeteria ? roles.Cafeteria.join(', ') : ''],
      ['Media', roles.Media ? roles.Media.join(', ') : ''],
      ['Welcome', roles.Welcome ? roles.Welcome.join(', ') : ''],
      ['Decisions', roles.Decisions ? roles.Decisions.join(', ') : ''],
    ],
    '11:00': [
      ['Service', roles.Service ? roles.Service.join(', ') : ''],
    ],
    '11:15': [
      ['Worship', roles.Worship ? roles.Worship.join(', ') : ''],
    ],
    '11:25': [
      ['Prayer', roles.Prayer ? roles.Prayer.join(', ') : ''],
      ['Collection', roles.Collection ? roles.Collection.join(', ') : ''],
      ['Worship', roles.Worship ? roles.Worship.join(', ') : ''],
      ['Translation', roles.Translation ? roles.Translation.join(', ') : ''],
    ],
    '11:35': [
      ['Sermon', roles.Sermon ? roles.Sermon.join(', ') : ''],
    ],
    '12:00': [
      ['Leading', roles.Leading ? roles.Leading.join(', ') : ''],
      ['Worship', roles.Worship ? roles.Worship.join(', ') : ''],
    ],
    '12:15': [
      ['Cafeteria', roles.Cafeteria ? roles.Cafeteria.join(', ') : ''],
    ],
  };

  return (
    <PullDownView
      view={<Songs songs={activeWeekItem.songs} />}
      style={{
        backgroundColor: 'black',
        flex: 1,
        padding: 30,
      }}
    >
      <StatusBar hidden />
      <View style={TodayPageStyles.header}>
        <Text style={[styles.fntWt700, { fontSize: 60, color: activeColor }]}>
          {activeWeekItem.date.number}
        </Text>
        <View>
          <Text style={[styles.fntWt700, { fontSize: 20, color: activeColor }]}>
            {`${activeWeekItem.date.month}`.toUpperCase()}
          </Text>
          <Text style={[styles.fntWt300, { fontSize: 20, color: activeColor }]}>
            Sunday
          </Text>
        </View>
      </View>
      {Object.entries(paragraphs).map(([time, data]) => (
        <TodayPageParagraph
          key={time}
          title={time}
          data={data}
        />
      ))}
    </PullDownView>
  );
};

const TodayPageStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default TodayPage;
