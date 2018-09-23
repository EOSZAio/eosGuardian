import React from 'react';
import { Text, View, Modal, Image } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const ActionSucceeded = ({ children, visible, onAccept }) => {
  const { containerStyle, textStyle, cardSectionStyle, thumbNail } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >

      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>
        <CardSection>
          <Image style={thumbNail} source={require('../../../resources/accepted.png')} />
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}>Ok</Button>
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
    flexDirection: 'column',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    color: 'green'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  thumbNail: {
    flex: 1,
    resizeMode: 'contain',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { ActionSucceeded };
