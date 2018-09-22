import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class ViewNotification extends Component {
  renderNotification(data) {
    return (
        <Text>Access requested by: {data.access}</Text>
        <Text>Date from: {data.datefrom}</Text>
        <Text>Date to: {data.dateto}</Text>
        <Text> </Text>
        <Text>ID Number: {data.idnumber}</Text>
        <Text>Name: {data.name}</Text>
        <Text>Surname: {data.surname}</Text>
        <Text>Gender: {data.gender}</Text>
        <Text>Emergency Contact Name: {data.emname}</Text>
        <Text>Emergency Contact Phone Number: {data.emphone}</Text>
        <Text>Medical Aid Name: {data.medname}</Text>
        <Text>Medical Aid Number: {data.mednumber}</Text>
        <Text>Allergies: {data.allergies}</Text>
        <Text>Blood Group: {data.bloodgroup}</Text>
        <Text>Any known pre-existing medical conditions: {data.conditions}</Text>
        <Text>Doctors Name: {data.doctor}</Text>
    );
  }

  render() {
    return (
      <Card>
        {this.renderNotification(this.props.data)}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const data = state.notification;

  return { data };
};

export default connect(mapStateToProps)(ViewNotification);  //<-connect returns a function called with LibraryList
