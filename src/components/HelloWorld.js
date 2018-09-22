import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getInfo, transaction } from './../utils/eosjs-client';

class HelloWorld extends Component {
    state = {
        blockInfo: '',
        hello: ''
    }

    componentWillMount() {
        getInfo().then(info => {
            console.log("mc data",info);
            this.setState({ blockInfo: JSON.stringify(info) });
          });

          transaction('user', 'hi', {user: 'user'}) //account, action, data
          .then(resp => {
            console.log("transact success:", resp);
            this.setState({ hello: 'user' });
          })
          .catch(error => {
              console.log(error);
          })
    }

    render() {
        return (
           <View>
               <Text>
                   Block Info: {this.state.blockInfo}
               </Text>
               <Text>
                   Hello user: {this.state.hello}
               </Text>
           </View>
        );
    }
}

export default HelloWorld;
