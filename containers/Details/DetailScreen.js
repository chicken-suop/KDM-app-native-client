import PropTypes from 'prop-types';
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
          <Text style={[defaultStyles.whiteClr, { fontSize: 24 }]}>
            text
          </Text>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.closeButton}>
              <Ionicons
                name="ios-close"
                size={50}
                color="white"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: secondaryColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    // flexDirection: 'row',
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    right: 30,
    padding: 15,
  },
});
