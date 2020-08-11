import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import {Agenda} from 'react-native-calendars';

import { fetchConsultationSimpleRecords } from '../../redux/actions/consultationActions';
import { connect } from 'react-redux';
import moment from 'moment';

class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {
      },
      currentDateString: '',
      refreshing: false
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderEmptyData = {this.renderEmptyDate.bind(this)}
        refreshing={this.state.refreshing}
      />
    );
  }

  isNotContainCurrentMonth(date) {
    let currentMonth = date.month
    let currentYear = date.year

    return Object.keys(this.state.items).filter(x => {
      let month = moment(x).format('MM')
      let year = moment(x).format('YYYY')
      return (currentMonth == month) && (currentYear == year)
    }).length <= 0
  }
  
  async loadItems(date) {
      let dateString = date.dateString
      this.setState({
        currentDateString: dateString
      })
      if (this.isNotContainCurrentMonth(date) && !this.state.refreshing) {
        await this.props.fetchConsultationSimpleRecords({
          clinic: this.props.user.clinic,
          start: moment(dateString).startOf('month').format('YYYY-MM-DD 00:00:00'),
          end: moment(dateString).endOf('month').format('YYYY-MM-DD 23:59:59')
        }, this.props.auth.accessToken)

        this.setState({
          refreshing: true
        })
      }
  }

  componentDidUpdate(preProp) {
    if (preProp.consultation.errMessage != this.props.consultation.errMessage
      && this.props.consultation.errMessage != '') {
      Alert.alert("Agenda Fail", this.props.consultation.errMessage.toString())
    }

    if (Object.keys(this.props.user).length == 0) {
      this.props.navigation.navigate('Login')
    }

    let keysOfRecords = Object.keys(this.props.consultation.records) // e.g., 2020-09-09
    if (preProp.consultation.records != this.props.consultation.records && keysOfRecords.length > 0) {
      var newItems = {}
      newItems[this.state.currentDateString] = []
      keysOfRecords.forEach(key => {newItems[key] = this.props.consultation.records[key]});
      this.setState({
        items: newItems
      })
    }
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item]} 
        onPress={() => this.props.navigation.navigate('Detail', {id:item._id})}
      >
        <Text>{item.patient}</Text>
        <Text>{moment(item.start).format('HH:MM')} - {moment(item.end).format('HH:MM')}</Text>
        <Text>Doctor: {item.doctor}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={[styles.emptyDate]}>
        <Text></Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

const mapStateToProps = state => {
  return {
    consultation: state.consultationReducer,
    user: state.userReducer.user,
    auth: state.userReducer.auth
  };
}

export default connect(mapStateToProps, { fetchConsultationSimpleRecords })(AgendaScreen);
