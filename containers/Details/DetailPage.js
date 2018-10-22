import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Snackbar from '../../components/Snackbar';
import styles, { activeColor, secondaryColor } from '../../Styles';
import { daysData } from '../../helpers/propTypes';
import DetailsItem from './DetailsItem';

const windowWidth = Dimensions.get('window').width;

export default class DetailPage extends React.Component {
  static propTypes = {
    item: daysData.item.isRequired,
    pageTitle: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedOpacity: new Animated.Value(0),
      item: props.item,
      pageTitle: props.pageTitle,
      addItemType: props.pageTitle.toLowerCase(),
      snackbarVisibile: false,
    };
  }

  componentWillMount() {
    const { animatedOpacity } = this.state;
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    const { pageTitle } = this.props;
    if (pageTitle !== nextProps.pageTitle) {
      this.setState({
        item: nextProps.item,
        pageTitle: nextProps.pageTitle,
        addItemType: nextProps.pageTitle.toLowerCase(),
      });
    }
  }

  onCloseAddItem = () => {
    // Reset the title after selecting a person
    const { pageTitle, addItemType } = this.state;
    if (pageTitle === 'Roles' && addItemType === 'people') {
      this.setState({
        addItemType: 'roles',
      });
    }
  }

  onChooseAddItem = () => {
    // Update server here.
    const { pageTitle, addItemType } = this.state;
    if (pageTitle === 'Roles' && addItemType === 'roles') {
      this.setState({
        snackbarVisibile: true,
      });
    } else if (pageTitle === 'Roles' && addItemType === 'people') {
      // Reset the title after selecting a person
      this.setState({
        addItemType: 'roles',
      });
    }
  }

  getUnavailablePeople = () => [
    {
      id: 0,
      image: 'https://randomuser.me/api/portraits/men/94.jpg',
      name: 'John',
      lastName: 'Doe',
    },
    {
      id: 1,
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      name: 'Marty',
      lastName: 'Doe',
    },
    {
      id: 2,
      image: 'https://randomuser.me/api/portraits/men/13.jpg',
      name: 'Bob',
      lastName: 'Gills',
    },
  ]

  closeDetailPage = () => {
    const { navigation } = this.props;
    const { animatedOpacity } = this.state;
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.navigate('Schedule');
  }

  render() {
    const {
      navigation,
    } = this.props;
    const {
      item,
      animatedOpacity,
      pageTitle,
      addItemType,
      snackbarVisibile,
    } = this.state;
    const UnavailablePeople = this.getUnavailablePeople();

    return (
      <View>
        <View
          style={[
            detailPageStyles.container,
            {
              width: '100%',
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
            },
          ]}
        >
          <View style={{ height: '80%' }}>
            <ScrollView contentContainerStyle={detailPageStyles.scrollView}>
              {pageTitle === 'Roles' && (
                item.roles.map(role => (
                  <DetailsItem
                    data1={`${role.person.name} ${role.person.lastName}`}
                    data2={role.name}
                    key={role.id}
                    onPress={() => navigation.navigate('DetailsEdit', {
                      date: item.date.fullDate,
                      itemType: 'role',
                      itemTitle: `${role.person.name} ${role.person.lastName}`,
                      itemSubTitle: role.name,
                    })}
                  />
                ))
              )}
              {pageTitle === 'Songs' && (
                item.songs.map(song => (
                  <DetailsItem
                    data1={song.artist}
                    data2={song.name}
                    key={song.id}
                    onPress={() => navigation.navigate('DetailsEdit', {
                      date: item.date.fullDate,
                      itemType: 'song',
                      itemTitle: song.name,
                      itemSubTitle: song.artist,
                    })}
                  />
                ))
              )}
              {pageTitle === 'Unavailable People' && (
                UnavailablePeople.map(UnavailablePerson => (
                  <DetailsItem
                    image={UnavailablePerson.image}
                    data2={`${UnavailablePerson.name} ${UnavailablePerson.lastName}`}
                    key={UnavailablePerson.id}
                    disablePress
                    onPress={() => {}}
                  />
                ))
              )}
              {(pageTitle === 'Roles' || pageTitle === 'Songs') && (
                <Animated.View
                  style={{
                    width: '100%',
                    opacity: animatedOpacity,
                    transform: [{
                      translateY: animatedOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-80, 0],
                      }),
                    }],
                  }}
                >
                  <DetailsItem
                    isAddItemButton
                    data1=""
                    data2=""
                    onPress={() => {
                      this.setState({ snackbarVisibile: false });
                      navigation.navigate('AddItem', {
                        type: addItemType,
                        onClose: this.onCloseAddItem,
                        onChoose: this.onChooseAddItem,
                      });
                    }}
                  />
                </Animated.View>
              )}
            </ScrollView>
          </View>
          <View style={[styles.rowContainer, detailPageStyles.footer]}>
            <View style={detailPageStyles.pageTitle}>
              <Text style={[styles.whiteClr, styles.centerText, { fontSize: 24 }]}>
                {pageTitle}
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.closeDetailPage()}>
              <View style={detailPageStyles.closeButton}>
                <Ionicons
                  name="ios-close"
                  size={50}
                  color="white"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {snackbarVisibile && (
          <Snackbar
            visible={snackbarVisibile}
            textMessage="Role added"
            actionText="ASSIGN PERSON"
            actionColor={activeColor}
            actionHandler={() => {
              this.setState({
                snackbarVisibile: false,
                addItemType: 'people',
              });
              navigation.navigate('AddItem', {
                type: 'people',
                onClose: this.onCloseAddItem,
                onChoose: this.onChooseAddItem,
              });
            }}
            onDismiss={() => this.setState({
              snackbarVisibile: false,
            })}
          />
        )}
      </View>
    );
  }
}

const detailPageStyles = StyleSheet.create({
  container: {
    width: windowWidth * 0.8,
    height: '100%',
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 10,
    backgroundColor: secondaryColor,
    justifyContent: 'center',
  },
  scrollView: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'space-around',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    padding: 20,
  },
});
