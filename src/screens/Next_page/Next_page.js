import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DocumentPickerOptions from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';

const Next_page = ({route}) => {
  const [image_name, setImage_Name] = useState('');
  const [image_base, setImage_base] = useState('');
  const [check, setCheck] = useState(null);
  const [note, setNote] = useState('');
  const [indicator, setIndicator] = useState(false);

  const Select_file = async () => {
    const res = await DocumentPickerOptions.pick({
      type: [
        DocumentPickerOptions.types.pdf,
        DocumentPickerOptions.types.images,
      ],
    });
    setImage_Name(res[0].name);
    var data = await RNFS.readFile(res[0].uri, 'base64').then(res => {
      return res;
    });
    setImage_base(data);
    console.log(data, '==data');
  };

  // ==== API Call ====
  const onAPiCall = async () => {
    setIndicator(true);
    console.log('===>api');
    try {
      await axios({
        method: 'POST',
        url: 'https://test-backend-demo.onrender.com/api/users',
        data: {
          assetId: route?.params?.name,
          image: image_base,
          physicalDamage: true,
          note: note,
        },
        headers: {'content-type': 'application/json'},
      })
        .then(res => {
          console.log('sucessfully', res);
          if (res?.status === 200) {
            console.log('sucessfully', res.data);
            setIndicator(false);
            Alert.alert('upload successfully');
          }
        })
        .catch(err => {
          console.log('error', err);
        });
    } catch {
      err => {
        console.log('error occurs', err);
      };
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 20}}>
        {indicator ? (
          <ActivityIndicator
            size={36}
            style={{alignSelf: 'center'}}
            color="#0000ff"
          />
        ) : null}

        <Text style={[styles.fsize, {marginBottom: 10}]}>
          Asset no:
          <Text style={{fontWeight: 'bold'}}> {route?.params?.name}</Text>
        </Text>
        <View
          style={[
            styles.txtInput,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              height: 45,
              alignItems: 'center',
            },
          ]}>
          <TextInput
            placeholder="please upload image..."
            placeholderTextColor={'#000'}
            style={styles.fsize}
            value={image_name}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => Select_file()}
            style={{backgroundColor: 'green', padding: 8, borderRadius: 5}}>
            <Text style={{fontSize: 12, color: '#fff'}}>Upload</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.fsize}>Physical Demage:</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <BouncyCheckbox
            disableBuiltInState
            size={20}
            text="yes"
            isChecked={check === 'true'}
            style={{width: 100}}
            textStyle={{
              textDecorationLine: 'none',
            }}
            onPress={() => {
              setCheck('true');
            }}
          />
          <BouncyCheckbox
            disableBuiltInState
            size={20}
            text="no"
            isChecked={check === 'false'}
            textStyle={{
              textDecorationLine: 'none',
            }}
            onPress={() => {
              setCheck('false');
            }}
          />
        </View>
        <Text style={styles.fsize}>Note:</Text>
        <View style={[styles.txtInput, {minHeight: 100}]}>
          <TextInput
            placeholder="enter here..."
            multiline={true}
            placeholderTextColor="#000"
            style={styles.fsize}
            onChangeText={txt => setNote(txt)}
          />
        </View>

        <TouchableOpacity
          onPress={() => onAPiCall()}
          style={{
            backgroundColor: 'red',
            padding: 8,
            alignSelf: 'center',
            borderRadius: 5,
            marginVertical: 20,
          }}>
          <Text style={{color: '#fff', fontWeight: '800'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Next_page;
const styles = StyleSheet.create({
  txtInput: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  fsize: {color: '#000', fontSize: 14},
});
