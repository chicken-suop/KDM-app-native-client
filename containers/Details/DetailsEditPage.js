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
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles, { secondaryColor } from '../../Styles';
import getLyrics from '../../api/musixmatch/getLyrics';

const windowHeight = Dimensions.get('window').height;

export default class DetailsEditPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      animatedEditPage: new Animated.Value(0),
      lyrics: '...',
      itemType: props.navigation.getParam('itemType'),
      itemTitle: props.navigation.getParam('itemTitle'),
      itemSubTitle: props.navigation.getParam('itemSubTitle'),
    };
  }

  componentWillMount() {
    const { animatedEditPage } = this.state;
    Animated.timing(animatedEditPage, {
      toValue: 1,
      easing: Easing.out(Easing.quad),
      duration: 200,
    }).start();
  }

  close = () => {
    const { animatedEditPage } = this.state;
    const { navigation } = this.props;
    Animated.timing(animatedEditPage, {
      toValue: 0,
      easing: Easing.in(Easing.quad),
      duration: 200,
    }).start(() => navigation.goBack());
  }

  reschedule = () => {
    this.close();
  }

  delete = () => {
    this.close();
  }

  handlePress = (type) => {
    const { itemType } = this.state;
    const { navigation } = this.props;
    if (itemType === 'role' && type === 'itemTitle') {
      // Open person selector
    } else if (itemType === 'role' && type === 'itemSubTitle') {
      navigation.navigate('AddItem', {
        type: 'roles',
        onChoose: () => {
          // Send to server
        },
      });
    } else if (itemType === 'song') {
      navigation.navigate('AddItem', {
        type: 'songs',
        onChoose: () => {
          // Send to server
        },
      });
    }
  }

  async loadLyrics(itemTitle, itemSubTitle) {
    this.setState({ lyrics: '...' });

    const newLyrics = await getLyrics({
      track: itemTitle,
      artist: itemSubTitle,
    });

    this.setState({ lyrics: newLyrics });
  }

  render() {
    const {
      animatedEditPage,
      itemType,
      itemTitle,
      itemSubTitle,
      lyrics,
    } = this.state;
    const { navigation } = this.props;
    const date = navigation.getParam('date');

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
                  lyrics === '...' ? (
                    <TouchableOpacity onPress={() => this.loadLyrics(itemTitle, itemSubTitle)}>
                      <View style={detailsEditPageStyles.paragraph}>
                        <Text style={detailsEditPageStyles.paragraphTitle}>
                          Lyrics
                        </Text>
                        <Text style={detailsEditPageStyles.paragraphBody}>
                          Get lyrics...
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={detailsEditPageStyles.paragraph}>
                      <Text style={detailsEditPageStyles.paragraphTitle}>
                        Lyrics
                      </Text>
                      <Text style={detailsEditPageStyles.paragraphBody}>
                        {(lyrics === 'No lyrics found.'
                          ? lyrics
                          : `${lyrics.substring(0, 97)}...`)}
                      </Text>
                    </View>
                  )
                )}
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
