import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, CardSection, HeaderWithImage } from './common/';
import { Actions } from 'react-native-router-flux';
import { getInfo, transaction } from '../utils/eosjs-client';

class LandingPage extends Component {

    componentWillMount() {
        getInfo().then(info => {
            console.log("data",info);
          });

          const jdata={
            user: "testuser1",
            msg_id: 2,
            data: { "access": "Cape Epic"} ,
            field: "medical"
        }


          transaction("testuser1", "upsert", jdata).then(result => {
            console.log("data",result);
          }).catch(err => {
            console.log("data",err);
          })
    }

    onGrantPress() {
        //const { email, password } = this.props;
        //this.props.loginUser({ email, password });
        Actions.grantAccess();
    }

    onRevokePress() {
        Actions.revokeAccess();
    }

    onAuditPress() {
        
    }

    render() {
        return (
        <View>

            <CardSection>
                <Button onPress={this.onGrantPress.bind(this)}>
                    Grant Access
                </Button>
            </CardSection>

            <CardSection>
                <Button onPress={this.onRevokePress.bind(this)}>
                    Revoke Access
                </Button>
            </CardSection>

            <CardSection>
                <Button onPress={this.onAuditPress.bind(this)}>
                    Permissions
                </Button>
            </CardSection>
        </View>
        );
    }
}

export default LandingPage;
