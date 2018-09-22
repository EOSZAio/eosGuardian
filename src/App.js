import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Router from './router';
import reducers from './reducers';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyC58VbKdzRQ78axW0mJhhLSfhlzaNArPbM',
            authDomain: 'eosguardian-50c98.firebaseapp.com',
            databaseURL: 'https://eosguardian-50c98.firebaseio.com',
            projectId: 'eosguardian-50c98',
            storageBucket: 'eosguardian-50c98.appspot.com',
            messagingSenderId: '746350971956'
          };

          firebase.initializeApp(config);
    }


    render() {
        const store = createStore(reducers, {}, applyMiddleware(thunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
