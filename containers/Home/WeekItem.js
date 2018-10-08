import PropTypes from 'prop-types';
import React from 'react';
import {
  Text, View, StyleSheet, TouchableHighlight, LayoutAnimation,
} from 'react-native';
import styles, { activeColor, primaryColor, secondaryColor } from '../../Styles';
import { daysData } from '../../helpers/propTypes';
import RoleRow from './RoleRow';
import NameRow from './NameRow';
import elemHeight from '../../helpers/elemHeight';
import ToggleButton from '../../components/ToggleButton';

const fastSpring = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

export default class WeekItem extends React.Component {
  static propTypes = {
    item: daysData.item.isRequired,
    index: PropTypes.number.isRequired,
    isActiveWeekItem: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showingActions: false,
      available: true,
      roleRows: [],
      nameRows: [],
    };
  }

  componentWillMount() {
    this.generateRows(6);

    // Temporary code to open detail view on load
    // const {
    //   item,
    //   index,
    //   isActiveWeekItem,
    //   navigation,
    // } = this.props;
    //
    // if (isActiveWeekItem) {
    //   navigation.push('Details', {
    //     id: index,
    //     item,
    //   });
    // }
  }

  setAvailability = (opt) => {
    let available = true;
    if (opt === 'NO') {
      available = false;
    }
    this.setState({ available }, () => setTimeout(this.hideActions, 300));
    // Send update data...
  }

  showActions = () => {
    this.generateRows(4, () => {
      LayoutAnimation.configureNext(fastSpring);
      this.setState({ showingActions: true });
    });
  }

  hideActions = () => {
    LayoutAnimation.configureNext(fastSpring);
    this.setState({ showingActions: false }, () => this.generateRows(6));
  }

  generateRows(numRows, callBack) {
    const { item } = this.props;
    const roleRows = [];
    const nameRows = [];

    // First six items
    item.roles.slice(0, numRows).forEach((role, index) => {
      roleRows.push(
        <RoleRow
          active={index === 0}
          itemRole={role}
          key={role.id}
        />,
      );
      nameRows.push(
        <NameRow
          active={index === 0}
          person={role.person}
          key={role.id}
        />,
      );
    });

    LayoutAnimation.configureNext(fastSpring);
    this.setState({ roleRows, nameRows }, () => {
      if (callBack) callBack();
    });
  }

  render() {
    const {
      item,
      index,
      isActiveWeekItem,
      navigation,
    } = this.props;
    const {
      showingActions, available, roleRows, nameRows,
    } = this.state;

    return (
      <TouchableHighlight
        onPress={() => navigation.push('Details', {
          id: index,
          item,
        })}
        onLongPress={this.showActions}
      >
        <View style={weekItemStyles.container}>
          <View
            style={[
              weekItemStyles.datePart,
              isActiveWeekItem && weekItemStyles.datePartActive,
            ]}
          >
            <Text
              style={[
                styles.fntWt300,
                isActiveWeekItem ? weekItemStyles.datePartActiveText : styles.whiteClr,
              ]}
            >
              {item.date.month}
            </Text>
            <Text
              style={[
                styles.fntWt600,
                isActiveWeekItem ? weekItemStyles.datePartActiveText : styles.whiteClr,
                weekItemStyles.datePartNumber,
              ]}
            >
              {item.date.number}
            </Text>
          </View>
          <View
            style={[
              weekItemStyles.rolesPart,
              { backgroundColor: isActiveWeekItem ? secondaryColor : primaryColor },
            ]}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View>
                {roleRows}
              </View>
              <View style={StyleSheet.flatten(weekItemStyles.rolesPartNameCol)}>
                {nameRows}
              </View>
            </View>
            {showingActions && (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <ToggleButton
                  onPress={opt => this.setAvailability(opt)}
                  message="AVAILABLE"
                  options={['YES', 'NO']}
                  chosenOption={available ? 'YES' : 'NO'}
                  activeTextColor={isActiveWeekItem ? secondaryColor : primaryColor}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const weekItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: elemHeight(),
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
    paddingLeft: 3,
    justifyContent: 'center',
    borderTopColor: '#DE4726',
    borderTopWidth: 1,
  },
  rolesPartNameCol: {
    flex: 1,
  },
});
