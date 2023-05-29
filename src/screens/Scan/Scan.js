import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import TextRecognition from 'react-native-text-recognition';
const Scan = ({navigation}) => {
  const [flash, setFlash] = useState(false);
  const onSuccess = e => {
    console.log('An error occured', e);
    navigation.navigate('Next_page', {name: e.data});
    row_data(e.data);
  };
  const row_data = async data => {
    const result = await TextRecognition.recognize(data);
    console.log('==>', result, data);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <QRCodeScanner
        customMarker={
          <Image
            style={{tintColor: '#fff', height: 210, width: 210}}
            source={require('../../assets/images/scan.png')}
          />
        }
        showMarker={true}
        onRead={e => onSuccess(e)}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        reactivate={true}
        topContent={
          <Text style={styles.centerText}>scan your QR or Bar code.</Text>
        }
      />
      <TouchableOpacity onPress={() => setFlash(!flash)}>
        <Image
          source={
            flash
              ? require('../../assets/images/flash.png')
              : require('../../assets/images/turnoff.png')
          }
          style={{
            height: 30,
            width: 30,
            margin: 20,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Scan;
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
});
