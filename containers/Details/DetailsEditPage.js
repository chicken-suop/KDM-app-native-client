import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles, { secondaryColor } from '../../Styles';
import getLyrics from '../../api/musixmatch/getLyrics';
// import HeatMap from '../../components/HeatMap';

const windowHeight = Dimensions.get('window').height;

export default class DetailsEditPage extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
  };

  state = {
    // sameNameTasks: null,
    animatedEditPage: new Animated.Value(0),
    lyrics: '...',
  }

  // componentDidMount() {
  //   this.setState({ sameNameTasks: [{ id: 0, name: 'Welcome' }, { id: 1, name: 'Setup' }] });
  // }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      // sameNameTasks,
      animatedEditPage,
      itemType,
      itemTitle,
      itemSubTitle,
      lyrics,
    } = this.state;

    return (
      nextState.animatedEditPage !== animatedEditPage
      // || nextState.sameNameTasks !== sameNameTasks
      || nextState.itemType !== itemType
      || nextState.itemTitle !== itemTitle
      || nextState.itemSubTitle !== itemSubTitle
      || nextState.lyrics !== lyrics
    );
  }

  open = (itemType, itemTitle, itemSubTitle) => {
    if (itemType === 'song') {
      this.loadLyrics(itemTitle, itemSubTitle);
    }
    this.setState({ itemType, itemTitle, itemSubTitle }, () => {
      const { animatedEditPage } = this.state;
      Animated.parallel([
        Animated.timing(animatedEditPage, {
          toValue: 1,
          duration: 250,
        }),
      ], { useNativeDriver: true }).start();
    });
  }

  close = () => {
    const { animatedEditPage } = this.state;
    Animated.parallel([
      Animated.timing(animatedEditPage, {
        toValue: 0,
        duration: 200,
      }),
    ], { useNativeDriver: true }).start(() => this.setState({ itemType: '' }));
  }

  reschedule = () => {
    this.close();
  }

  delete = () => {
    this.close();
  }

  handlePress = (type) => {
    const { itemType } = this.state;
    if (itemType === 'role' && type === 'itemTitle') {
      // Open person selector
    } else if (itemType === 'role' && type === 'itemSubTitle') {
      // Open role selector
    } else if (itemType === 'song') {
      // Open song selector for both
    }
  }

  async loadLyrics(itemTitle, itemSubTitle) {
    console.log('Getting lyrics');
    this.setState({ lyrics: '...' });

    const newLyrics = await getLyrics({
      track: itemTitle,
      artist: itemSubTitle,
    });

    this.setState({ lyrics: newLyrics });
    console.log('Updated lyrics');
  }

  render() {
    const {
      // sameNameTasks,
      animatedEditPage,
      itemType,
      itemTitle,
      itemSubTitle,
      lyrics,
    } = this.state;
    const { date } = this.props;

    if (itemType) {
      return (
        <TouchableWithoutFeedback onPress={this.close}>
          <Animated.View
            style={[
              styles.absView,
              detailsEditPageStyles.background,
              {
                backgroundColor: animatedEditPage.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)'],
                }),
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  detailsEditPageStyles.panel,
                  {
                    transform: [{
                      translateY: animatedEditPage.interpolate({
                        inputRange: [0, 1],
                        outputRange: [windowHeight, 0],
                      }),
                    }],
                  },
                ]}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1,
                  }}
                >
                  <TouchableOpacity onPress={this.close}>
                    <Feather
                      name="arrow-down"
                      size={28}
                      color="#fff"
                      style={{ padding: 20 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={detailsEditPageStyles.topPart}>
                  <View style={[detailsEditPageStyles.paragraph, { marginTop: 0 }]}>
                    <TouchableOpacity onPress={() => this.handlePress('itemTitle')}>
                      <Text style={[styles.whiteClr, { fontSize: 26, marginBottom: 10 }]}>
                        {itemTitle}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handlePress('itemSubTitle')}>
                      <Text style={detailsEditPageStyles.paragraphBody}>
                        {itemSubTitle}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={this.reschedule}>
                    <View style={detailsEditPageStyles.paragraph}>
                      <Text style={detailsEditPageStyles.paragraphTitle}>
                        SCHEDULE
                      </Text>
                      <Text style={detailsEditPageStyles.paragraphBody}>
                        {moment(date).format('ddd D MMM')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {itemType === 'song' && (
                    <View style={detailsEditPageStyles.paragraph}>
                      <Text style={detailsEditPageStyles.paragraphTitle}>
                        Lyrics
                      </Text>
                      <Text style={detailsEditPageStyles.paragraphBody}>
                        {(lyrics === '...' || lyrics === 'No lyrics found.'
                          ? lyrics
                          : `${lyrics.substring(0, 97)}...`)}
                      </Text>
                    </View>
                  )}
                  {/* {itemType === 'role' && !!sameNameTasks && (
                    <View style={detailsEditPageStyles.paragraph}>
                      <Text style={detailsEditPageStyles.paragraphTitle}>
                        ALSO DOING
                      </Text>
                      <Text style={detailsEditPageStyles.paragraphBody}>
                        {sameNameTasks.map(task => task.name).join(', ')}
                      </Text>
                    </View>
                  )}
                  {itemType === 'role' && (
                    <HeatMap user={0} />
                  )} */}
                </View>
                <View style={detailsEditPageStyles.deleteButtonContainer}>
                  <TouchableOpacity oonPress={this.delete}>
                    <View style={detailsEditPageStyles.deleteButton}>
                      <Text
                        style={[
                          styles.whiteClr,
                          styles.centerText,
                          styles.fntWt600,
                          { fontSize: 18 },
                        ]}
                      >
                        DELETE
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View />
    );
  }
}

const detailsEditPageStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  panel: {
    position: 'relative',
    backgroundColor: secondaryColor,
    borderRadius: 10,
  },
  topPart: {
    padding: 30,
  },
  paragraph: {
    marginVertical: 20,
  },
  paragraphTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 5,
  },
  paragraphBody: {
    color: 'white',
    fontWeight: '200',
    fontSize: 16,
  },
  deleteButtonContainer: {
    height: 60,
    width: '100%',
    backgroundColor: secondaryColor,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
