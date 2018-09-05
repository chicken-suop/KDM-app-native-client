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
import styles, { secondaryColor, trinaryColor } from '../../Styles';
import DetailPage from './DetailPage';
import ToggleButton from '../../components/ToggleButton';

const detailScreenStyles = StyleSheet.create({
  container: {
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
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
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const detailPages = ['Roles', 'Songs', 'Absentees'];

const windowWidth = Dimensions.get('window').width;

export default class DetailsScreen extends React.Component {
  currentIndex = 0

  screenHeight = Dimensions.get('window').height

  animatedVal = new Animated.Value(0)

  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: (evt, { moveY, dy }) => (
      dy < 0 && (moveY > this.screenHeight - (this.screenHeight * 0.2))
    ),
    onPanResponderMove: Animated.event([null, { dy: this.animatedVal }]),
    onPanResponderRelease: (e, { vy, dy }) => {
      const { navigation } = this.props;
      if (dy < 0 && (Math.abs(vy) >= 0.5 || Math.abs(dy) >= 0.5 * this.screenHeight)) {
        navigation.goBack();
        Animated.timing(this.animatedVal, {
          toValue: -this.screenHeight,
          duration: 400,
          easing: Easing.out(Easing.poly(4)),
        }).start();
      } else {
        Animated.spring(this.animatedVal, {
          toValue: 0,
          bounciness: 10,
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
    attendance: true,
    loading: true,
  }

  componentWillMount() {
    this.allDetailPages = {};
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimensions = new Animated.ValueXY();
    this.activeDetailPageStyle = null;
    this.setState({ usingTransitionScale: true });
    this.transitionScale = new Animated.Value(0);
    Animated.timing(this.transitionScale, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
    }).start(() => { this.setState({ usingTransitionScale: false, loading: false }); });
  }

  openDetailPage = (index) => {
    if (index === this.currentIndex) {
      this.allDetailPages[index].measure((x, y, width, height, pageX, pageY) => {
        this.oldPosition.x = pageX;
        this.oldPosition.y = pageY;
        this.oldPosition.width = width;
        this.oldPosition.height = height;

        this.position.setValue({
          x: pageX,
          y: pageY,
        });

        this.dimensions.setValue({
          x: width,
          y: height,
        });

        this.setState({
          activeDetailPage: detailPages[index],
        }, () => {
          this.viewDetailPage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: 150,
                easing: Easing.elastic(1.5),
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY,
                duration: 150,
                easing: Easing.elastic(1.5),
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: 150,
                easing: Easing.elastic(1.5),
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                duration: 150,
                easing: Easing.elastic(1.5),
              }),
            ]).start();
          });
        });
      });
    }
  }

  closeDetailPage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 150,
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 150,
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 150,
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 150,
      }),
    ]).start(() => {
      this.setState({
        activeDetailPage: null,
      });
    });
  }

  scrollToIndex = (index) => {
    this.setState({
      activeDetailPage: detailPages[index],
    }, () => {
      this.allDetailPages[index].measure((x, y, width) => {
        this.scrollView.scrollTo({ animated: true, x: index * (width + 4) });
      });
    });
  }

  goBack = () => {
    this.setState({ usingTransitionScale: true });
    const { navigation } = this.props;
    navigation.goBack();
    this.transitionScale.setValue(1);
    Animated.timing(this.transitionScale, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
    }).start(() => { this.setState({ usingTransitionScale: false }); });
  }

  toggleAway = () => {
    this.setState(prevState => ({ attendance: !prevState.attendance }));
    // Send update data...
  }

  render() {
    const { navigation } = this.props;
    const {
      activeDetailPage, usingTransitionScale, attendance, loading,
    } = this.state;
    const item = navigation.getParam('item', {});

    const activeDetailPageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y,
    };

    if (loading) {
      return (
        <View style={{ flex: 1, backgroundColor: trinaryColor }}>
          <Animated.View
            style={{
              height: '80%',
              borderRadius: 5,
              margin: '10%',
              backgroundColor: secondaryColor,
              transform: [{ scale: this.transitionScale }],
            }}
          />
          <Animated.View
            style={{
              left: windowWidth * 0.8 + 4,
              position: 'absolute',
              height: '80%',
              width: '100%',
              margin: '10%',
              borderRadius: 5,
              backgroundColor: secondaryColor,
              transform: [{ scale: this.transitionScale }],
            }}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: trinaryColor,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: trinaryColor,
            transform: [{
              scale: usingTransitionScale
                ? this.transitionScale
                : this.animatedVal.interpolate({
                  inputRange: [-this.screenHeight, 0],
                  outputRange: [0.4, 1],
                }),
            }],

          }}
          {...this.panResponder.panHandlers}
        >
          <View style={{ height: '5%' }} />
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
                  key={pageTitle}
                  item={item}
                  pageTitle={pageTitle}
                  detailPageRef={(detailPage) => { this.allDetailPages[index] = detailPage; }}
                  openDetailPage={() => this.openDetailPage(index)}
                  closeDetailPage={() => {}}
                  swapPage={() => {}}
                />
              ))}
            </ScrollView>
          </View>
          <View style={[styles.rowContainer, detailScreenStyles.footer]}>
            <View style={styles.container}>
              <ToggleButton
                onPress={this.toggleAway}
                message="ATTENDING"
                options={['YES', 'NO']}
                chosenOption={attendance ? 'YES' : 'NO'}
                activeTextColor={trinaryColor}
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
          <View style={{ flex: 1 }} ref={(view) => { this.viewDetailPage = view; }}>
            <Animated.View
              style={[{
                top: 0, left: 0, height: null, width: null,
              }, activeDetailPageStyle]}
            >
              {activeDetailPage && (
                <DetailPage
                  detailPageRef={() => {}}
                  item={item}
                  pageTitle={activeDetailPage}
                  openDetailPage={() => {}}
                  closeDetailPage={() => { this.closeDetailPage(); }}
                  isFullScreen
                  swapPage={
                    () => this.scrollToIndex(detailPages.indexOf(activeDetailPage) === 0 ? 1 : 0)
                  }
                />
              )}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}
