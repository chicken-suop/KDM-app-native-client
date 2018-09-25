import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles, { secondaryColor } from '../../Styles';
import getLyrics from '../../api/musixmatch/getLyrics';
import VariableHeightModal from '../../components/VariableHeightModal';

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
      lyrics: '...',
      itemType: props.navigation.getParam('itemType'),
      itemTitle: props.navigation.getParam('itemTitle'),
      itemSubTitle: props.navigation.getParam('itemSubTitle'),
    };
  }

  reschedule = () => {
    const { navigation } = this.props;
    navigation.navigate('Schedule');
  }

  delete = () => {}

  handlePress = (type) => {
    const { itemType } = this.state;
    const { navigation } = this.props;
    if (itemType === 'role' && type === 'itemTitle') {
      navigation.navigate('AddItem', {
        type: 'people',
        onChoose: () => {
          // Send to server
        },
      });
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
      itemType,
      itemTitle,
      itemSubTitle,
      lyrics,
    } = this.state;
    const { navigation } = this.props;
    const date = navigation.getParam('date');

    return (
      <VariableHeightModal goBack={() => navigation.goBack()}>
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
      </VariableHeightModal>
    );
  }
}

const detailsEditPageStyles = StyleSheet.create({
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
