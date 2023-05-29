import {StyleSheet, View} from 'react-native';
import React from 'react';
import Main from './src/Routes/Main';

const App = () => {
  return (
    <View style={{backgroundColor: 'red', flex: 1}}>
      <Main />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
