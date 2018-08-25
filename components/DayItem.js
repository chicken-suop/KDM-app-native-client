import PropTypes from 'prop-types';
import React from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import styles, { activeColor, secondaryColor, trinaryColor } from '../Styles';
import RoleRow from './RoleRow';
import NameRow from './NameRow';
import elemHeight from '../helpers/elemHeight';
import Fade from './Fade';

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
  rolesPart: {
    flex: 8,
    alignItems: 'center',
    backgroundColor: secondaryColor,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#1d3035',
  },
  rolesPartOdd: {
    backgroundColor: trinaryColor,
    borderColor: '#1c2e32',
  },
  rolesPartNameCol: {
    flex: 1,
  },
});

export default class DayItem extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      date: PropTypes.shape({
        fullDate: PropTypes.string.isRequired,
        month: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
      }).isRequired,
      roles: PropTypes.arrayOf(
        RoleRow.propTypes.role, // eslint-disable-line react/forbid-foreign-prop-types
      ).isRequired,
    }).isRequired,
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
            role={role}
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
          <View style={[dayItemStyles.rolesPart, (index % 2 !== 0) && dayItemStyles.rolesPartOdd]}>
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
