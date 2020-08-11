import React, { Component } from 'react';
import { Text, SafeAreaView, ScrollView, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import common from '../../styles/common';

import { fetchConsultationDetail, emptyConsultationDetail } from '../../redux/actions/consultationActions';
import { connect } from 'react-redux';

import moment from 'moment';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isRefreshing: true,
        }
    }

    componentDidMount() {
      this.props.fetchConsultationDetail({
          id: this.props.route.params.id,
      })
    }

    componentDidUpdate(preProp) {
      if (preProp.isFetching != this.props.isFetching && !this.props.isFetching) {
        this.setState({
          isRefreshing: false
        })
      }
      if (preProp.consultation.errMessage != this.props.consultation.errMessage
        && this.props.consultation.errMessage != '') {
        Alert.alert("Agenda Fail", this.props.consultation.errMessage.toString())
      }
    }

    render() {
        if (this.state.isRefreshing) {
            return (<View style={common.container}><ActivityIndicator size="large"/></View>)
        } else {
            return (
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    <Text style={styles.field}>
                        <Text>Patient</Text> : <Text> {this.props.detail.patient} </Text>
                    </Text>
                    <Text style={styles.field}>
                        <Text>Doctor</Text> : <Text> {this.props.detail.doctor} </Text>
                    </Text>
                    <Text style={styles.field}>
                        <Text>Date</Text> : <Text> {moment(this.props.detail.start).format('YYYY-DD-MM HH:MM')} - {moment(this.props.detail.end).format('YYYY-DD-MM HH:MM')} </Text>
                    </Text>
                    <Text style={styles.field}>
                        <Text>Diagnosis</Text> : <Text> {this.props.detail.diagnosis} </Text>
                    </Text>
                    <Text style={styles.field}>
                        <Text>Medication</Text> : <Text> {this.props.detail.medication} </Text>
                    </Text>
                    <Text style={styles.field}>
                        <Text>Fee</Text> : <Text> {this.props.detail.fee} </Text>
                    </Text>
                    <Text style={styles.field}>
                        <Text>Followup</Text> : <Text> {this.props.detail.hasFollowup ? "True" : "False"} </Text>
                    </Text>
                </ScrollView>
            </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    field: {
        flexDirection: 'row',
        marginTop: 10,
    }
})
// Detail.propTypes = {
//     record: PropTypes.object.isRequired
// }

const mapStateToProps = state => {
    return {
        detail: state.consultationReducer.detail,
        consultation: state.consultationReducer,
        isFetching: state.consultationReducer.isFetching,
        auth: state.userReducer.auth
    };
  }
  
  export default connect(mapStateToProps, { fetchConsultationDetail, emptyConsultationDetail })(Detail);
  