import PropTypes from 'prop-types';
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import defaultStyles, { secondaryColor, activeColor } from '../../Styles';
import { daysData } from '../../helpers/propTypes';

export default class DetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { navigation } = this.props;
    // const {} = this.state;
    const item = daysData[0];

    return (
      <SafeAreaView
        style={styles.main}
      >
        <View style={styles.header}>
          <Text style={[defaultStyles.whiteClr, styles.headerText]}>
            Barista training
          </Text>
          <TouchableOpacity onPress={() => {}} style={styles.closeButton}>
            <Feather
              name="x"
              size={40}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.paragraph}>
            <Text style={[defaultStyles.whiteClr, styles.headerText]}>
                Time
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.paragraphButton}>
                <Text style={[defaultStyles.whiteClr, styles.paragraphText]}>
                  {'Tuesday, 16 Sep\n11:30-13:30'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.paragraph}>
            <Text style={[defaultStyles.whiteClr, styles.headerText]}>
                Location
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.paragraphButton}>
                <Text style={[defaultStyles.whiteClr, styles.paragraphText]}>
                  {'Spotkawie'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.paragraph}>
            <Text style={[defaultStyles.whiteClr, styles.headerText]}>
                Notifications
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.paragraphButton}>
                <Text style={[defaultStyles.whiteClr, styles.paragraphText]}>
                  {'1 hour before'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.paragraphButton}>
                <Text style={[defaultStyles.whiteClr, styles.paragraphText]}>
                  {'Add another notification'}
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.paragraph}>
            <Text style={[defaultStyles.whiteClr, styles.headerText]}>
                People
            </Text>
            <Text style={[defaultStyles.whiteClr, styles.paragraphText]}>
              {'Tuesday, 16 Sep\n11:30-13:30'}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: secondaryColor,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 30,
    padding: 15,
  },
  body: {
    flex: 1,
  },
  paragraph: {
    marginBottom: 30,
  },
  paragraphButton: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraphText: {
    fontSize: 20,
  },
});
