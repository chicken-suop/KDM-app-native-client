import PropTypes from 'prop-types';
import React from 'react';
import {
  View, StyleSheet, Text, ImageBackground,
} from 'react-native';
import moment from 'moment';
import defaultStyles, { activeColor } from '../../Styles';
import images from '../../assets/index';
import Event from './ScheduleItemEvent';

export default class ScheduleItem extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    scheduleDay: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.string,
    ]).isRequired,
    isActive: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    isMonth: PropTypes.bool.isRequired,
    isFreeDay: PropTypes.bool.isRequired,
  }

  handleScroll = () => {
    console.log(this.heading);
    // console.log({ schMntRefs: this.schMntRefs });
    // this.schMntRefs[0].measure((fx, fy, width, height, px, py) => {
    //   console.log(`Component width is: ${width}`);
    //   console.log(`Component height is: ${height}`);
    //   console.log(`X offset to frame: ${fx}`);
    //   console.log(`Y offset to frame: ${fy}`);
    //   console.log(`X offset to page: ${px}`);
    //   console.log(`Y offset to page: ${py}`);
    // });
    // this.schMntRefs.forEach((ref) => {
    //   ref.measure((fx, fy, width, height, px, py) => {
    //     console.log(`Component width is: ${width}`);
    //     console.log(`Component height is: ${height}`);
    //     console.log(`X offset to frame: ${fx}`);
    //     console.log(`Y offset to frame: ${fy}`);
    //     console.log(`X offset to page: ${px}`);
    //     console.log(`Y offset to page: ${py}`);
    //   });
    // });
    // this.setState({ scrollPosition: event.nativeEvent.contentOffset.y });
  }

  render() {
    const {
      date,
      scheduleDay,
      isActive,
      isMonth,
      isFreeDay,
      navigation,
    } = this.props;

    const theDate = isMonth ? date : moment(date);

    if (isMonth) {
      return (
        <ImageBackground
          source={images.months[date]}
          style={{ marginBottom: 30 }}
        >
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              paddingTop: 10,
              paddingHorizontal: 30,
              paddingBottom: 100,
            }}
          >
            <Text style={styles.monthDate} ref={(txt) => { this.heading = txt; }}>
              {date.toUpperCase()}
            </Text>
          </View>
        </ImageBackground>
      );
    }

    if (isFreeDay) {
      return (
        <View
          style={[
            styles.freeDay,
            isActive && { borderLeftColor: activeColor, borderLeftWidth: 2, paddingLeft: 5 },
          ]}
        >
          <Text style={[styles.freeDayDate, isActive && { color: activeColor }]}>
            {theDate.format('MMMM D')}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <View style={[styles.sideDate, isActive && { borderRightColor: activeColor }]}>
          <Text
            style={[
              defaultStyles.centerText,
              styles.sideDateText,
              isActive && { color: activeColor },
            ]}
          >
            {theDate.format('ddd').toUpperCase()}
          </Text>
          <Text
            style={[
              defaultStyles.centerText,
              styles.sideDateNum,
              isActive && { color: activeColor },
            ]}
          >
            {theDate.format('D')}
          </Text>
        </View>
        <View style={styles.events}>
          {scheduleDay.sort((a, b) => {
            // Sort by starting time desc.
            const t1 = parseFloat(a.start.replace(':', '.').replace(/[^\d.-]/g, ''));
            const t2 = parseFloat(b.end.replace(':', '.').replace(/[^\d.-]/g, ''));
            if (t1 < t2) return -1;
            if (t1 > t2) return 1;
            return 0;
          }).map((event, i) => {
            const sermon = event.people.filter(p => p.role.name === 'sermon');
            const lockup = event.people.filter(p => p.role.name === 'lockup');
            return (
              <Event
                key={event.id}
                isLast={i === 2}
                title={event.name}
                start={moment(event.start).format('H:mm')}
                end={moment(event.end).format('H:mm')}
                location={event.location.name}
                category={event.category !== null ? event.category.name : ''}
                sermon={sermon.length ? sermon[0].user.name : 'Not assigned'}
                lockup={lockup.length ? lockup[0].user.name : 'Not assigned'}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monthDate: {
    color: activeColor,
    fontSize: 26,
    fontWeight: '700',
  },
  freeDay: {
    marginLeft: 30,
    marginBottom: 30,
    justifyContent: 'center',
  },
  freeDayDate: {
    color: '#9B9B9B',
    fontWeight: '100',
    fontSize: 16,
  },
  main: {
    flexDirection: 'row',
    marginLeft: 30,
    flex: 1,
    marginBottom: 30,
  },
  sideDate: {
    flex: 1,
    marginRight: 10,
    borderRightWidth: 2,
  },
  sideDateText: {
    color: 'white',
    fontWeight: '100',
    fontSize: 16,
  },
  sideDateNum: {
    color: 'white',
    fontSize: 26,
  },
  events: {
    flex: 8,
  },
});


// import PropTypes from 'prop-types';
// import React from 'react';
// import {
//   Text, View, StyleSheet, TouchableHighlight, LayoutAnimation,
// } from 'react-native';
// import styles, { activeColor, primaryColor, secondaryColor } from '../../Styles';
// import { daysData } from '../../helpers/propTypes';
// import RoleRow from './RoleRow';
// import NameRow from './NameRow';
// import elemHeight from '../../helpers/elemHeight';
// import ToggleButton from '../../components/ToggleButton';
//
// const fastSpring = {
//   duration: 400,
//   create: {
//     type: LayoutAnimation.Types.spring,
//     property: LayoutAnimation.Properties.scaleXY,
//     springDamping: 0.7,
//   },
//   update: {
//     type: LayoutAnimation.Types.spring,
//     springDamping: 0.7,
//   },
// };
//
// export default class ScheduleItem extends React.Component {
//   static propTypes = {
//     scheduleDay: daysData.scheduleDay.isRequired,
//     index: PropTypes.number.isRequired,
//     isActiveScheduleItem: PropTypes.bool.isRequired,
//     navigation: PropTypes.shape({
//       navigate: PropTypes.func.isRequired,
//     }).isRequired,
//   }
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       showingActions: false,
//       available: true,
//       roleRows: [],
//       nameRows: [],
//     };
//   }
//
//   componentWillMount() {
//     this.generateRows(6);
//
//     // Temporary code to open detail view on load
//     // const {
//     //   scheduleDay,
//     //   index,
//     //   isActiveScheduleItem,
//     //   navigation,
//     // } = this.props;
//     //
//     // if (isActiveScheduleItem) {
//     //   navigation.push('Details', {
//     //     id: index,
//     //     scheduleDay,
//     //   });
//     // }
//   }
//
//   setAvailability = (opt) => {
//     let available = true;
//     if (opt === 'NO') {
//       available = false;
//     }
//     this.setState({ available }, () => setTimeout(this.hideActions, 300));
//     // Send update data...
//   }
//
//   showActions = () => {
//     this.generateRows(4, () => {
//       LayoutAnimation.configureNext(fastSpring);
//       this.setState({ showingActions: true });
//     });
//   }
//
//   hideActions = () => {
//     LayoutAnimation.configureNext(fastSpring);
//     this.setState({ showingActions: false }, () => this.generateRows(6));
//   }
//
//   generateRows(numRows, callBack) {
//     const { scheduleDay } = this.props;
//     const roleRows = [];
//     const nameRows = [];
//
//     // First six scheduleDays
//     // scheduleDay.roles.slice(0, numRows).forEach((role, index) => {
//     //   roleRows.push(
//     //     <RoleRow
//     //       active={index === 0}
//     //       scheduleDayRole={role}
//     //       key={role.id}
//     //     />,
//     //   );
//     //   nameRows.push(
//     //     <NameRow
//     //       active={index === 0}
//     //       person={role.person}
//     //       key={role.id}
//     //     />,
//     //   );
//     // });
//
//     LayoutAnimation.configureNext(fastSpring);
//     this.setState({ roleRows, nameRows }, () => {
//       if (callBack) callBack();
//     });
//   }
//
//   render() {
//     const {
//       scheduleDay,
//       index,
//       isActiveScheduleItem,
//       navigation,
//     } = this.props;
//     const {
//       showingActions, available, roleRows, nameRows,
//     } = this.state;
//
//     return (
//       <TouchableHighlight
//         onPress={() => navigation.push('Details', {
//           id: index,
//           scheduleDay,
//         })}
//         onLongPress={this.showActions}
//       >
//         <View style={scheduleItemStyles.container}>
//           <View
//             style={[
//               scheduleItemStyles.datePart,
//               isActiveScheduleItem && scheduleItemStyles.datePartActive,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.fntWt300,
//                 isActiveScheduleItem ? scheduleItemStyles.datePartActiveText : styles.whiteClr,
//               ]}
//             >
//               {/* {scheduleDay.date.month} */}
//             </Text>
//             <Text
//               style={[
//                 styles.fntWt600,
//                 isActiveScheduleItem ? scheduleItemStyles.datePartActiveText : styles.whiteClr,
//                 scheduleItemStyles.datePartNumber,
//               ]}
//             >
//               {/* {scheduleDay.date.number} */}
//             </Text>
//           </View>
//           <View
//             style={[
//               scheduleItemStyles.rolesPart,
//               { backgroundColor: isActiveScheduleItem ? secondaryColor : primaryColor },
//             ]}
//           >
//             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
//               <View>
//                 {roleRows}
//               </View>
//               <View style={StyleSheet.flatten(scheduleItemStyles.rolesPartNameCol)}>
//                 {nameRows}
//               </View>
//             </View>
//             {showingActions && (
//               <View style={{ flex: 1, justifyContent: 'center' }}>
//                 <ToggleButton
//                   onPress={opt => this.setAvailability(opt)}
//                   message="AVAILABLE"
//                   options={['YES', 'NO']}
//                   chosenOption={available ? 'YES' : 'NO'}
//                   activeTextColor={isActiveScheduleItem ? secondaryColor : primaryColor}
//                 />
//               </View>
//             )}
//           </View>
//         </View>
//       </TouchableHighlight>
//     );
//   }
// }
//
// const scheduleItemStyles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: elemHeight(),
//   },
//   datePart: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   datePartNumber: {
//     fontSize: 24,
//   },
//   datePartActive: {
//     borderRightWidth: 2,
//     borderRightColor: activeColor,
//   },
//   datePartActiveText: {
//     color: activeColor,
//   },
//   rolesPart: {
//     flex: 8,
//     paddingLeft: 3,
//     justifyContent: 'center',
//     borderTopColor: '#DE4726',
//     borderTopWidth: 1,
//   },
//   rolesPartNameCol: {
//     flex: 1,
//   },
// });
