import React, { Component } from 'react';
import { StyleSheet, Button, View, ScrollView, SafeAreaView, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AsyncStorage.setItem('isLogout', 'false')
        this.props.navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            AsyncStorage.setItem('isLogout', 'true').then(() => {
              this.props.navigation.dispatch(e.data.action)
            })
        });
    }

    async onLogout() {
        this.props.navigation.navigate('Login')
    }

    onAccessRecordAgenda() {
        this.props.navigation.navigate('Agenda')
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    <Text style={styles.clinic}>Hi, {this.props.user.clinic}</Text>
                    <View style={styles.field}>
                        <Button
                            title="Consultation Records"
                            color="green"
                            onPress={this.onAccessRecordAgenda.bind(this)}
                            />
                    </View>
                    <View style={styles.field}>
                        <Button
                            title="logout"
                            onPress={this.onLogout.bind(this)}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginHorizontal: 16,
    },
    clinic: {
        margin: 10,
    },
    field: {
        marginTop: 15,
        marginHorizontal: 16,
    }
})

const mapStateToProps = state => {
    return {
      user: state.userReducer.user
    };
  }

export default connect(mapStateToProps)(Home);
