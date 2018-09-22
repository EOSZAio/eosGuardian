import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, CardSection, HeaderWithImage } from './common/';
import { Actions } from 'react-native-router-flux';
import { getInfo, transaction } from '../utils/eosjs-client';
import ViewNotification from './ViewNotification';

class LandingPage extends Component {
    onGrantPress() {
        //const { email, password } = this.props;
        //this.props.loginUser({ email, password });
        Actions.grantAccess();
    }

    onRevokePress() {
<<<<<<< HEAD

=======
        Actions.revokeAccess();
>>>>>>> andreas-branch
    }

    onAuditPress() {

    }

    componentWillMount() {

    }

    onTest() {
      Actions.ViewNotification();
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

            <CardSection>
                <Button onPress={this.onTest.bind(this)}>
                    Test
                </Button>
            </CardSection>
        </View>
        );
    }
}

export default LandingPage;
