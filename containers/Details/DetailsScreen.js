import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { secondaryColor, primaryColor } from '../../Styles';
import DetailPage from './DetailPage';
import ToggleButton from '../../components/ToggleButton';

const detailScreenStyles = StyleSheet.create({
  header: {
    height: '5%',
  },
  container: {
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const detailPages = ['Roles', 'Songs', 'Absentees'];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class DetailsScreen extends React.Component {
  currentIndex = 0

  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: (evt, { moveY, dy }) => (
      dy < 0 && (moveY > windowHeight - (windowHeight * 0.2))
    ),
    onPanResponderMove: (e, gestureState) => {
      const { goBackAV } = this.state;
      return Animated.event([null, { dy: goBackAV }])(e, gestureState);
    },
    onPanResponderRelease: (e, { vy, dy }) => {
      const { goBackAV } = this.state;
      const { navigation } = this.props;
      if (dy < 0 && (Math.abs(vy) >= 0.5 || Math.abs(dy) >= 0.5 * windowHeight)) {
        navigation.goBack();

        Animated.timing(goBackAV, {
          toValue: -windowHeight,
          duration: 400,
          easing: Easing.out(Easing.poly(4)),
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(goBackAV, {
          toValue: 0,
          bounciness: 10,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    activeDetailPage: null,
    loading: true,
    goBackAV: new Animated.Value(-windowHeight),
    activePageWidth: new Animated.Value(0),
    activePageHeight: new Animated.Value(0),
    activePageLeft: new Animated.Value(0),
    activePageTop: new Animated.Value(0),
  }

  componentWillMount() {
    this.allDetailPages = {};
    this.oldPosition = {};
    this.activeDetailPageStyle = null;

    // Animate scale transition when detail screen opens
    const { goBackAV } = this.state;
    Animated.timing(goBackAV, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      useNativeDriver: true,
    }).start(() => this.setState({ loading: false }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      activeDetailPage,
      loading,
    } = this.state;
    return nextState.loading !== loading
      || nextState.activeDetailPage !== activeDetailPage;
  }

  // Get attendance data from server...
  getAttendance = () => {
    const naa = '';
    return true;
  }

  openDetailPage = (index) => {
    if (index === this.currentIndex) {
      const {
        activePageWidth, activePageHeight, activePageLeft, activePageTop,
      } = this.state;

      this.allDetailPages[index].measure((x, y, width, height, pageX, pageY) => {
        this.oldPosition = {
          x: pageX,
          y: pageY,
          width,
          height,
        };
        activePageWidth.setValue(width);
        activePageHeight.setValue(height);
        activePageLeft.setValue(pageX);
        activePageTop.setValue(pageY);

        this.setState({ activeDetailPage: detailPages[index] });
        Animated.parallel([
          Animated.timing(activePageWidth, {
            toValue: windowWidth,
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
          }),
          Animated.timing(activePageHeight, {
            toValue: windowHeight,
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
          }),
          Animated.timing(activePageLeft, {
            toValue: 0,
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
          }),
          Animated.timing(activePageTop, {
            toValue: 0,
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
          }),
        ], { useNativeDriver: true }).start();
      });
    }
  }

  closeDetailPage = () => {
    const {
      activePageWidth, activePageHeight, activePageLeft, activePageTop,
    } = this.state;

    Animated.parallel([
      Animated.timing(activePageWidth, {
        toValue: this.oldPosition.width,
        duration: 150,
        easing: Easing.out(Easing.poly(4)),
      }),
      Animated.timing(activePageHeight, {
        toValue: this.oldPosition.height,
        duration: 150,
        easing: Easing.out(Easing.poly(4)),
      }),
      Animated.timing(activePageLeft, {
        toValue: this.oldPosition.x,
        duration: 150,
        easing: Easing.out(Easing.poly(4)),
      }),
      Animated.timing(activePageTop, {
        toValue: this.oldPosition.y,
        duration: 150,
        easing: Easing.out(Easing.poly(4)),
      }),
    ], { useNativeDriver: true }).start(() => this.setState({ activeDetailPage: null }));
  }

  scrollToIndex = (index, delay) => {
    setTimeout(() => this.setState({ activeDetailPage: detailPages[index] }), delay);
    this.allDetailPages[index].measure((x, y, width) => {
      this.scrollView.scrollTo({ animated: true, x: index * (width + 4) });
    });
  }

  goBack = () => {
    const { goBackAV } = this.state;
    const { navigation } = this.props;
    navigation.goBack();

    // Animate scale transition when leaving detail screen
    goBackAV.setValue(0);
    Animated.timing(goBackAV, {
      toValue: -windowHeight,
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      useNativeDriver: true,
    }).start();
  }

  toggleAway = () => {
    // Send update data...
  }

  render() {
    const { navigation } = this.props;
    const {
      activeDetailPage,
      loading,
      goBackAV,
      activePageWidth,
      activePageHeight,
      activePageLeft,
      activePageTop,
    } = this.state;
    const item = navigation.getParam('item', {});

    const activeDetailPageStyle = {
      width: activePageWidth,
      height: activePageHeight,
      left: activePageLeft,
      top: activePageTop,
    };

    if (loading) {
      // Display minimal view for quicker, less laggy loading (I think, need to test it)
      return (
        <View style={{ flex: 1, backgroundColor: primaryColor }}>
          <Animated.View
            style={{
              flex: 1,
              transform: [{
                // Using interpolate so no state transitions are needed because of panResponder
                scale: goBackAV.interpolate({
                  inputRange: [-windowHeight, 0],
                  outputRange: [0.6, 1],
                }),
              }],
            }}
          >
            <View style={detailScreenStyles.header} />
            <Animated.View
              style={{
                borderRadius: 10,
                marginLeft: '10%',
                marginRight: '10%',
                height: '80%',
                backgroundColor: secondaryColor,
              }}
            />
            <Animated.View
              style={{
                borderRadius: 10,
                marginLeft: '10%',
                marginRight: '10%',
                height: '80%',
                backgroundColor: secondaryColor,
                position: 'absolute',
                top: '5%',
                bottom: '15%',
                left: windowWidth * 0.8 + 4,
              }}
            />
            <View style={detailScreenStyles.footer} />
          </Animated.View>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: primaryColor,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: primaryColor,
            transform: [{
              // Using interpolate so no state transitions are needed because of panResponder
              scale: goBackAV.interpolate({
                inputRange: [-windowHeight, 0],
                outputRange: [0.6, 1],
              }),
            }],

          }}
          {...this.panResponder.panHandlers}
        >
          <View style={detailScreenStyles.header} />
          <View style={detailScreenStyles.container}>
            <ScrollView
              contentContainerStyle={{ paddingLeft: 40, paddingRight: 40 }}
              decelerationRate={0}
              snapToInterval={windowWidth * 0.8 + 4}
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={(list) => { this.scrollView = list; }}
              onMomentumScrollEnd={(e) => {
                const offsetX = e.nativeEvent.contentOffset.x;
                const width = windowWidth * 0.8;
                this.currentIndex = Math.floor(offsetX / width);
              }}
            >
              {detailPages.map((pageTitle, index) => (
                <DetailPage
                  navigation={navigation}
                  key={pageTitle}
                  item={item}
                  pageTitle={pageTitle}
                  detailPageRef={(detailPage) => { this.allDetailPages[index] = detailPage; }}
                  openDetailPage={() => this.openDetailPage(index)}
                  closeDetailPage={() => {}}
                  changePage={() => {}}
                />
              ))}
            </ScrollView>
          </View>
          <View style={[styles.rowContainer, detailScreenStyles.footer]}>
            <View>
              <ToggleButton
                onPress={this.toggleAway}
                message="ATTENDING"
                options={['YES', 'NO']}
                chosenOption={this.getAttendance() ? 'YES' : 'NO'}
                activeTextColor={primaryColor}
              />
            </View>
            <TouchableWithoutFeedback onPress={this.goBack}>
              <View style={detailScreenStyles.closeButton}>
                <Ionicons
                  name="ios-close"
                  size={50}
                  color="white"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={activeDetailPage ? 'auto' : 'none'}
        >
          <View style={{ flex: 1 }}>
            <Animated.View
              style={[
                {
                  top: 0,
                  left: 0,
                  height: null,
                  width: null,
                },
                activeDetailPageStyle,
              ]}
            >
              {!!activeDetailPage && (
                <DetailPage
                  navigation={navigation}
                  detailPageRef={() => {}}
                  item={item}
                  pageTitle={activeDetailPage}
                  openDetailPage={() => {}}
                  closeDetailPage={() => { this.closeDetailPage(); }}
                  isFullScreen
                  changePage={(isForwards) => {
                    const index = detailPages.indexOf(activeDetailPage);
                    if (isForwards) {
                      this.scrollToIndex(
                        index + 1 < detailPages.length ? index + 1 : 0,
                        0,
                      );
                    } else {
                      this.scrollToIndex(
                        index - 1 >= 0 ? index - 1 : detailPages.length - 1,
                        0,
                      );
                    }
                  }}
                />
              )}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}