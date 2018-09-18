import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import moment from 'moment';
import SideMenu from '../../node_modules/react-native-side-menu';
import styles, { activeColor } from '../../Styles';
import daysData from '../../DaysData';
import DayItem from './DayItem';
import elemHeight from '../../helpers/elemHeight';
import ScrollButton from './ScrollButton';
import SidebarScreen from './SidebarScreen';

const windowWidth = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
  activeDayItem = daysData.find(e => (
    moment(e.date.fullDate).isSameOrAfter(moment(), 'day') // This comming Sunday
  ));

  activeDayItemIndex = daysData.indexOf(this.activeDayItem);

  currentIndex = this.activeDayItemIndex;

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    isAbove: 0,
  };

  scrollToActiveDay = () => {
    this.flatListRef.scrollToIndex({ animated: true, index: this.activeDayItemIndex });
  }

  render() {
    const { navigation } = this.props;
    const { isAbove } = this.state;

    return (
      <View style={styles.container}>
        <SideMenu
          menu={<SidebarScreen activeDayItem={this.activeDayItem} />}
          openMenuOffset={windowWidth - (windowWidth * 0.1)}
          animationFunction={(prop, value) => Animated.timing(prop, {
            toValue: value,
            duration: 400,
            easing: Easing.out(Easing.poly(4)),
          })}
        >
          <View
            style={[
              styles.rowContainer,
              styles.blackBkgrnd,
              styles.absView,
            ]}
          >
            <StatusBar hidden />
            <View style={{ justifyContent: 'center' }}>
              <Text
                style={[
                  styles.fntWt400,
                  styles.centerText,
                  { fontSize: 18, color: activeColor, transform: [{ rotate: '-90deg' }] },
                ]}
              >
                {moment(this.activeDayItem.date.fullDate).year()}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                removeClippedSubviews
                maxToRenderPerBatch={7} // Default: 10
                initialNumToRender={7} // Default: 10
                windowSize={11} // Default: 21
                ref={(list) => { this.flatListRef = list; }}
                data={daysData}
                renderItem={({ item, index }) => (
                  <DayItem
                    item={item}
                    index={index}
                    currentIndex={this.currentIndex}
                    isActiveDayItem={(this.activeDayItem === item)}
                    navigation={navigation}
                  />
                )}
                initialScrollIndex={this.activeDayItemIndex}
                keyExtractor={item => item.date.fullDate}
                getItemLayout={(data, index) => (
                  { length: elemHeight(7), offset: elemHeight(7) * index, index }
                )}
                snapToInterval={elemHeight(7)}
                // May be performance issues with this. Could look at using onScrollEndDrag,
                // and calculating the index you'll end on
                onScroll={(e) => {
                  this.currentIndex = parseInt(e.nativeEvent.contentOffset.y / elemHeight(7), 10);
                  if (this.currentIndex > this.activeDayItemIndex) {
                    this.setState({ isAbove: true });
                  } else if (this.currentIndex < this.activeDayItemIndex) {
                    this.setState({ isAbove: false });
                  } else if (isAbove !== 0) {
                    this.setState({ isAbove: 0 });
                  }
                }}
              />
            </View>
            <ScrollButton
              scrollToActiveDay={this.scrollToActiveDay}
              isAbove={isAbove}
            />
          </View>
        </SideMenu>
      </View>
    );
  }
}
