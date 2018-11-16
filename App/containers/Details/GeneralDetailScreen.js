import PropTypes from 'prop-types';
import React from 'react';
import DetailScreen from './DetailScreen';

const GeneralDetailScreen = ({ navigation }) => (
  <DetailScreen navigation={navigation} />
);

GeneralDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default GeneralDetailScreen;
