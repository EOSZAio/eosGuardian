import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Button, Card, Header, CardSection, HeaderWithImage } from './common/';
import { Actions } from 'react-native-router-flux';
import { getInfo, transaction } from '../utils/eosjs-client';
import ViewNotification from './ViewNotification';
import { pickerGetBalance } from '../actions';

class LandingPage2 extends Component {
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
        const { name, image, account, balance } = this.props.picker;
        const  {
            thumbnailContainerStyle,
            thumbnailStyle,
            conentStyle,
            titleStyle
        } = styles;
        return (
        <View>
            <Header headerText={"PROFILE"} />
             <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image
                    style={thumbnailStyle}
                    source={{ uri: 'https://mytribez.com/images/975aa59e-5e0a-4d50-93cb-7189918676a6.png' }}
                    />
                </View>
                <View style={conentStyle}>
                    <Text style={titleStyle}>Account: {name}</Text>
                    <Text style={titleStyle}>Status: Gold member</Text>
                    <Text style={titleStyle}>Balance: {(balance ? balance : '$0.00')}</Text>
                </View>
            </CardSection>

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

            {this.checkDone()}

        </View>
        );
    }
}

const mapStateToProps = state => {
  const picker = state.picker;

  return { picker };
};

const styles = {
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignContent: 'center',
      marginLeft: 10,
      marginRight: 10
    },
    thumbnailStyle: {
      height: 50,
      width: 50,
      borderRadius: 5
    },
    conentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    titleStyle: {
      fontSize: 18,
      paddingLeft: 5
    }
  };

export default connect(mapStateToProps, { pickerGetBalance })(LandingPage2);
