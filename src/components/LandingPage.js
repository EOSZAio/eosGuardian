import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, CardSection, Card } from './common/';
import { Actions } from 'react-native-router-flux';
import { getInfo, transaction } from '../utils/eosjs-client';

class LandingPage extends Component {
    onGrantPress() {
        //const { email, password } = this.props;
        //this.props.loginUser({ email, password });
        Actions.grantAccess();
    }

    onRevokePress() {
        
    }

    onAuditPress() {
        
    }

    componentWillMount() {
    
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
                    Audit Summary
                </Button>
            </CardSection>
        </View>
        );
    }
}

export default LandingPage;
