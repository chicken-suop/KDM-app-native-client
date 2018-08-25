import PropTypes from 'prop-types';
import React from 'react';
import {
  View, Text, FlatList, StatusBar,
} from 'react-native';
import moment from 'moment';
import styles, { activeColor } from '../../Styles';
import daysData from '../../DaysData';
import DayItem from '../DayItem';
import elemHeight from '../../helpers/elemHeight';
import ScrollButton from '../ScrollButton';

export default class HomeScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.activeDayItem = daysData.find(e => (
      moment(e.date.fullDate).isSame(moment(), 'week')
    ));
    this.activeDayItemIndex = daysData.indexOf(this.activeDayItem);
    this.currentIndex = this.activeDayItemIndex;
  }

  state = {
    isAbove: 0,
  };

  scrollToActiveDayItemIndex = () => {
    this.flatListRef.scrollToIndex({ animated: true, index: this.activeDayItemIndex });
  }

  render() {
    const { isAbove } = this.state;
    const { navigation } = this.props;

    return (
      <View style={[styles.rowContainer, styles.blackBkgrnd, styles.absView]}>
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
        {isAbove !== 0 && (
          <ScrollButton
            scrollToActiveDayItemIndex={this.scrollToActiveDayItemIndex}
            isAbove={isAbove}
          />
        )}
      </View>
    );
  }
}
