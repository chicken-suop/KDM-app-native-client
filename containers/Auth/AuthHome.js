import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import Collapsible from 'react-native-collapsible';
import { createFragmentContainer, graphql } from 'react-relay';
import styles, { activeColor } from '../../Styles';
import LoginMutation from '../../mutation/LoginMutation';
import { ERRORS } from '../../helpers/config';

const window = Dimensions.get('window');

class Index extends React.Component {
  static propTypes = {
    loginCallback: PropTypes.func.isRequired,
  };

  state = {
    showingForm: false,
    formType: 'Get Started',
    userName: '',
    email: '',
    password: '',
    errorState: false,
    errorText: '',
  }

  showForm = (type) => {
    this.setState({ showingForm: true, formType: type });
  }

  hideForm = () => {
    this.setState({ showingForm: false, formType: 'Get Started' });
  }

  signup = () => {
    // Need to focus on input because autofilling the password breaks Keyboard.dismiss()
    this.secondTextInput.focus();
    Keyboard.dismiss();

    const { loginCallback } = this.props;
    const { userName, email, password } = this.state;
    if (userName !== '' && userName.includes(' ') && email !== '' && email.includes('@') && password !== '') {
      this.setState({ errorState: false, errorText: '' });
      loginCallback({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam8wMzZ1ZGwwMDA4MGEyMjg0bGIyMnJ2IiwiaWF0IjoxNTQxMTY3MjUyfQ.YAl4z45nqRRfTAqmQ3cjIFKDous62mUtESDwh4wMN_g' });
    } else {
      this.setState({ errorState: false, errorText: '' }, () => setTimeout(() => this.setState({
        errorState: true,
        errorText: 'There was a problem logging in, try again later.',
      }), 300));
    }
  }

  login = () => {
    // Need to focus on input because autofilling the password breaks Keyboard.dismiss()
    this.secondTextInput.focus();
    Keyboard.dismiss();

    const { loginCallback } = this.props;
    const { email, password } = this.state;

    // Simple check
    if (email !== '' && email.includes('@') && password !== '') {
      LoginMutation.commit({
        email,
        password,
        onCompleted: (response, error) => {
          if (error.length) {
            switch (error[0].message) {
              case ERRORS.WrongEmailOrPassword:
                this.setState({ errorState: true, errorText: 'Email or password is incorrect' });
                break;
              default:
                this.setState({ errorState: false, errorText: '' });
                break;
            }
          } else {
            loginCallback({ token: response.token });
          }
        },
      });
    } else {
      this.setState({ errorState: false, errorText: '' }, () => setTimeout(() => this.setState({
        errorState: true,
        errorText: 'Not a valid email or no password specified',
      }), 300));
    }
  }

  render() {
    const {
      showingForm,
      formType,
      userName,
      email,
      password,
      errorState,
      errorText,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <Image
            resizeMode="cover"
            style={{ height: window.height, width: window.width, position: 'absolute' }}
            source={require('../../assets/login_signup_background.png')}
          />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ flex: 1 }}
        >
          <SafeAreaView style={styles.startContainer}>
            <Text
              style={[
                { marginTop: 60, marginBottom: 80, fontSize: 24 },
                styles.whiteClr,
                styles.fntWt900,
                styles.centerText,
              ]}
            >
              KOŚCIÓŁ DLA MIASTA: KRAKÓW
            </Text>
            <Collapsible collapsed={!showingForm} style={styles.startContainer}>
              {formType === 'Sign Up' && (
              <TextInput
                style={{
                  width: 300,
                  padding: 20,
                  marginTop: 80,
                  borderTopRightRadius: 2,
                  borderTopLeftRadius: 2,
                  backgroundColor: 'white',
                  fontSize: 16,
                }}
                value={userName}
                onChangeText={text => this.setState({ userName: text })}
                textContentType="givenName"
                placeholder="Full Name"
                returnKeyType="next"
                onSubmitEditing={() => this.secondTextInput.focus()}
              />
              )}
              <TextInput
                style={{
                  width: 300,
                  padding: 20,
                  borderBottomRightRadius: 2,
                  borderBottomLeftRadius: 2,
                  borderTopColor: '#E3E3E3',
                  borderTopWidth: 1,
                  backgroundColor: 'white',
                  fontSize: 16,
                }}
                value={email}
                onChangeText={text => this.setState({ email: text })}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => this.thridTextInput.focus()}
                ref={(input) => { this.secondTextInput = input; }}
              />
              <TextInput
                style={{
                  width: 300,
                  padding: 20,
                  borderBottomRightRadius: 2,
                  borderBottomLeftRadius: 2,
                  borderTopColor: '#E3E3E3',
                  borderTopWidth: 1,
                  backgroundColor: 'white',
                  fontSize: 16,
                }}
                value={password}
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry
                textContentType="password"
                placeholder="Password"
                returnKeyType="go"
                ref={(input) => { this.thridTextInput = input; }}
                onSubmitEditing={this.login}
              />
            </Collapsible>
            <View style={[indexStyle.box, { backgroundColor: activeColor }]}>
              <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => {
                  if (formType === 'Get Started') {
                    this.showForm('Sign Up');
                  } else if (formType === 'Sign Up') {
                    this.signup();
                  } else if (formType === 'Log In') {
                    this.login();
                  }
                }}
              >
                <View>
                  <Text style={[{ fontSize: 16 }, styles.centerText]}>
                    {formType}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Collapsible collapsed={showingForm} style={styles.startContainer}>
              <View style={[indexStyle.box, { backgroundColor: 'white' }]}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.showForm('Log In')}>
                  <View>
                    <Text style={[{ fontSize: 16 }, styles.centerText]}>
                      Log In
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Collapsible>
            <Collapsible collapsed={!errorState} style={{ padding: 0 }}>
              <View style={[indexStyle.box, { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4 )' }]}>
                <Text style={[{ fontSize: 16, color: 'white' }, styles.centerText]}>
                  {errorText}
                </Text>
              </View>
            </Collapsible>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const indexStyle = {
  box: {
    width: 300,
    marginTop: 12,
    padding: 20,
    borderRadius: 2,
  },
};

const AuthHome = (props) => {
  const AppNavigator = createStackNavigator(
    {
      Index: {
        screen: screenProps => <Index {...screenProps} {...props} />,
      },
    },
    {
      initialRouteName: 'Index',
      navigationOptions: { header: null },
    },
  );
  return <AppNavigator />;
};

export default AuthHome;
