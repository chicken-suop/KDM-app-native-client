import Pluralize from 'pluralize';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Keyboard,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles, { secondaryColor } from '../../Styles';
import { daysData } from '../../helpers/propTypes';
import DetailsItem from './DetailsItem';
import AddItem from './AddItem';
import DetailsEditPage from './DetailsEditPage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default class DetailPage extends React.Component {
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (e, { moveX }) => {
      const { isFullScreen } = this.props;
      return isFullScreen
        && (moveX <= windowWidth * 0.1
          || moveX >= windowWidth - (windowWidth * 0.1)
        );
    },
    onPanResponderMove: (e, gestureState) => {
      const { animatedChangePage } = this.state;
      return Animated.event([null, { dx: animatedChangePage }])(e, gestureState);
    },
    onPanResponderRelease: (e, { vx, dx }) => {
      const { animatedChangePage } = this.state;
      if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 30) {
        const { changePage } = this.props;
        const durationOfAnimation = 100;
        // Delay state change until page is off screen
        changePage(dx < 0, durationOfAnimation);
        Animated.sequence([
          // Transition page to off screen
          Animated.timing(animatedChangePage, {
            toValue: dx < 0 ? -windowWidth : windowWidth,
            duration: durationOfAnimation,
          }),
          // Move the page to the other side of the screen
          Animated.timing(animatedChangePage, {
            toValue: dx < 0 ? windowWidth : -windowWidth,
            duration: 0,
          }),
          // A little delay to give setState enough time to update without seeing its effects
          Animated.delay(10),
          // Move the "next page" into view (really same page, but updated data);
          Animated.timing(animatedChangePage, {
            toValue: 0,
            duration: durationOfAnimation,
          }),
        ], { useNativeDriver: true }).start();
      } else {
        Animated.spring(animatedChangePage, {
          toValue: 0,
          bounciness: 10,
        }).start();
      }
    },
  });

  static propTypes = {
    item: daysData.item.isRequired,
    pageTitle: PropTypes.string.isRequired,
    detailPageRef: PropTypes.func.isRequired,
    openDetailPage: PropTypes.func.isRequired,
    closeDetailPage: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    isFullScreen: PropTypes.bool,
  };

  static defaultProps = {
    isFullScreen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedAddItem: new Animated.Value(0),
      animatedOpacity: new Animated.Value(0),
      animatedChangePage: new Animated.Value(0),
      pageTitle: props.pageTitle,
    };
    if (props.isFullScreen) {
      const { animatedOpacity } = this.state;
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }

  componentWillReceiveProps(newProps) {
    const { pageTitle } = this.props;
    if (pageTitle !== newProps.pageTitle) {
      this.setState({ pageTitle: newProps.pageTitle });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      item, isFullScreen,
    } = this.props;
    const { animatedOpacity, pageTitle } = this.state;

    if (!isFullScreen) {
      return false;
    }
    return (
      nextState.animatedOpacity !== animatedOpacity
        || nextState.pageTitle !== pageTitle
        || nextProps.item !== item
        || nextProps.isFullScreen !== isFullScreen
    );
  }

  getAbsentees = () => [
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
    const { closeDetailPage } = this.props;
    const { animatedOpacity } = this.state;
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    closeDetailPage();
  }

  openAddItem = () => {
    // Animation: Scroll view up and make it opaque
    const { animatedAddItem } = this.state;
    Animated.parallel([
      Animated.timing(animatedAddItem, {
        toValue: -windowHeight,
        duration: 300,
      }),
    ], { useNativeDriver: true }).start(() => {
      this.addItemSearchBox.focus();
    });
  }

  closeAddItem = () => {
    // Reverse of above this.openAddItem()
    const { animatedAddItem } = this.state;
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(animatedAddItem, {
        toValue: 0,
        duration: 300,
      }),
    ], { useNativeDriver: true }).start();
  }

  render() {
    const {
      item,
      detailPageRef,
      isFullScreen,
      openDetailPage,
    } = this.props;
    const {
      animatedOpacity,
      pageTitle,
      animatedAddItem,
      animatedChangePage,
    } = this.state;
    const absentees = this.getAbsentees();

    return (
      <View>
        <View
          style={[
            detailPageStyles.container,
            isFullScreen ? {
              width: '100%',
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
            } : {},
          ]}
          ref={detailPageRef}
        >
          <Animated.View
            style={{
              flex: 1,
              position: 'relative',
              transform: [{ translateX: animatedChangePage }, { translateY: animatedAddItem }],
              opacity: animatedAddItem.interpolate({
                inputRange: [-windowHeight * 0.5, 0],
                outputRange: [0, 1],
              }),
            }}
            {...this.panResponder.panHandlers}
          >
            <TouchableWithoutFeedback onPress={openDetailPage}>
              <View style={{ flex: 1 }}>
                <Animated.View style={{ height: '80%' }}>
                  <ScrollView
                    scrollEnabled={isFullScreen}
                    contentContainerStyle={detailPageStyles.scrollView}
                  >
                    {pageTitle === 'Roles' && (
                      item.roles.map(role => (
                        <DetailsItem
                          data1={`${role.person.name} ${role.person.lastName}`}
                          data2={role.name}
                          key={role.id}
                          disablePress={!isFullScreen}
                          onPress={() => this.editPage.open(
                            'role',
                            `${role.person.name} ${role.person.lastName}`,
                            role.name,
                          )}
                        />
                      ))
                    )}
                    {pageTitle === 'Songs' && (
                      item.songs.map(song => (
                        <DetailsItem
                          data1={song.artist}
                          data2={song.name}
                          key={song.id}
                          disablePress={!isFullScreen}
                          onPress={() => this.editPage.open(
                            'song',
                            song.name,
                            song.artist,
                          )}
                        />
                      ))
                    )}
                    {pageTitle === 'Absentees' && (
                      absentees.map(absentee => (
                        <DetailsItem
                          image={absentee.image}
                          data2={`${absentee.name} ${absentee.lastName}`}
                          key={absentee.id}
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
                        <DetailsItem data1="" data2="" onPress={this.openAddItem} isAddItemButton />
                      </Animated.View>
                    )}
                  </ScrollView>
                </Animated.View>
                <View style={[styles.rowContainer, detailPageStyles.footer]}>
                  <View style={detailPageStyles.pageTitle}>
                    <Text style={[styles.whiteClr, styles.centerText, { fontSize: 24 }]}>
                      {pageTitle}
                    </Text>
                  </View>
                  {isFullScreen
                    && (
                    <TouchableWithoutFeedback onPress={() => this.closeDetailPage()}>
                      <Animated.View style={[
                        detailPageStyles.closeButton,
                        {
                          opacity: animatedOpacity,
                        },
                      ]}
                      >
                        <Feather
                          name="minimize-2"
                          size={24}
                          color="white"
                        />
                      </Animated.View>
                    </TouchableWithoutFeedback>
                    )
                  }
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
          {isFullScreen && (pageTitle === 'Roles' || pageTitle === 'Songs') && (
            <Animated.View
              style={{
                height: animatedAddItem.interpolate({
                  inputRange: [-windowHeight, 0],
                  outputRange: [windowHeight, 0],
                }),
              }}
            >
              <AddItem
                addItemSearchBox={(addItemSearchBox) => {
                  this.addItemSearchBox = addItemSearchBox;
                }}
                closeAddItem={this.closeAddItem}
                title={pageTitle.toUpperCase()}
                subTitle={
                  pageTitle === 'Roles'
                    ? 'Once added, you\'ll be able to assign a person.'
                    : 'Select a song from the list, or create a new one'
                }
                itemSubTitle={`Add this new ${Pluralize.singular(pageTitle.toLowerCase())}`}
              />
            </Animated.View>
          )}
        </View>
        {isFullScreen && (
          <DetailsEditPage
            ref={(editPage) => { this.editPage = editPage; }}
            date={item.date.fullDate}
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
