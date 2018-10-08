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
import WeekItem from './WeekItem';
import elemHeightFunc from '../../helpers/elemHeight';
// import ScrollButton from './ScrollButton';

const elemHeight = elemHeightFunc();

export default class WeeksScreen extends React.Component {
  activeWeekItem = daysData.find(e => (
    moment(e.date.fullDate).isSameOrAfter(moment(), 'day') // This comming Sunday
  ));

  activeWeekItemIndex = daysData.indexOf(this.activeWeekItem);

  // currentIndex = this.activeWeekItemIndex;

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
    this.flatListRef.scrollToIndex({ animated: true, index: this.activeWeekItemIndex });
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
            {moment(this.activeWeekItem.date.fullDate).year()}
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
              <WeekItem
                item={item}
                index={index}
                isActiveWeekItem={(this.activeWeekItem === item)}
                navigation={navigation}
              />
            )}
            initialScrollIndex={this.activeWeekItemIndex}
            keyExtractor={item => item.date.fullDate}
            getItemLayout={(data, index) => (
              { length: elemHeight, offset: elemHeight * index, index }
            )}
            snapToInterval={elemHeight}
            // May be performance issues with this. Could look at using onScrollEndDrag,
            // and calculating the index you'll end on
            // onScroll={(e) => {
            //   this.currentIndex = parseInt(e.nativeEvent.contentOffset.y / elemHeight, 10);
            //   if (this.currentIndex > this.activeWeekItemIndex) {
            //     this.setState({ isAbove: true });
            //   } else if (this.currentIndex < this.activeWeekItemIndex) {
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
