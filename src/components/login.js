import React from 'react';
import { Alert, Text, TextInput, Button, View, StyleSheet } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import common from '../styles/common';

import { fetchLogin } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  
  componentDidMount() {
    AsyncStorage.setItem('isLogout', 'false')
  }
  
  async onLogin() {
    const { email, password } = this.state;
    this.validate({
      email: {email: true, required: true},
      password: {required: true},
    });

    if (this.isFormValid()) {
      this.props.fetchLogin({email:email, password:password}).then(r => {
        this.props.navigation.navigate('Home')
      }).catch(() => {
        Alert.alert("Login Failed", this.props.user.errMessage.toString());    
      })
    }
  }

  onRegister() {
    this.props.navigation.navigate('Register')
  }

  removeTheField(message) {
    return message.replace("The field","")
  }

  render() {
    return (
      <View style={common.container}>
        <Text style={styles.title}>Clinic System</Text>
        {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text key={errorMessage.toString()} style={common.textError}>{this.removeTheField(errorMessage)}</Text>) }
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'email'}
          style={this.isFieldInError('email') ? common.inputError : common.input}
        />

        {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text key={errorMessage.toString()} style={common.textError}>{this.removeTheField(errorMessage)}</Text>) }
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={this.isFieldInError('password') ? common.inputError : common.input}
        />
        
        <View style={{flexDirection: 'column'}}>
          <Button
            title={'Login'}
            onPress={this.onLogin.bind(this)}
          />
          <Text>{"\r"}</Text>
          <Button
            title={'Register'}
            onPress={this.onRegister.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    fontSize: 25
  }
});

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, {fetchLogin})(Login);