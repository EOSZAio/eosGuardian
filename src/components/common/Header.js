// Import a lib to help create a component
import React from 'react';
import { Text, View } from 'react-native';

// Create a component
const Header = (props) => {
   const { textStyle, viewStyle } = styles;
   return (
        <View style = {viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
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
        height: 38,
        paddingTop: 5,
        paddingBottom: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2
    },
    textStyle: {
        fontSize: 18
    }
};

// makme component available to other parts of the application
export  {Header};
