import PropTypes from 'prop-types';
import React from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import styles, { activeColor } from '../../Styles';
import { daysData } from '../../helpers/propTypes';
import RoleRow from './RoleRow';
import NameRow from './NameRow';
import elemHeight from '../../helpers/elemHeight';
import Fade from '../../components/Fade';
import RolesPart from './RolesPart';

const dayItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: elemHeight(7),
  },
  datePart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePartNumber: {
    fontSize: 24,
  },
  datePartActive: {
    borderRightWidth: 2,
    borderRightColor: activeColor,
  },
  datePartActiveText: {
    color: activeColor,
  },
  rolesPartNameCol: {
    flex: 1,
  },
});

export default class DayItem extends React.Component {
  static propTypes = {
    item: daysData.item.isRequired,
    index: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    isActiveDayItem: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { itemId: 0 };
    this.generateRows();
  }

  // Temporary code to open detail view on load
  // componentWillMount() {
  //   const {
  //     item,
  //     index,
  //     isActiveDayItem,
  //     navigation,
  //   } = this.props;
  //
  //   if (isActiveDayItem) {
  //     navigation.push('Details', {
  //       id: index,
  //       item,
  //     });
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    const { itemId } = this.state;
    return itemId !== nextState.itemId && Math.abs(nextProps.currentIndex - nextProps.index) <= 6;
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  generateRows() {
    const { item } = this.props;
    const roleRows = [];
    const nameRows = [];

    // Iterate through roles in groups of four
    for (let i = 0; i < item.roles.length; i += 4) {
      const tmp1 = [];
      const tmp2 = [];

      // Every four items
      item.roles.slice(i, i + 4).forEach((role) => {
        tmp1.push(
          <RoleRow
            itemRole={role}
            key={role.id}
          />,
        );
        tmp2.push(
          <NameRow
            person={role.person}
            key={role.id}
          />,
        );
      });

      roleRows.push(tmp1);
      nameRows.push(tmp2);
    }

    this.roleRows = roleRows;
    this.nameRows = nameRows;

    const leng = this.roleRows.length;
    this.timeout = setInterval(() => {
      const { itemId } = this.state;
      if (itemId < leng - 1) {
        this.setState({ itemId: itemId + 1 });
      } else if (itemId !== 0) {
        this.setState({ itemId: 0 });
      }
    }, 5000);
  }

  render() {
    const {
      item,
      index,
      isActiveDayItem,
      navigation,
    } = this.props;
    const { itemId } = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => navigation.push('Details', {
        id: index,
        item,
      })}
      >
        <View style={dayItemStyles.container}>
          <View
            style={[
              dayItemStyles.datePart,
              isActiveDayItem && dayItemStyles.datePartActive,
            ]}
          >
            <Text
              style={[
                styles.fntWt300,
                isActiveDayItem ? dayItemStyles.datePartActiveText : styles.whiteClr,
              ]}
            >
              {item.date.month}
            </Text>
            <Text
              style={[
                styles.fntWt600,
                isActiveDayItem ? dayItemStyles.datePartActiveText : styles.whiteClr,
                dayItemStyles.datePartNumber,
              ]}
            >
              {item.date.number}
            </Text>
          </View>
          <RolesPart isOdd={index % 2 !== 0}>
            <Fade visible disableScale duration={200}>
              {this.roleRows && this.roleRows[itemId]}
            </Fade>
            <Fade
              visible
              disableScale
              disableMarginLeft
              marginLeft={10}
              duration={200}
              style={StyleSheet.flatten(dayItemStyles.rolesPartNameCol)}
            >
              {this.nameRows && this.nameRows[itemId]}
            </Fade>
          </RolesPart>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
