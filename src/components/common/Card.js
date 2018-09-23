import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};

const styles = {
    container: {
        borderWidth : 1,
        borderRadius: 2,
        borderColor: '#AAA',
        borderBottomWidth: 1,
//        shadowColor: '#AAA',
//        shadowOffset: { width: 0, height: 2 },
//        shadowOpacity: 0.2,
//        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 8,
        padding: 5
    }
};

export { Card };
