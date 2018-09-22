import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import GrantAccess from './components/GrantAccess';


const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root' hideNavBar>
                <Scene key="auth">
                    <Scene 
                        key="login" 
                        component={LoginForm} 
                        title="Please Login"
                        initial
                    />
                </Scene>
                <Scene key="main">
                     <Scene key="landingPage"
                        //rightTitle="Add"
                        //onRight={() => Actions.addAccount()}
                        component={LandingPage}
                        title="eosGuardian"
                    />

                    <Scene key="grantAccess"
                        //rightTitle="Add"
                        //onRight={() => Actions.addAccount()}
                        component={GrantAccess}
                        title="Grant Access"
                    />

                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
