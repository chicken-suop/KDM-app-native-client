import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { daysData } from '../../helpers/propTypes';
import styles, { activeColor } from '../../Styles';
import RoleRow from './RoleRow';
import NameRow from './NameRow';

const sidebarScreenStyles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    flex: 1,
    padding: '10%',
  },
  paragraph: {
    marginTop: 25,
    paddingLeft: '8%',
  },
  paragraphTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#999',
  },
});

const SidebarScreen = ({ activeDayItem }) => {
  const roles = {};
  Object.keys(activeDayItem.roles).forEach((k) => {
    const { category, person } = activeDayItem.roles[k];
    roles[category] = roles[category] || [];
    roles[category].push(`${person.name} ${person.lastName}`);
  });

  return (
    <View style={sidebarScreenStyles.main}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <Text style={[styles.fntWt700, { fontSize: 60, color: activeColor }]}>
          {activeDayItem.date.number}
        </Text>
        <View>
          <Text style={[styles.fntWt700, { fontSize: 20, color: activeColor }]}>
            {`${activeDayItem.date.month}`.toUpperCase()}
          </Text>
          <Text style={[styles.fntWt300, { fontSize: 20, color: activeColor }]}>
            TODAY
          </Text>
        </View>
      </View>
      <View style={sidebarScreenStyles.paragraph}>
        <Text style={sidebarScreenStyles.paragraphTitle}>
          9:15
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View>
            <RoleRow itemRole="Media" alignLeft restrictLen={false} fontSize={14} />
            <RoleRow itemRole="Welcome" alignLeft restrictLen={false} fontSize={14} />
            <RoleRow itemRole="Setup" alignLeft restrictLen={false} fontSize={14} />
            <RoleRow itemRole="Cafeteria" alignLeft restrictLen={false} fontSize={14} />
            <RoleRow itemRole="Decisions" alignLeft restrictLen={false} fontSize={14} />
          </View>
          <View style={{ flex: 1 }}>
            <NameRow
              person={roles.Media ? (`${roles.Media.join(', ')}`) : ''}
              fontSize={16}
            />
            <NameRow
              person={roles.Welcome ? (`${roles.Welcome.join(', ')}`) : ''}
              fontSize={16}
            />
            <NameRow
              person={roles.Setup ? (`${roles.Setup.join(', ')}`) : ''}
              fontSize={16}
            />
            <NameRow
              person={roles.Cafeteria ? (`${roles.Cafeteria.join(', ')}`) : ''}
              fontSize={16}
            />
            <NameRow
              person={roles.Decisions ? (`${roles.Decisions.join(', ')}`) : ''}
              fontSize={16}
            />
          </View>
        </View>
      </View>
      <View style={sidebarScreenStyles.paragraph}>
        <Text style={sidebarScreenStyles.paragraphTitle}>
          11:00
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View>
            <RoleRow itemRole="Service" alignLeft restrictLen={false} fontSize={14} />
          </View>
          <View style={{ flex: 1 }}>
            <NameRow
              person={roles.Service ? (`${roles.Service.join(', ')}`) : ''}
              fontSize={16}
            />
          </View>
        </View>
      </View>
      <View style={sidebarScreenStyles.paragraph}>
        <Text style={sidebarScreenStyles.paragraphTitle}>
          11:15
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View>
            <RoleRow itemRole="Worship" alignLeft restrictLen={false} fontSize={14} />
          </View>
          <View style={{ flex: 1 }}>
            <NameRow
              person={roles.Worship ? (`${roles.Worship.join(', ')}`) : ''}
              fontSize={16}
            />
          </View>
        </View>
      </View>
      <View style={sidebarScreenStyles.paragraph}>
        <Text style={sidebarScreenStyles.paragraphTitle}>
          11:25
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View>
            <RoleRow itemRole="Prayer" alignLeft restrictLen={false} fontSize={14} />
            <RoleRow itemRole="Collection" alignLeft restrictLen={false} fontSize={14} />
            <RoleRow itemRole="Worship" alignLeft restrictLen={false} fontSize={14} />
            <RoleRow itemRole="Translation" alignLeft restrictLen={false} fontSize={14} />
          </View>
          <View style={{ flex: 1 }}>
            <NameRow
              person={roles.Prayer ? (`${roles.Prayer.join(', ')}`) : ''}
              fontSize={16}
            />
            <NameRow
              person={roles.Collection ? (`${roles.Collection.join(', ')}`) : ''}
              fontSize={16}
            />
            <NameRow
              person={roles.Worship ? (`${roles.Worship.join(', ')}`) : ''}
              fontSize={16}
            />
            <NameRow
              person={roles.Translation ? (`${roles.Translation.join(', ')}`) : ''}
              fontSize={16}
            />
          </View>
        </View>
      </View>
      <View style={sidebarScreenStyles.paragraph}>
        <Text style={sidebarScreenStyles.paragraphTitle}>
          11:35
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View>
            <RoleRow itemRole="Sermon" alignLeft restrictLen={false} fontSize={14} />
          </View>
          <View style={{ flex: 1 }}>
            <NameRow
              person={roles.Sermon ? (`${roles.Sermon.join(', ')}`) : ''}
              fontSize={16}
            />
          </View>
        </View>
      </View>
      <View style={sidebarScreenStyles.paragraph}>
        <Text style={sidebarScreenStyles.paragraphTitle}>
          12:00
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View>
            <RoleRow itemRole="Leading" alignLeft restrictLen={false} fontSize={14} />
            <RoleRow itemRole="Worship" alignLeft restrictLen={false} fontSize={14} />
          </View>
          <View style={{ flex: 1 }}>
            <NameRow
              person={roles.Leading ? (`${roles.Leading.join(', ')}`) : ''}
              fontSize={16}
            />
            <NameRow
              person={roles.Worship ? (`${roles.Worship.join(', ')}`) : ''}
              fontSize={16}
            />
          </View>
        </View>
      </View>
      <View style={sidebarScreenStyles.paragraph}>
        <Text style={sidebarScreenStyles.paragraphTitle}>
          12:15
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <View>
            <RoleRow itemRole="Cafeteria" alignLeft restrictLen={false} fontSize={14} />
          </View>
          <View style={{ flex: 1 }}>
            <NameRow
              person={roles.Cafeteria ? (`${roles.Cafeteria.join(', ')}`) : ''}
              fontSize={16}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

SidebarScreen.propTypes = {
  activeDayItem: daysData.item.isRequired,
};

export default SidebarScreen;
