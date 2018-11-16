import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Collapsible from 'react-native-collapsible';
import { Feather } from '@expo/vector-icons';
import { TextField } from 'react-native-material-textfield';
import defaultStyles, {
  activeColor,
  darkColor,
  kindaGrayColor,
  nearlyWhiteColor,
} from '../../Styles';
import SignInMutation from '../../mutation/SignInMutation';
import SignUpMutation from '../../mutation/SignUpMutation';
import { ERRORS } from '../../helpers/config';
import { storeSession } from '../../helpers/auth';
import Touchable from '../../components/Touchable';
import BoxButton from '../../components/BoxButton';
import AnimatedExpand from '../../components/AnimatedExpand';

export default class AuthHome extends React.Component {
  fullName = null

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    formType: 'Create account',
    errorText: '',
    errors: {},
    fullName: '',
    email: '',
    password: '',
    loading: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      formType,
      errorText,
      errors,
      loading,
    } = this.state;
    return (
      formType !== nextState.formType
      || errorText !== nextState.errorText
      || errors.fullName !== nextState.errors.fullName
      || errors.email !== nextState.errors.email
      || errors.password !== nextState.errors.password
      || loading !== nextState.loading
    );
  }

  onSubmit = () => {
    const { loading } = this.state;
    if (!loading) {
      const errors = this.checkErrors();
      this.setState({ errors });
      if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        const { formType } = this.state;
        if (formType === 'Sign Up') {
          this.signUp();
        } else if (formType === 'Sign In') {
          this.signIn();
        }
      }
    }
  }

  onChangeText = (text) => {
    ['fullName', 'email', 'password']
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref !== null && ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  setError = (text) => {
    // First unset, then set it, for cases where there's already an error
    this.setState({ errorText: '' }, () => setTimeout(() => this.setState({
      errorText: text,
    }), 300));
  }

  showForm = (type) => {
    this.setState({ formType: type }, () => {
      if (type === 'Sign Up') {
        this.fullName.focus();
      } else if (type === 'Sign In') {
        this.email.focus();
      } else if (type === 'Create account') {
        this.removeErrors();
      }
    });
  }

  checkErrors = () => {
    const errors = {};
    ['fullName', 'email', 'password'].forEach((name) => {
      if (this[name] !== null) {
        const value = this[name].value();
        if (!value) {
          errors[name] = 'Should not be empty';
        } else if (name === 'password' && value.length < 8) {
          errors[name] = 'Password must be at least 8 characters';
        }
      }
    });
    return errors;
  }

  removeErrors = () => {
    this.setState({ errors: {}, errorText: '' });
  }

  signUp = () => {
    // Need to focus on input because autofilling the password breaks Keyboard.dismiss()
    this.email.focus();
    Keyboard.dismiss();

    const { navigation } = this.props;
    const { email, password, fullName } = this.state;
    this.setState({ loading: true });
    SignUpMutation.commit({
      email,
      password,
      fullName,
      onCompleted: (response, err) => {
        this.setState({ loading: false });
        if (err && err.length) {
          this.setError('The was an issue signing you in');
        } else {
          const { user, token } = response.signUp;
          storeSession({ userId: user.id, token });
          navigation.navigate('SignedIn');
        }
      },
      onError: (err) => {
        this.setState({ loading: false });
        switch (err) {
          case ERRORS.NetworkRequestFailed:
            this.setError("Couldn't connect to server");
            break;
          default:
            this.setError('The was an issue signing you in');
            break;
        }
      },
    });
  }

  signIn = () => {
    // Need to focus on input because autofilling the password breaks Keyboard.dismiss()
    this.email.focus();
    Keyboard.dismiss();

    const { navigation } = this.props;
    const { email, password } = this.state;
    this.setState({ loading: true });
    SignInMutation.commit({
      email,
      password,
      onCompleted: (response, err) => {
        this.setState({ loading: false });
        if (err && err.length) {
          switch (err[0].message) {
            case ERRORS.WrongEmailOrPassword:
              this.setError('Email or password is incorrect');
              break;
            default:
              this.removeErrors();
              break;
          }
        } else {
          const { user, token } = response.signIn;
          storeSession({ userId: user.id, token });
          navigation.navigate('SignedIn');
        }
      },
      onError: (err) => {
        this.setState({ loading: false });
        switch (err) {
          case ERRORS.NetworkRequestFailed:
            this.setError('The was an issue signing you in');
            break;
          default:
            this.removeErrors();
            break;
        }
      },
    });
  }

  render() {
    const {
      formType,
      errorText,
      errors,
      fullName,
      email,
      password,
      loading,
    } = this.state;

    return (
      <SafeAreaView style={styles.background}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          contentContainerStyle={[defaultStyles.expand, { paddingVertical: 60 }]}
        >
          <View style={defaultStyles.expand}>
            <AnimatedExpand>
              {formType !== 'Create account' && (
                <Touchable onPress={() => this.showForm('Create account')} style={{ marginBottom: 30 }}>
                  <Feather
                    name="arrow-left"
                    size={40}
                    color="white"
                  />
                </Touchable>
              )}
              <Text style={[styles.headerText, defaultStyles.primaryText]}>
                {formType === 'Create account' && 'KdM: Kraków'}
                {formType === 'Sign Up' && 'Create\nAccount.'}
                {formType === 'Sign In' && 'Welcome\nBack.'}
              </Text>
              {formType !== 'Create account' && (
                <View>
                  {formType === 'Sign Up' && (
                    <TextField
                      ref={(input) => { this.fullName = input; }}
                      value={fullName}
                      textColor={nearlyWhiteColor.toString()}
                      tintColor={kindaGrayColor.toString()}
                      baseColor={kindaGrayColor.toString()}
                      autoCorrect={false}
                      enablesReturnKeyAutomatically
                      onFocus={this.removeErrors}
                      onChangeText={this.onChangeText}
                      onSubmitEditing={() => this.email.focus()}
                      returnKeyType="next"
                      label="Full Name"
                      error={errors.fullName}
                    />
                  )}
                  <TextField
                    ref={(input) => { this.email = input; }}
                    value={email}
                    textColor={nearlyWhiteColor.toString()}
                    tintColor={kindaGrayColor.toString()}
                    baseColor={kindaGrayColor.toString()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    onFocus={this.removeErrors}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={() => this.password.focus()}
                    returnKeyType="next"
                    label="Email"
                    error={errors.email}
                  />
                  <TextField
                    ref={(input) => { this.password = input; }}
                    value={password}
                    textColor={nearlyWhiteColor.toString()}
                    tintColor={kindaGrayColor.toString()}
                    baseColor={kindaGrayColor.toString()}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically
                    onFocus={this.removeErrors}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={() => this.onSubmit()}
                    returnKeyType="done"
                    label="Password"
                    error={errors.password}
                  />
                </View>
              )}
            </AnimatedExpand>
          </View>
          <Collapsible collapsed={errorText === ''} style={{ marginBottom: 30 }}>
            <View style={defaultStyles.expand}>
              <View style={styles.errorBox}>
                <Text style={[{ fontSize: 11 }, defaultStyles.primaryText]}>
                  {errorText}
                </Text>
              </View>
            </View>
          </Collapsible>
          <Collapsible collapsed={!loading} style={{ marginBottom: 30 }}>
            <View style={defaultStyles.expand}>
              <View style={styles.errorBox}>
                <Text style={[{ fontSize: 11 }, defaultStyles.primaryText]}>
                  Loading...
                </Text>
              </View>
            </View>
          </Collapsible>
          <BoxButton
            onPress={() => {
              if (formType === 'Create account') {
                this.showForm('Sign Up');
              } else {
                this.onSubmit();
              }
            }}
            style={{ backgroundColor: loading ? activeColor.darken(0.8) : activeColor }}
          >
            {formType}
          </BoxButton>
          <Collapsible collapsed={formType !== 'Create account'}>
            <BoxButton onPress={() => this.showForm('Sign In')} style={{ backgroundColor: 'white' }}>
              Sign In
            </BoxButton>
          </Collapsible>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: darkColor,
    flex: 1,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 40,
    fontWeight: '700',
  },
  errorBox: {
    width: '50%',
    paddingBottom: 12,
    borderBottomColor: kindaGrayColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
});
