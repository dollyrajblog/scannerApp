import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

const TextRead = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  useEffect(() => {
    console.log('===>');
    launchImageLibrary({}, setImage);
  }, []);
  useEffect(() => {
    (async () => {
      if (image) {
        console.log('==>', image.assets[0].uri);
        const result = await TextRecognition.recognize(image.assets[0].uri);
        setText(result);
      }
      else{
        console.log("please select any picture")
      }
    })();
  }, [image]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>Image read</Text>
        <Text>{text}</Text>
      </View>
    </SafeAreaView>
  );
};
export default TextRead;
