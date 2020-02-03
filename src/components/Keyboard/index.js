/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable dot-notation */
/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
// 'use strict';
import { Component } from 'react';
// import PropTypes from 'prop-types';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import KeyboardButton from './keyboardButton';
import keyboardData from './keyboardData';

const keyboardThemeConfig = {
  light: {
    keyboardContainer: {},
  },
  dark: {
    keyboardContainer: {
      backgroundColor: '#4A4A4A',
    },
    keyboardButtonStyle: {
      backgroundColor: 'transparent',
    },
    keyboardButtonPressStyle: {
      backgroundColor: '#666666',
    },
    keyboardButtonTextStyle: {
      color: 'white',
    },
    keyboardButtonTextPressStyle: {
      color: 'white',
    },
    keyboardButtonDigitStyle: {
      color: 'white',
    },
    keyboardButtonDigitLongPressStyle: {
      color: 'white',
    },
  },
};

const keyboardSizeConfig = {
  xsmall: {
    keyboardButtonContainerStyle: { width: 40, height: 30 },
    keyboardButtonTextStyle: { fontSize: 16 },
    domainButtonStyle: { width: 100, height: 30 },
    domainTextStyle: { fontSize: 14 },
  },
  small: {
    keyboardButtonContainerStyle: { width: 40, height: 40 },
    keyboardButtonTextStyle: { fontSize: 18 },
    domainButtonStyle: { width: 120, height: 40 },
    domainTextStyle: { fontSize: 15 },
  },
  medium: {
    keyboardButtonContainerStyle: { width: 60, height: 50 },
    keyboardButtonTextStyle: { fontSize: 20 },
    domainButtonStyle: { width: 140, height: 50 },
    domainTextStyle: { fontSize: 18 },
  },
  large: {
    keyboardButtonContainerStyle: { width: 77, height: 50 },
    keyboardButtonTextStyle: { fontSize: 22 },
    domainButtonStyle: { width: 170, height: 50, paddingHorizontal: 10 },
    domainTextStyle: { fontSize: 20 },
  },
  xlarge: {
    keyboardButtonContainerStyle: { width: 85, height: 50 },
    keyboardButtonTextStyle: { fontSize: 22 },
    domainButtonStyle: { width: 200, height: 50, paddingHorizontal: 20 },
    domainTextStyle: { fontSize: 20 },
  },
  xxl: {
    keyboardButtonContainerStyle: { width: 85, height: 74 },
    keyboardButtonTextStyle: { fontSize: 28 },
    domainButtonStyle: { width: 210, height: 74 },
    domainTextStyle: { fontSize: 26 },
  },
};

class Keyboard extends Component<Props> {
  constructor(props) {
    super(props);
    const { disableEnterButton } = this.props;
    this.allIndices = {
      regularIndices: [0, 1, 2, 3, 4],
      specialNormalIndices: [0, 5, 6, 7],
      emailNormalIndices: [23, 0, 1, 2, 3, 10],
      emailSpecialIndices: [0, 6, 7, 8, 4, 5],
      passswordNormalIndices: [0, 1, 2, 3, 9],
      passswordSpecialIndices: [6, 10, 11, 12, 9],
      passswordAccentIndices: [0, 13, 14, 15, 9],
    };
    if (disableEnterButton) {
      this.allIndices = {
        regularIndices: [0, 1, 24, 3, 4],
        specialNormalIndices: [0, 25, 6, 7],
        emailNormalIndices: [23, 0, 1, 24, 3, 10],
        emailSpecialIndices: [0, 6, 7, 8, 4, 25],
        passswordNormalIndices: [0, 1, 24, 3, 9],
        passswordSpecialIndices: [6, 10, 11, 12, 9],
        passswordAccentIndices: [0, 13, 14, 15, 9],
      };
    }
    const initialIndices = {
      text: this.allIndices.regularIndices,
      email: this.allIndices.emailNormalIndices,
    };
    this.state = {
      indices: initialIndices[props.inputType || 'text'],
      isCaps: true,
      isSpecial: false,
      isAccent: false,
      capsLock: false,
    };
  }

  shouldComponentUpdate(nextProps) {
    const { emailNormalIndices, passswordNormalIndices } = this.allIndices;
    const { inputType } = this.props;
    if (inputType !== nextProps.inputType) {
      this.setState({
        isSpecial: false,
        isAccent: false,
        indices: nextProps.inputType === 'text' ? passswordNormalIndices : emailNormalIndices,
      });
    }
    return true;
  }

  onPress(char) {
    const { inputType, onInput, value } = this.props;
    const { isCaps, capsLock } = this.state;
    const { regularIndices, specialNormalIndices, emailNormalIndices } = this.allIndices;
    switch (char) {
      case 'backspace':
        onInput(value.slice(0, -1));
        if (value.slice(0, -1) === '') {
          this.setState({
            isCaps: true,
            capsLock: false,
          });
        }
        break;
      case 'shift': {
        if (!capsLock) {
          this.setState({
            isCaps: !isCaps,
          });
        }
        break;
      }
      case '?123':
        this.setState({
          isSpecial: true,
          isAccent: false,
          indices: inputType === 'text' ? specialNormalIndices : specialNormalIndices,
        });
        break;
      case 'ABC':
        this.setState({
          isSpecial: false,
          isAccent: false,
          indices: inputType === 'text' ? regularIndices : emailNormalIndices,
        });
        break;
      case 'àáâ':
        this.setState({
          isSpecial: false,
          isAccent: true,
          indices: this.allIndices.passswordAccentIndices,
        });
        break;
      // eslint-disable-next-line no-case-declarations
      default:
        const receivedChar = char.text ? char.text : char;
        const addition = isCaps ? receivedChar.toUpperCase() : receivedChar;
        let inputText = value ? value + addition : addition;
        if (inputType === 'email') inputText = inputText.replace(/@@/g, '@');
        onInput(inputText);
        if (value + addition === '') {
          this.setState({
            isCaps: true,
          });
        } else {
          this.setState((prevState) => ({
            isCaps: !!prevState.capsLock,
          }));
        }
    }
  }

