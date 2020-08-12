import React from 'react';
import { Alert, Text, Button, TextInput, View, StyleSheet } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import common from '../styles/common';

import { fetchRegister } from '../redux/actions/userActions';
import { connect } from 'react-redux';

class Register extends ValidationComponent {
    constructor(props) {
        super(props);
        
        this.state = {
          email: '',
          password: '',
          password2: '',
          clinic: '',
          phone:'',
          address:''
        };
      }

    async onRegister() {
        this.validate({
            email: {email: true, required: true},
            password: {minlength:8, required: true},
            password2: {minlength:8, required: true},
            clinic: {required: true},
            phone: {numbers: true, minlength:8, required: true},
            address: {required: true},
        });

        if (this.isFormValid()) {
          const { email, password, clinic, phone, address } = this.state;
          this.props.fetchRegister({ email, password, clinic, phone, address }).then(() => {
            this.props.navigation.navigate('Home')
          }).catch(() => {
            Alert.alert("Register Failed", this.props.user.errMessage.toString());    
          })
        }
    }

    removeTheField(message) {
        return message.replace("The field","")
    }

    render() {
        return (
          <KeyboardAwareScrollView>
              <View style={styles.container}>
                {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text key={errorMessage.toString()} style={common.textError}>{this.removeTheField(errorMessage)}</Text>) }
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'Email'}
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

                {this.isFieldInError('password2') && this.getErrorsInField('password2').map(errorMessage => <Text key={errorMessage.toString()} style={common.textError}>{this.removeTheField(errorMessage.replace("password2","confirm password"))}</Text>) }
                <TextInput
                    value={this.state.password2}
                    onChangeText={(password2) => this.setState({ password2 })}
                    placeholder={'Comfirm Password'}
                    secureTextEntry={true}
                    style={this.isFieldInError('password2') ? common.inputError : common.input}
                />

                {this.isFieldInError('clinic') && this.getErrorsInField('clinic').map(errorMessage => <Text key={errorMessage.toString()} style={common.textError}>{this.removeTheField(errorMessage)}</Text>) }
                <TextInput
                    value={this.state.clinic}
                    onChangeText={(clinic) => this.setState({ clinic })}
                    placeholder={'Clinic Name'}
                    style={this.isFieldInError('clinic') ? common.inputError : common.input}
                />

                {this.isFieldInError('phone') && this.getErrorsInField('phone').map(errorMessage => <Text key={errorMessage.toString()} style={common.textError}>{this.removeTheField(errorMessage)}</Text>) }
                <TextInput
                    value={this.state.phone}
                    onChangeText={(phone) => this.setState({ phone })}
                    placeholder={'Phone Number'}
                    keyboardType="numeric"
                    style={this.isFieldInError('phone') ? common.inputError : common.input}
                />
                
                {this.isFieldInError('address') && this.getErrorsInField('address').map(errorMessage => <Text key={errorMessage.toString()} style={common.textError}>{this.removeTheField(errorMessage)}</Text>) }
                <TextInput
                    value={this.state.address}
                    onChangeText={(address) => this.setState({ address })}
                    placeholder={'Address'}
                    style={this.isFieldInError('address') ? common.inputError : common.input}
                />

                {this.state.password2 != this.state.password ? <Text style={styles.passwordtError}>Password & Confirm Password must be same</Text>:<Text></Text>}
                <Button
                    title={'Register'}
                    style={common.input}
                    onPress={this.onRegister.bind(this)}
                />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    margin: 20
  },
    passwordtError: {
        fontSize: 10,
        color:'red'
    }
  });

  const mapStateToProps = state => {
    return {
      user: state.userReducer
    };
  }

  export default connect(mapStateToProps, {fetchRegister})(Register);