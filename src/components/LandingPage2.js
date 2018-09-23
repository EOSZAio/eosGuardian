import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Header, CardSection, HeaderWithImage } from './common/';
import { Actions } from 'react-native-router-flux';
import { getInfo, transaction } from '../utils/eosjs-client';
import ViewNotification from './ViewNotification';

class LandingPage2 extends Component {
  state = { addDone: false };

    onGrantPress() {
        //const { email, password } = this.props;
        //this.props.loginUser({ email, password });
        Actions.ViewNotification();
    }

    onTest() {
      Actions.ViewNotification();
    }

    checkDone() {

    }

    render() {
        return (
        <View>
            <Header headerText={"ACCEPTED REQUESTS"} />

            <Card>
                <Text>Discovery Health (Type: Daily Exercise)</Text>
                <Text>Granted: 01/10/2015 Expires: -</Text>
            </Card>

            <Card>
                <Text>First Direct (Type: Location)</Text>
                <Text>Granted: 02/11/2010 Expires: 01/11/2030</Text>
            </Card>

            <Card>
                <Text>Pfizer (Type: Daily Cholesterol)</Text>
                <Text>Granted: 05/12/2017 Expires: 04/11/2020</Text>
            </Card>

            <Card>
                <Text>Cape Epic (Type: Emergency Details)</Text>
                <Text>Granted: 24/09/2018 Expires: 25/03/2019</Text>
            </Card>

        </View>
        );
    }
}

export default LandingPage2;
