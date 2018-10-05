import PropTypes from 'prop-types';
import React from 'react';
import DetailPage from './DetailPage';

const SongsScreen = ({ navigation }) => (
  <DetailPage
    navigation={navigation}
    item={navigation.getParam('item', {})}
    pageTitle="Songs"
    isFullScreen
  />
);

SongsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SongsScreen;
