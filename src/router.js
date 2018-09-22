import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HelloWorld from './components/HelloWorld';


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
                     <Scene key="helloWorld"
                        //rightTitle="Add"
                        //onRight={() => Actions.addAccount()}
                        component={HelloWorld}
                        title="Hello World!"
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
