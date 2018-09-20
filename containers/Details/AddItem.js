import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  Dimensions,
  Keyboard,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Ionicons } from '@expo/vector-icons';
import styles, { secondaryColor } from '../../Styles';

const windowHeight = Dimensions.get('window').height;

export default class AddItem extends React.Component {
  initalData = Array(20).fill().map((_, index) => ({
    id: index, title: 'ProPresenter', subTitle: 'Media',
  }));

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      dataSource: this.initalData,
      title: props.navigation.getParam('title'),
      itemSubTitle: props.navigation.getParam('itemSubTitle'),
      translateValue: new Animated.Value(0),
    };
  }

  componentWillMount() {
    const { translateValue } = this.state;
    Animated.timing(translateValue, {
      toValue: -windowHeight,
      duration: 0, // 300,
    }).start();
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  close = () => {
    const { translateValue } = this.state;
    const { navigation } = this.props;
    Keyboard.dismiss();
    Animated.timing(translateValue, {
      toValue: 0,
      duration: 0, // 300,
    }).start(() => {
      navigation.state.params.onClose();
      navigation.goBack();
    });
  }

  addItem = () => {
    const { translateValue } = this.state;
    const { navigation } = this.props;
    // Send data to server here.
    Keyboard.dismiss();
    Animated.timing(translateValue, {
      toValue: 0,
      duration: 0, // 300,
    }).start(() => {
      navigation.state.params.onChoose();
      navigation.goBack();
    });
  }

  filterData = (text, subTitle) => (
    !text || text === ''
      // Search is invalid or cleared
      ? this.initalData
      // Filtered data
      : [
        { id: -1, title: text, subTitle },
        ...this.initalData.filter(item => (
          item.title.toLowerCase().indexOf(text.toLowerCase()) > -1
            || item.subTitle.toLowerCase().indexOf(text.toLowerCase()) > -1
        )),
      ]
  )

  render() {
    const {
      query,
      dataSource,
      title,
      itemSubTitle,
      translateValue,
    } = this.state;

    return (
      <Animated.View
        style={{
          zIndex: 1,
          backgroundColor: secondaryColor,
          position: 'absolute',
          overflow: 'hidden',
          left: 0,
          right: 0,
          bottom: translateValue.interpolate({
            inputRange: [-windowHeight, 0],
            outputRange: [0, -windowHeight],
          }),
          height: translateValue.interpolate({
            inputRange: [-windowHeight, 0],
            outputRange: [windowHeight, 0],
          }),
        }}
      >
        <View style={addItemStyles.container}>
          <View>
            <Text
              style={[
                styles.whiteClr,
                styles.centerText,
                styles.fntWt600,
                { fontSize: 22 },
              ]}
            >
              {title}
            </Text>
            <View style={styles.searchInput}>
              <TextInput
                style={[styles.centerText, addItemStyles.inputText]}
                placeholder="Try ProPresenter"
                placeholderTextColor="#ccc"
                underlineColorAndroid="transparent"
                autoCorrect={false}
                value={query}
                ref={(ref) => { this.searchInput = ref; }}
                onChangeText={(text) => {
                  this.setState({
                    query: text,
                    dataSource: this.filterData(text, itemSubTitle),
                  });
                }}
              />
              {!!query && (
                <View style={addItemStyles.clearButton}>
                  <TouchableWithoutFeedback
                    onPress={() => this.setState({
                      query: '',
                      dataSource: this.filterData(''),
                    })}
                  >
                    <Ionicons
                      name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close-circle'}
                      size={18}
                      color="#000"
                      style={{ padding: 10 }}
                    />
                  </TouchableWithoutFeedback>
                </View>
              )}
            </View>
          </View>
          <View style={addItemStyles.bottomPart}>
            <FlatList
              keyboardDismissMode="none"
              keyboardShouldPersistTaps="always"
              removeClippedSubviews
              ref={(list) => { this.flatListRef = list; }}
              keyExtractor={item => item.id.toString()}
              getItemLayout={(data, index) => (
                { length: 70, offset: 70 * index, index }
              )}
              data={dataSource}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={this.addItem}>
                  <View style={[addItemStyles.addItemRow, index !== 0 && { borderTopWidth: 1 }]}>
                    {item.id === -1 && (
                      <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
                        size={20}
                        color="#fff"
                        style={{ padding: 10 }}
                      />
                    )}
                    <View style={[addItemStyles.addItemRowInner]}>
                      <Text style={[styles.whiteClr, { fontSize: 20 }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.whiteClr, { fontSize: 12 }]}>
                        {item.subTitle}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={addItemStyles.closeButtonContainer}>
            <TouchableOpacity onPress={this.close}>
              <View style={addItemStyles.closeButton}>
                <Text
                  style={[
                    styles.whiteClr,
                    styles.centerText,
                    styles.fntWt600,
                    { fontSize: 18 },
                  ]}
                >
                  CLOSE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <KeyboardSpacer topSpacing={-35} />
        </View>
      </Animated.View>
    );
  }
}

const addItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  searchInput: {
    height: 45,
    width: '100%',
    marginTop: 3,
  },
  inputText: {
    marginTop: 20,
    marginRight: 43,
    fontSize: 20,
    color: '#fff',
  },
  clearButton: {
    position: 'absolute',
    right: 13,
    top: 12,
    opacity: 0.5,
  },
  closeButtonContainer: {
    height: 45,
    width: '100%',
    backgroundColor: secondaryColor,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 2,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomPart: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 50,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    paddingVertical: 10,
    height: 60,
  },
  addItemRowInner: {
    justifyContent: 'center',
    flex: 1,
  },
});
