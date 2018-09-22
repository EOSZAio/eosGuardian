import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class ViewNotification extends Component {
  renderNotification(data) {
    Object.keys(data).forEach((key) => {
        //return <Text>{key}+': '+{data[key]}</Text>;
        console.log(key);
        return (
          <CardSection>
          <Text>aadskldfjkfd</Text>
          </CardSection>);
        console.log('la');
    });

    //for (var key in data) {
    // check if the property/key is defined in the object itself, not in parent
    //  return <Text>a</Text>;
    //}
  }


//  renderNotification(list) {
//    const result= _.map(list.item, function(value, key) {
//       key+': '+value
//    }
//  }

  render() {
    console.log('here',this.state);
    return (
      <Card>
        <Text>Hello</Text>
        {this.renderNotification(this.props.data)}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const data = state.notification;

  return { data };
};

export default connect(mapStateToProps)(ViewNotification);  //<-connect returns a function called with LibraryList