  onLongPress(char) {
    const { value, onInput } = this.props;
    const { isCaps, capsLock } = this.state;
    // const {
    //   emailNormalIndices,
    //   emailSpecialIndices,
    //   passswordNormalIndices,
    //   passswordSpecialIndices,
    // } = this.allIndices;
    switch (char) {
      // case 'backspace':
      // onInput(value.slice(0, -1));
      // if (value.slice(0, -1) === '') {
      //   this.setState({
      //     isCaps: true,
      //     capsLock: false,
      //   });
      // }
      // break;
      case '':
        break;
      case 'shift': {
        if (capsLock) {
          this.setState({
            capsLock: !capsLock,
            isCaps: value === '',
          });
        } else {
          this.setState({
            capsLock: !capsLock,
            isCaps: true,
          });
        }
        break;
      }
      // case '!#$':
      //   this.setState({
      //     isSpecial: true,
      //     isAccent: false,
      //     indices: inputType === 'text' ? passswordSpecialIndices : emailSpecialIndices,
      //   });
      //   break;
      // case 'abc':
      //   this.setState({
      //     isSpecial: false,
      //     isAccent: false,
      //     indices: inputType === 'text' ? passswordNormalIndices : emailNormalIndices,
      //   });
      //   break;
      // case 'àáâ':
      //   this.setState({
      //     isSpecial: false,
      //     isAccent: true,
      //     indices: this.allIndices.passswordAccentIndices,
      //   });
      //   break;
      // eslint-disable-next-line no-case-declarations
      // default:
      //   const addition = isCaps ? char.toUpperCase() : char;
      //   onInput(value ? value + addition : addition);
      //   if (value + addition === '') {
      //     this.setState({
      //       isCaps: true,
      //     });
      //   } else {
      //     this.setState(prevState => ({
      //       isCaps: !!prevState.capsLock,
      //     }));
      // }
      default: {
        const receivedChar = char.text ? char.text : char;
        const addition = isCaps ? receivedChar.toUpperCase() : receivedChar;
        onInput(value ? value + addition : addition);
        if (value + addition === '') {
          this.setState({
            isCaps: true,
          });
        } else {
          this.setState((prevState) => ({
            isCaps: !!prevState.capsLock,
          }));
        }
      }
    }
  }

  render() {
    const {
      keyboardTitleStyle, title, size = 'xlarge', theme = 'dark',
    } = this.props;
    const {
      indices, isSpecial, isAccent, isCaps, capsLock,
    } = this.state;
    const keyboardContainerStyle = [keyboardThemeConfig[theme].keyboardContainer];
    return (
      <View style={[styles.container, keyboardContainerStyle]}>
        {title ? <Text style={[styles.title, keyboardTitleStyle]}>{title}</Text> : null}
        {indices
          && indices.map((index) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={index}
            >
              {keyboardData[index]
                && keyboardData[index].map((char, index) => {
                  let text = char.digit ? char : char.text;
                  if (!isSpecial && !isAccent && text === 'abc') text = '!#$';
                  if (isSpecial && !isAccent && text === '!#$') text = 'abc';
                  if (!isAccent && !isSpecial && text === 'abc') text = 'àáâ';
                  if (isAccent && !isSpecial && text === 'àáâ') text = 'abc';
                  return (
                    <KeyboardButton
                      image={char.image}
                      width={char.width}
                      text={text}
                      isCaps={char.isDomain ? false : isCaps}
                      capsLock={capsLock}
                      theme={theme}
                      onPress={() => this.onPress(text)}
                      // eslint-disable-next-line prettier/prettier
                      onLongPress={() => this.onLongPress(char.digit ? char.digit : text === 'shift' ? text : '')}
                      key={text.digit ? text.digit + index : text + index}
                      keyboardButtonContainerStyle={[
                        char.isDomain
                          ? keyboardSizeConfig[size].domainButtonStyle
                          : keyboardSizeConfig[size].keyboardButtonContainerStyle,
                      ]}
                      keyboardButtonStyle={[keyboardThemeConfig[theme].keyboardButtonStyle]}
                      keyboardButtonPressStyle={[
                        keyboardThemeConfig[theme].keyboardButtonPressStyle,
                      ]}
                      keyboardButtonTextStyle={[
                        char.isDomain
                          ? keyboardSizeConfig[size].domainTextStyle
                          : keyboardSizeConfig[size].keyboardButtonTextStyle,
                        keyboardThemeConfig[theme].keyboardButtonTextStyle,
                      ]}
                      keyboardButtonTextPressStyle={[
                        keyboardThemeConfig[theme].keyboardButtonTextPressStyle,
                      ]}
                      keyboardButtonDigitStyle={[
                        keyboardThemeConfig[theme].keyboardButtonDigitStyle,
                      ]}
                      keyboardButtonDigitLongPressStyle={[
                        keyboardThemeConfig[theme].keyboardButtonDigitLongPressStyle,
                      ]}
                    />
                  );
                })}
            </View>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    padding: 5,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: '#ffffff',
  },
});

export default Keyboard;
