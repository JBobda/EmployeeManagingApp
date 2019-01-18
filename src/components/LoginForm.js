import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  Card,
  CardSection,
  Input,
  Button,
} from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
  onEmailChange(text) {
    const { eChange } = this.props;
    eChange(text);
  }

  onPasswordChange(text) {
    const { pChanged } = this.props;
    pChanged(text);
  }

  onButtonPress() {
    const { lUser, email, password } = this.props;
    lUser({ email, password });
  }

  renderError() {
    const { error } = this.props;

    if (error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {error}
          </Text>
        </View>
      );
    }

    return <View style={{ display: 'none' }} />;
  }

  render() {
    const { email } = this.props;

    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

const mapStateToProps = (state) => {
  const { email, password, error } = state.auth;

  return {
    email,
    password,
    error,
  };
};

export default connect(mapStateToProps, {
  eChange: emailChanged,
  pChanged: passwordChanged,
  lUser: loginUser,
})(LoginForm);
