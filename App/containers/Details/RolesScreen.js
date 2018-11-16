import PropTypes from 'prop-types';
import React from 'react';
import DetailPage from './DetailPage';

const RolesScreen = ({ navigation }) => (
  <DetailPage
    navigation={navigation}
    item={navigation.getParam('item', {})}
    pageTitle="Roles"
    isFullScreen
  />
);

RolesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default RolesScreen;
