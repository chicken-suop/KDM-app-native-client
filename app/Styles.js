import { StyleSheet } from 'react-native';
import Color from 'color';

// Orange, yellow
export const darkColor = Color.rgb(18, 18, 18);
export const activeColor = Color.rgb(233, 215, 89);
export const primaryColor = Color.rgb(230, 95, 52);
export const secondaryColor = Color.rgb(251, 104, 57);
export const trinaryColor = Color.rgb(251, 117, 75);
export const kindaBlackColor = Color.rgb(34, 34, 34);
export const kindaGrayColor = Color.rgb(61, 61, 61);
export const nearlyWhiteColor = Color.rgb(254, 254, 254);

export default StyleSheet.create({
  primaryText: {
    color: '#FEFEFE',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  expand: {
    flex: 1,
  },
  centerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fntWtBold: {
    fontWeight: 'bold',
  },
  fntWt100: {
    fontWeight: '100',
  },
  fntWt200: {
    fontWeight: '200',
  },
  fntWt300: {
    fontWeight: '300',
  },
  fntWt400: {
    fontWeight: '400',
  },
  fntWt500: {
    fontWeight: '500',
  },
  fntWt600: {
    fontWeight: '600',
  },
  fntWt700: {
    fontWeight: '700',
  },
  fntWt800: {
    fontWeight: '800',
  },
  fntWt900: {
    fontWeight: '900',
  },
  blackBkgrnd: {
    backgroundColor: 'black',
  },
  whiteClr: {
    color: 'white',
  },
  borderYellow: {
    borderColor: 'yellow',
    borderWidth: 2,
  },
  borderRed: {
    borderColor: 'red',
    borderWidth: 2,
  },
  borderOrange: {
    borderColor: 'orange',
    borderWidth: 2,
  },
  borderLightBlue: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  borderGreen: {
    borderColor: 'green',
    borderWidth: 2,
  },
  textAlignRight: {
    textAlign: 'right',
  },
  title: {
    fontSize: 32,
  },
});
