import PropTypes from 'prop-types';
import React from 'react';
import DetailPage from './DetailPage';

const UnavailablePeopleScreen = ({ navigation }) => (
  <DetailPage
    navigation={navigation}
    item={navigation.getParam('item', {})}
    pageTitle="Unavailable People"
    isFullScreen
  />
);

UnavailablePeopleScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default UnavailablePeopleScreen;
