import React from 'react';
import { View, Image, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import LandingPage2 from './components/LandingPage2';
import GrantAccess from './components/GrantAccess';
import RevokeAccess from './components/RevokeAccess';
import ViewNotification from './components/ViewNotification';

const RouterComponent = () => {
  //                        renderTitle={() => { return <AppLogo />; }}

    const AppLogo = () => {
        return (
          <View style={styles.header}>
            <View style={styles.text}>
                <Text style={styles.font}>EOS Guardian</Text>
            </View>
            <View style={styles.logo}>
                <Image
                style={styles.imageLogo}
                source={require('./../resources/bell.jpg')}
                />
            </View>
          </View>
        );
      };

    return (
        <Router>
            <Scene key='root' hideNavBar>
                {/*<Scene key="auth">
                    <Scene
                        key="login"
                        component={LoginForm}
                        title="Please Login"
                        initial
                    />
    </Scene>*/}
                <Scene key="main">
                    <Scene key="landingPage"
                      component={LandingPage}
                      rightTitle="Add"
                      onRight={() => Actions.ViewNotification()}
                      title="EOS Guardian"
                      initial
                    />

                    <Scene key="ViewNotification"
                        component={ViewNotification}
                        title="Grant Access"
                    />

                    <Scene key="landingPage2"
                      component={LandingPage2}
                      title="EOS Guardian"
                    />


                </Scene>
            </Scene>
        </Router>
    );
};


const styles = {
    background: {
      backgroundColor: '#148ECE'
    },
    header: {
      backgroundColor: '#148ECE',
      flexDirection: 'row',
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.3,
      elevation: 9,
      position: 'relative',
      flex:1
    },
    menu: {
      flex: 1,
      justifyContent: 'center'
    },
    logo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    text: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    font: {
      fontSize: 18,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#000',
    },
    imageLogo: {
      height: 25,
      width: 25,
      alignItems: 'center',
      flex: 1
      }
  };

export default RouterComponent;
