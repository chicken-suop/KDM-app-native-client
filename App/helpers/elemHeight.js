import { Dimensions } from 'react-native';

export const numRows = 5;
export default () => Math.trunc(Dimensions.get('window').height / numRows);
