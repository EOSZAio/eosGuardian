// Import a lib to help create a component
import React from 'react';
import { Text, View, Image } from 'react-native';

// Create a component
const HeaderWithImage = (props) => {
   const { textStyle, viewStyle, thumbNail } = styles;
   return (
        <View style = {viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
            <Image style={thumbNail} source={require('../../../resources/bell.jpg')} />
        </View>
   );
   
   /*
   return (
        <View style = {style.viewStyle}>
            <Text style={style.textStyle}>Albums</Text>
        </View>
   );
   */
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddtingTop: 15,
        shadowColor:'#000',
        shadowOffset: { width:0, height:2},
        shadowOpacity: 0.2
    },
    textStyle: {
        fontSize: 20
    },
    thumbNail: {

    }
};

// makme component available to other parts of the application
export  {HeaderWithImage};