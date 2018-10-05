import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import moment from 'moment';
import styles, { activeColor } from '../../Styles';
import daysData from '../../DaysData';
import DayItem from './DayItem';
import elemHeightFunc from '../../helpers/elemHeight';
// import ScrollButton from './ScrollButton';

const elemHeight = elemHeightFunc(7);

export default class WeeksScreen extends React.Component {
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

  // state = {
  //   isAbove: 0,
  //   notScrolling: true,
  // };

  scrollToActiveDay = () => {
    this.flatListRef.scrollToIndex({ animated: true, index: this.activeDayItemIndex });
  }

  render() {
    const { navigation } = this.props;
    // const { isAbove, notScrolling } = this.state;

    return (
      <View
        style={[
          styles.rowContainer,
          styles.blackBkgrnd,
          styles.absView,
        ]}
      >
        <StatusBar hidden />
        <View style={{ justifyContent: 'flex-start', paddingTop: 45 }}>
          <Text
            style={[
              styles.fntWt400,
              styles.centerText,
              {
                fontSize: 18,
                color: activeColor,
                transform: [{ rotate: '-90deg' }],
              },
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
              { length: elemHeight, offset: elemHeight * index, index }
            )}
            snapToInterval={elemHeight}
            // May be performance issues with this. Could look at using onScrollEndDrag,
            // and calculating the index you'll end on
            // onScroll={(e) => {
            //   this.currentIndex = parseInt(e.nativeEvent.contentOffset.y / elemHeight, 10);
            //   if (this.currentIndex > this.activeDayItemIndex) {
            //     this.setState({ isAbove: true });
            //   } else if (this.currentIndex < this.activeDayItemIndex) {
            //     this.setState({ isAbove: false });
            //   } else if (isAbove !== 0) {
            //     this.setState({ isAbove: 0 });
            //   }
            // }}
          />
        </View>
        {/*
          Not using this because onTouch isn't triggered while
          scrolling causeing what looks like "lag".

          <ScrollButton
            scrollToActiveDay={this.scrollToActiveDay}
            isAbove={notScrolling ? isAbove : 0}
          />
        */}
      </View>
    );
  }
}
