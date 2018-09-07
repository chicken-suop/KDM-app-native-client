import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import styles, { primaryColor } from '../../Styles';

const detailsItemStyles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 20,
    marginTop: 1,
    marginBottom: 1,
  },
  containerImage: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 20,
  },
  person: {
    fontSize: 14,
  },
  role: {
    fontSize: 18,
    alignSelf: 'center',
  },
  roleImage: {
    marginRight: 'auto',
  },
});

const DetailsItem = ({
  data1,
  data2,
  image,
  onPress,
}) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={detailsItemStyles.container}>
          <Feather
            name="plus"
            size={18}
            color="white"
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        detailsItemStyles.container,
        { zIndex: 1 },
        !!image && detailsItemStyles.containerImage,
      ]}
    >
      {!!image && (
        <Image source={{ uri: image }} style={detailsItemStyles.image} resizeMode="cover" />
      )}
      {!!data1 && (
        <Text style={[detailsItemStyles.person, styles.whiteClr]}>
          {data1}
        </Text>
      )}
      <Text
        style={[
          detailsItemStyles.role,
          styles.whiteClr,
          !!image && detailsItemStyles.roleImage,
        ]}
      >
        {data2}
      </Text>
    </View>
  );
};

DetailsItem.propTypes = {
  data1: PropTypes.string,
  data2: PropTypes.string.isRequired,
  image: PropTypes.string,
  onPress: PropTypes.func,
};

DetailsItem.defaultProps = {
  data1: '',
  image: '',
  onPress: null,
};

export default DetailsItem;
