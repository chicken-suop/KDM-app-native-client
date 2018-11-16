import PropTypes from 'prop-types';
import React from 'react';
import {
  View, StyleSheet, Text, ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';
import { secondaryColor } from '../../Styles';

const Event = (props) => {
  const {
    isLast,
    title,
    start,
    end,
    location,
    category,
    sermon,
    lockup,
  } = props;

  const isSunday = title === 'Service';
  if (isSunday) {
    return (
      <ImageBackground
        source={require('../../assets/service-background.png')}
        style={[
          styles.event,
          { paddingTop: 30, justifyContent: 'flex-end' },
          isLast && { marginBottom: 0 },
        ]}
      >
        <Text style={styles.eventText}>
          {title}
        </Text>
        <Text style={styles.eventTextNormal}>
          {`${start}-${end}`}
          {category && `\n${category}`}
          {`\nSermon: ${sermon}`}
          {`\nLockup: ${lockup}`}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <Swipeout
      autoClose
      right={[{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 1, 0.6)',
        // onPress: () => this.deleteNote(rowData)
      }]}
      backgroundColor={secondaryColor}
      style={{ marginBottom: 5 }}
    >
      <View style={[styles.event, isLast && { marginBottom: 0 }]}>
        <Text style={styles.eventText}>
          {title}
        </Text>
        <Text style={styles.eventTextNormal}>
          {`${start}-${end} in ${location}`}
        </Text>
      </View>
    </Swipeout>
  );
};

Event.propTypes = {
  isLast: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  category: PropTypes.string,
  sermon: PropTypes.string,
  lockup: PropTypes.string,
};

Event.defaultProps = {
  category: '',
  sermon: '',
  lockup: '',
};

const styles = StyleSheet.create({
  event: {
    flex: 1,
    padding: 10,
    backgroundColor: secondaryColor,
  },
  eventText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  eventTextNormal: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Event;
