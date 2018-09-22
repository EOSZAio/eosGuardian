import React from 'react';
import { View, Text, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { container, cardSectionStyle, textStyle } = styles;
  return (
      <Modal
       animationType="slide"
       onRequestClose={() => {}}
       transparent
       visible={visible}
      >
          <View style={container}>
              <CardSection style={cardSectionStyle}>
                <Text style={textStyle}>
                {children}
                </Text>
              </CardSection>
              <CardSection>
                <Button click={onAccept}>
                  Yes
                </Button>
                <Button click={onDecline}>
                  No
                </Button>
              </CardSection>
          </View>
      </Modal>
        
    );
};

const styles = {
   cardSectionStyle: {
    justifyContent: 'center'
  },
   textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
    container: {
      position: 'relative',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      flex: 1,
      justifyContent: 'center'
    }
};

export { Confirm };
