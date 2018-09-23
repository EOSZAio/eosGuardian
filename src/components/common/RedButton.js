import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const RedButton = ({ onPress, children }) => {
    const { button, text } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={button}>
            <Text style={text}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    text: {
        alignSelf: 'center',
        color: '#ff0000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ff0000',
        marginLeft: 5,
        marginRight: 5
    }
};

export { RedButton }; //same as { 'Button' : Button}