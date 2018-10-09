import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import styles, { secondaryColor } from '../../Styles';
import VariableHeightModal from '../../components/VariableHeightModal';

export default class Schedule extends React.Component {
  constructor() {
    super();

    const { sundays, months } = this.getAllSundays();
    this.sundays = sundays;
    this.months = months;

    let selectedD;
    let selectedM;
    this.months.forEach((m) => {
      const d = this.sundays[m].find(sd => this.isThisSunday(sd, m));
      if (d && m) {
        selectedD = d;
        selectedM = m;
      }
    });

    this.state = {
      // Selected date from server
      selected: { sunday: selectedD, month: selectedM },
    };
  }

  componentDidMount() {
    const date = new Date();
    const today = new Date(date.getTime());
    today.setDate((date.getDate() + (7 - date.getDay())) % 7);
    const toScroll = 30 + (50 * (today.getMonth() + 1));
    const maxScroll = 260;
    this.scrollView.scrollTo({ x: toScroll < maxScroll ? toScroll : maxScroll });
  }

  getAllSundays = () => {
    const start = moment().startOf('year');
    if (start.isoWeekday() !== 0) {
      start.add(1, 'weeks').isoWeekday(0);
    }
    const end = moment(start).endOf('year');
    const months = [];
    const sundays = {};
    while (start.isBefore(end)) {
      const month = start.format('MMM');

      if (months.indexOf(month) === -1) {
        months.push(month);
      }

      if (sundays[month]) {
        sundays[month].push(start.format('D'));
      } else {
        sundays[month] = [start.format('D')];
      }

      start.add(1, 'weeks');
    }

    return { sundays, months };
  }

  select = (sunday, month) => {
    // Update server
    // moment(`${sunday} ${month}`, 'D MMM')
    this.setState({ selected: { sunday, month } });
    setTimeout(this.variableHeightModal.close, 300);
  }

  isThisSunday = (day, month) => moment(
    `${day} ${month}`,
    'D MMM',
  ).isSame(moment(), 'isoWeek')

  render() {
    const { selected } = this.state;
    const { navigation } = this.props;

    return (
      <VariableHeightModal
        goBack={() => navigation.goBack()}
        ref={(ref) => { this.variableHeightModal = ref; }}
      >
        <Text style={[styles.centerText, scheduleStyles.title]}>
          Schedule
        </Text>
        <ScrollView
          ref={(ref) => { this.scrollView = ref; }}
          contentContainerStyle={scheduleStyles.scrollView}
          horizontal
        >
          {this.months.map(month => (
            <View
              style={scheduleStyles.monthCol}
              key={month}
              onStartShouldSetResponder={() => true}
            >
              <View style={scheduleStyles.monthColHeader}>
                <Text
                  style={[
                    styles.centerText,
                    scheduleStyles.text,
                    {
                      color: moment(`${month}`, 'MMM').isSameOrAfter(moment(), 'month')
                        ? '#fff'
                        : '#bbb',
                    },
                  ]}
                >
                  {month.toUpperCase()}
                </Text>
              </View>
              {this.sundays[month].map(sunday => (
                moment(`${sunday} ${month}`, 'D MMM').isSameOrAfter(moment(), 'day') ? (
                  <TouchableWithoutFeedback
                    onPress={() => this.select(sunday, month)}
                    key={sunday}
                  >
                    <View
                      style={[
                        scheduleStyles.outerDay,
                        {
                          borderWidth: (selected.sunday === sunday && selected.month === month)
                            ? 2
                            : 0,
                        },
                      ]}
                    >
                      <View
                        style={[
                          scheduleStyles.day,
                          this.isThisSunday(sunday, month) && { backgroundColor: 'white' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.whiteClr,
                            styles.centerText,
                            scheduleStyles.sunday,
                            this.isThisSunday(sunday, month) && { color: secondaryColor },
                          ]}
                        >
                          {sunday}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View style={scheduleStyles.outerDay} key={sunday}>
                    <View style={scheduleStyles.day}>
                      <Text
                        style={[
                          { color: '#bbb' },
                          styles.centerText,
                          scheduleStyles.sunday,
                        ]}
                      >
                        {sunday}
                      </Text>
                    </View>
                  </View>
                )
              ))}
            </View>
          ))}
        </ScrollView>
      </VariableHeightModal>
    );
  }
}

const scheduleStyles = StyleSheet.create({
  title: {
    paddingTop: 20,
    color: '#fff',
    fontSize: 26,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  monthCol: {
    width: 40,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  monthColHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginBottom: 20,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
  outerDay: {
    marginVertical: 2,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  day: {
    height: 32,
    width: 32,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunday: {
    fontSize: 16,
  },
});

Schedule.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
