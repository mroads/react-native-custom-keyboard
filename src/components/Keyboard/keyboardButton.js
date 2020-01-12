/* eslint-disable no-undef */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-duplicates */
// 'use strict';
import {
  Image, StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import * as React from 'react';

class KeyboardButton extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { isFocused: false };
    this.images = {
      light: {
        backspace: require('../../assets/images/keyboard/backspace.png'),
        shift: require('../../assets/images/keyboard/capsOff.png'),
        shiftCapsLock: require('../../assets/images/keyboard/capsLock.png'),
        shiftCaps: require('../../assets/images/keyboard/capsOn.png'),
        spacebar: require('../../assets/images/keyboard/spacebar.png'),
        nextLine: require('../../assets/images/keyboard/enter.png'),
      },
      dark: {
        backspace: require('../../assets/images/keyboard/backspace-white.png'),
        shift: require('../../assets/images/keyboard/capsOffWhite.png'),
        shiftCapsLock: require('../../assets/images/keyboard/capsLockWhite.png'),
        shiftCaps: require('../../assets/images/keyboard/capsOnWhite.png'),
        spacebar: require('../../assets/images/keyboard/spacebar.png'),
        nextLine: require('../../assets/images/keyboard/enter-white.png'),
      },
    };
  }

  onBlur = () => {
    this.setState({ isFocused: false });
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onPress = () => {
    const { onPress } = this.props;
    onPress && onPress();
  };

  onLongPress = () => {
    const { onLongPress } = this.props;
    onLongPress && onLongPress();
  };

  render() {
    const {
      keyboardButtonContainerStyle,
      keyboardButtonTextStyle,
      keyboardButtonTextPressStyle,
      keyboardButtonStyle,
      keyboardButtonPressStyle,
      keyboardButtonDigitStyle,
      keyboardButtonDigitLongPressStyle,
      width,
      image,
      isCaps,
      text,
      capsLock,
      theme,
    } = this.props;
    const { isFocused } = this.state;
    const digit = text.digit ? text.digit : null;
    const keytext = text.text ? text.text : text;
    const images = theme === 'light' ? this.images.light : this.images.dark;
    let newStyle = {};
    if (width === 2) {
      newStyle = { width: styles.container.width * 2.05 };
    } else if (width === 3) {
      newStyle = { width: styles.container.width * 3.1 };
    } else if (width === 4) {
      newStyle = { width: styles.container.width * 5.15 };
    }
    let tintColor;
    if (keyboardButtonTextPressStyle && keyboardButtonTextStyle) {
      tintColor = isFocused ? keyboardButtonTextPressStyle.color : keyboardButtonTextStyle.color;
    } else {
      tintColor = isFocused ? styles.textPress.color : styles.text.color;
    }
    return (
      <View style={[styles.container, keyboardButtonContainerStyle, newStyle]}>
        <TouchableOpacity
          style={[
            isFocused ? styles.buttonPress : styles.button,
            isFocused ? keyboardButtonPressStyle : keyboardButtonStyle,
            newStyle,
          ]}
          onPress={this.onPress}
          onLongPress={this.onLongPress}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        >
          {digit ? (
            <Text
              style={[
                isFocused ? styles.digitPress : styles.number,
                isFocused ? keyboardButtonDigitLongPressStyle : keyboardButtonDigitStyle,
                styles.digits,
              ]}
            >
              {digit}
            </Text>
          ) : null}
          {image ? (
            <Image
              resizeMode="center"
              tintColor={tintColor}
              source={
                // eslint-disable-next-line no-nested-ternary
                image === 'shift' && capsLock
                  ? images[`${image}CapsLock`]
                  : image === 'shift' && isCaps
                    ? images[`${image}Caps`]
                    : images[image]
              }
            />
          ) : (
            <Text
              style={[
                isFocused ? styles.textPress : styles.text,
                isFocused ? keyboardButtonTextPressStyle : keyboardButtonTextStyle,
              ]}
            >
              {isCaps === true && width === undefined ? keytext.toUpperCase() : keytext}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

KeyboardButton.propTypes = {
  onTapped: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    margin: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  textPress: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  buttonPress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  number: {
    fontSize: 16,
  },
  digits: {
    top: 0,
    left: 0,
  },
});

export default KeyboardButton;
