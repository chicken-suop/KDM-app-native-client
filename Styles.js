import { StyleSheet } from 'react-native';

export const activeColor = '#ca3724';
export const primaryColor = '#2A454C';
export const primaryColorBorder = '#253E44';
export const secondaryColor = '#274047';
export const secondaryColorBorder = '#253E44';
export const trinaryColor = '#304E56';

export const hexToRgbA = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export default StyleSheet.create({
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
