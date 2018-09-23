import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, RedButton, Header, Card, CardSection, ActionSucceeded } from './common';
import { transaction } from '../utils/eosjs-client';

class ViewNotification extends Component {
  state = { showModal: false };

  onReject() {
    Actions.landingPage();
  }

  onSuccess() {
    this.setState({ showModal: false });
    Actions.landingPage2();
  }

  onAccept() {

    const jdata = {
      user: "testuser1",
      msg_id: 6,  //this is unique key, if we want to add a new record we need to increment this.
      data: this.props.notification,
      field: "medical"
  };
    //insert new permission to blockchain here
    transaction("testuser1", "upsert", jdata).then(result => {
      this.setState({ showModal: !this.state.showModal }); // show action succeeded!
    }).catch(err => {
      console.log("data",err);
    });
// following only if node not running
      //this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { headerStyle, detailStyle } = styles;
    return (
      <View>
        <Header headerText={"NEW ACCESS REQUEST"} />
        <Header headerText={"Type: Emergency Details"} />
      <CardSection>
          <Card>
            <Text>Access requested by: {this.props.notification.access}</Text>
            <Text>Date from: {this.props.notification.datefrom}</Text>
            <Text>Date to: {this.props.notification.dateto}</Text>
            <Text />
            <Text>ID Number: {this.props.notification.idnumber}</Text>
            <Text>Name: {this.props.notification.name}</Text>
            <Text>Surname: {this.props.notification.surname}</Text>
            <Text>Gender: {this.props.notification.gender}</Text>
            <Text>Emergency Contact Name: {this.props.notification.emname}</Text>
            <Text>Emergency Contact Phone Number: {this.props.notification.emphone}</Text>
            <Text>Medical Aid Name: {this.props.notification.medname}</Text>
            <Text>Medical Aid Number: {this.props.notification.mednumber}</Text>
            <Text>Allergies: {this.props.notification.allergies}</Text>
            <Text>Blood Group: {this.props.notification.bloodgroup}</Text>
            <Text>Any known pre-existing medical conditions: {this.props.notification.conditions}</Text>
            <Text>Doctors Name: {this.props.notification.doctor}</Text>
          </Card>
        </CardSection>

          <CardSection>
            <Button onPress={this.onAccept.bind(this)}>
              Approve
            </Button>
          </CardSection>

          <CardSection>
            <RedButton onPress={this.onReject.bind(this)} style={{ color: '#ff0000' }}>
              Reject
            </RedButton>
          </CardSection>

          <ActionSucceeded
          visible={this.state.showModal}
          onAccept={this.onSuccess.bind(this)}
          >
            Access Granted
          </ActionSucceeded>
        </View>
    );
  }
}

const styles = {
  headerStyle: {
      fontSize: 20,
      flex: 1,
      flexDirection: 'column'
  },
  detailStyle: {
      flex: 1,
      flexDirection: 'column'
  }
};

const mapStateToProps = state => {
  const notification = state.notification;

  return { notification };
};

export default connect(mapStateToProps)(ViewNotification);  //<-connect returns a function called with LibraryList
