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
  PanResponder,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Fade from '../../components/Fade';
import styles, { secondaryColor } from '../../Styles';
import DetailsItem from './DetailsItem';
import { daysData } from '../../helpers/propTypes';

const screenWidth = Dimensions.get('window').width;

const detailPageStyles = StyleSheet.create({
  container: {
    width: screenWidth * 0.8,
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
    padding: 10,
  },
});

export default class DetailPage extends React.Component {
  animatedVal = new Animated.Value(0)

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (e, { dx }) => {
      const { isFullScreen } = this.props;
      return isFullScreen && Math.abs(dx) >= 20;
    },
    onPanResponderMove: (e, gestureState) => (
      Math.abs(gestureState.dx) >= 30
        ? null
        : Animated.event([null, { dx: this.animatedVal }])(e, gestureState)
    ),
    onPanResponderRelease: (e, { vx, dx }) => {
      if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 30) {
        const { swapPage } = this.props;
        swapPage();
      }
      Animated.spring(this.animatedVal, {
        toValue: 0,
        bounciness: 10,
      }).start();
    },
  });

  static propTypes = {
    item: daysData.item.isRequired,
    pageTitle: PropTypes.string.isRequired,
    detailPageRef: PropTypes.func.isRequired,
    openDetailPage: PropTypes.func.isRequired,
    closeDetailPage: PropTypes.func.isRequired,
    swapPage: PropTypes.func.isRequired,
    isFullScreen: PropTypes.bool,
  };

  static defaultProps = {
    isFullScreen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedOpacity: new Animated.Value(0),
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

    this.animatedVal.addListener((value) => { this.animatedValNumber = value; });
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

  addItem = () => {
    console.log('aa');
  }

  render() {
    const {
      item, detailPageRef, isFullScreen, openDetailPage,
    } = this.props;
    const { animatedOpacity, pageTitle } = this.state;
    const absentees = this.getAbsentees();

    return (
      <View
        style={[
          detailPageStyles.container,
          isFullScreen ? {
            width: '100%', borderRadius: 0, marginLeft: 0, marginRight: 0,
          } : {},
        ]}
        ref={detailPageRef}
      >
        <View
          style={{ flex: 1 }}
          {...this.panResponder.panHandlers}
        >
          <TouchableWithoutFeedback
            onPress={openDetailPage}
          >
            <View style={{ flex: 1 }}>
              <Animated.View
                style={{ height: '80%', transform: [{ translateX: this.animatedVal }] }}
              >
                <ScrollView
                  scrollEnabled={isFullScreen}
                  contentContainerStyle={detailPageStyles.scrollView}
                >
                  <Fade
                    visible
                    disableScale
                    duration={200}
                    disableMarginLeft
                    disableMarginRight
                    style={{
                      width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                    }}
                    onStartShouldSetResponder={() => isFullScreen}
                  >
                    {pageTitle === 'Roles' && (
                      item.roles.map(role => (
                        <DetailsItem data1={`${role.person.name} ${role.person.lastName}`} data2={role.name} key={role.id} />
                      ))
                    )}
                    {pageTitle === 'Songs' && (
                      item.songs.map(song => (
                        <DetailsItem data1={song.artist} data2={song.name} key={song.id} />
                      ))
                    )}
                    {pageTitle === 'Absentees' && (
                      absentees.map(absentee => (
                        <DetailsItem
                          image={absentee.image}
                          data2={`${absentee.name} ${absentee.lastName}`}
                          key={absentee.id}
                        />
                      ))
                    )}
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
                      <DetailsItem data1="" data2="" onPress={this.addItem} />
                    </Animated.View>
                  </Fade>
                </ScrollView>
              </Animated.View>
              <View style={[styles.rowContainer, detailPageStyles.footer]}>
                <Animated.View
                  style={[
                    detailPageStyles.pageTitle,
                    { transform: [{ translateX: this.animatedVal }] },
                  ]}
                >
                  <Fade visible disableScale duration={200} disableMarginLeft disableMarginRight>
                    <Text style={[styles.whiteClr, styles.centerText, { fontSize: 24 }]}>
                      {pageTitle}
                    </Text>
                  </Fade>
                </Animated.View>
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
        </View>
      </View>
    );
  }
}
