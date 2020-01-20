/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Keyboard from 'react-native-custom-keyboard-mroads';
import ButtonWrapper from 'react-native-button-wrapper';

class App extends React.Component {
  state = {
    textContent: '',
    keyboardSize: 'xlarge',
    theme: 'dark',
    index: 4,
  };

  sizeConfig = [
    {name: 'XS', onPress: () => this.onSizePressed('xsmall', 0)}, 
    {name: 'S', onPress: () => this.onSizePressed('small', 1)}, 
    {name: 'M', onPress: () => this.onSizePressed('medium', 2)},
    {name: 'L', onPress: () => this.onSizePressed('large', 3)},
    {name: 'XL', onPress: () => this.onSizePressed('xlarge', 4)},
    {name: 'XXL', onPress: () => this.onSizePressed('xxl', 5)}
  ];

  themeConfig = [
    {name: 'LIGHT', color: '#FFFFFF', textColor: '#000000', onPress: () => this.onThemePressed('light'),}, 
    {name: 'DARK', color: '#4A4A4A', textColor: '#FFFFFF', onPress: () => this.onThemePressed('dark'),}
  ];

  changeTextHandler = value => {
    this.setState({ textContent: value });
  }

  onSizePressed = (config, index) => {
    this.setState({ 
      keyboardSize: config,
      selected: index, 
    });
  }

  onThemePressed = theme => {
    this.setState({ theme });
  }

  render() {
    const { textContent, keyboardSize, theme } = this.state;
    const buttonsList = this.sizeConfig.map(btn => 
      <ButtonWrapper key = {btn.name} onPress={btn.onPress} style={styles.sizesButton}>
        <Text style={styles.sizesText}>{btn.name}</Text>
      </ButtonWrapper>
    ); 
    const themeList = this.themeConfig.map(btn => 
      <ButtonWrapper key = {btn.name} onPress={btn.onPress} style={{...styles.themeButton, backgroundColor: btn.color }}>
        <Text style={{...styles.themeText, color: btn.textColor}}>{btn.name}</Text>
      </ButtonWrapper>
    ); 
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.mainView}>
            <View style={styles.configContainer}>
              <View style={styles.themeContainer}>
                <Text style={styles.availableText}>AVAILABLE THEME</Text>
                <View style={styles.themeListContainer}>{themeList}</View>
              </View>
              <View style={styles.sizeContainer}>
                <Text style={styles.availableSizeText}>AVAILABLE SIZES </Text>
                <View style={styles.sizeListContainer}>{buttonsList}</View>
              </View>
            </View>
            <View style={styles.keyboardWrapper}>
              <View style={styles.enteredTextContainer}>
                <Text style={styles.enteredText}>{textContent}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', width: 'auto', height: '65%' }}>
                <Keyboard
                  isTextFieldRequired={false}
                  onInput={this.changeTextHandler}
                  inputType="email"
                  maxLength={6}
                  size={keyboardSize}
                  theme={theme}
                  value={this.state.textContent}
                />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  sizesButton: { borderRadius: 5, alignItems: 'center', justifyContent: 'center', width: '15%', backgroundColor: '#33AFFF', height: 50 },
  themeButton: { borderRadius: 5, alignItems: 'center', justifyContent: 'center', width: '40%', height: 50 },
  sizesText: { fontSize: 17, width: '100%', textAlign: 'center'},
  themeText: { fontSize: 17, width: '100%', textAlign: 'center'},
  mainView: {height: '100%', justifyContent: 'space-between', alignItems: 'center', padding: 7 },
  configContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', height: '20%' },
  themeContainer: { height: 120, width: '35%', backgroundColor: '#CCCCCC', padding: 5, justifyContent: 'space-around'  },
  availableText: { fontSize: 20, width: '100%', textAlign: 'center'},
  themeListContainer: { paddingHorizontal: 10, justifyContent: 'space-around', flexDirection: 'row', width: '100%', alignItems: 'center' },
  sizeContainer: { height: 120, width: '60%', backgroundColor: '#CCCCCC', padding: 5, justifyContent: 'space-around' },
  availableSizeText: { fontSize: 20, width: '100%', textAlign: 'center'},
  sizeListContainer: { paddingHorizontal: 10, justifyContent: 'space-around', flexDirection: 'row', width: '100%', alignItems: 'center' },
  keyboardWrapper: { width: '100%', height: '15%' },
  enteredTextContainer: { width: '100%', height: 60, backgroundColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center'},
  enteredText: { width: '100%', textAlign: 'center', fontSize: 25},
});

export default App;
