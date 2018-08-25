import { Dimensions } from 'react-native';

const elemHeight = numRows => Dimensions.get('window').height / numRows;
export default elemHeight;
