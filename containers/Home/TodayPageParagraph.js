import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RoleRow from './RoleRow';
import NameRow from './NameRow';

const TodayPageParagraph = ({ title, data }) => (
  <View style={TodayPageParagraphStyles.main}>
    <Text style={TodayPageParagraphStyles.title}>
      {title}
    </Text>
    <View style={TodayPageParagraphStyles.body}>
      <View>
        {data.map(arr => <RoleRow key={arr[0]} itemRole={arr[0]} alignLeft restrictLen={false} />)}
      </View>
      <View style={{ flex: 1 }}>
        {data.map(arr => <NameRow key={arr[0]} person={arr[1]} />)}
      </View>
    </View>
  </View>
);

const TodayPageParagraphStyles = StyleSheet.create({
  main: {
    marginTop: 25,
    paddingLeft: '8%',
  },
  title: {
    fontSize: 17,
    color: '#999',
  },
  body: {
    marginTop: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

TodayPageParagraph.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default TodayPageParagraph;
