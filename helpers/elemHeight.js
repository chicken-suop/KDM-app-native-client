import { Dimensions } from 'react-native';

export default numRows => Math.trunc(Dimensions.get('window').height / numRows);
