import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button, Card, Header, CardSection, HeaderWithImage } from './common/';
import { Actions } from 'react-native-router-flux';
import { getInfo, transaction } from '../utils/eosjs-client';
import ViewNotification from './ViewNotification';
import { pickerGetBalance } from '../actions';

class LandingPage extends Component {
    componentWillMount() {

        getInfo().then(info => {
            console.log("data",info);
          });
        this.props.pickerGetBalance({ account: 'testuser1' });

         /* const jdata={
            user: "testuser1",
            msg_id: 2,
            data: { "access": "Cape Epic"} ,
            field: "medical"
        }


          transaction("testuser1", "upsert", jdata).then(result => {
            console.log("data",result);
          }).catch(err => {
            console.log("data",err);
          });*/
    }

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
            <Header headerText={"PROFILE"} />
            <Card>
              <Text>User: Rory Mapstone</Text>
              <Text>Token Balance: {this.picker.balance}-</Text>
            </Card>

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

            {this.checkDone()}

        </View>
        );
    }
}

const mapStateToProps = state => {
  const picker = state.picker;

  return { picker };
};

export default connect(mapStateToProps, { pickerGetBalance })(LandingPage);
