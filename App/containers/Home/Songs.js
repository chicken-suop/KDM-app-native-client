import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import styles, { activeColor } from '../../Styles';

const Songs = ({ songs }) => (
  <View style={songsStyles.main}>
    <View style={songsStyles.header}>
      <Text style={[styles.fntWt700, { fontSize: 60, color: 'black' }]}>
        Songs
      </Text>
    </View>
    <View style={songsStyles.body}>
      {songs.map((song, index) => (
        <View style={songsStyles.song} key={song.id}>
          <View style={songsStyles.number}>
            <Text style={songsStyles.mainText}>
              {index + 1}
            </Text>
          </View>
          <View style={songsStyles.container}>
            <Text style={songsStyles.mainText}>
              {song.name}
            </Text>
            <Text style={songsStyles.secondaryText}>
              {song.artist}
            </Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);

const songsStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  main: {
    backgroundColor: activeColor,
    flex: 1,
    padding: 30,
    paddingTop: 60,
  },
  body: {
    paddingLeft: 40,
    paddingTop: 25,
  },
  song: {
    marginBottom: 25,
    flexDirection: 'row',
  },
  number: {
    justifyContent: 'center',
    width: 25,
    height: 50,
  },
  container: {
    flex: 1,
  },
  mainText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  secondaryText: {
    fontSize: 20,
    color: '#000',
  },
});

Songs.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Songs;
