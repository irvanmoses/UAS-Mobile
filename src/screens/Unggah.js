import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/database';

const Unggah = ({navigation}) => {
  const [imagePath, setImagePath] = useState(null);
  const [caption, setCaption] = useState('');

  function openGallery() {
    ImagePicker.openPicker({
      width: 480,
      height: 640,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImagePath(image.path);
      })
      // Handle error when user cancelled the picker
      .catch(error => {
        if (error === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  }

  async function uploadImage() {
    const filename = Date.now();

    await storage()
      .ref('/' + imagePath.split('/').pop())
      .putFile(imagePath)
      .then(() => {
        console.log('Berhasil Upload Data Ke Storage!');
      });

    await storage()
      .ref('/' + imagePath.split('/').pop())
      .getDownloadURL()
      .then(async url => {
        console.log('URL Gambar :', url);
        await firebase
          .app()
          .database(
            'https://quiz-app-35d7f-default-rtdb.asia-southeast1.firebasedatabase.app/',
          )
          .ref('/images/' + filename)
          .set({
            timestamp: filename,
            url: url,
            caption: caption,
          })
          .then(() => {
            console.log('Berhasil Upload Data Ke RTDB!');
          })
          .then(() => {
            Alert.alert('Berhasil Unggah Gambar!');
          });

        setImagePath(null);
        setCaption('');

        await navigation.goBack();
      });
  }

  function backToHome() {
    navigation.navigate('Home');
    setImagePath(null);
    setCaption('');
  }

  return (
    <>
      <View style={styles.container}>
        {imagePath ? (
          <>
            <View style={styles.imageContainer}>
              <Text style={{textAlign: 'center', marginVertical: 20}}>
                Foto yang akan diunggah
              </Text>
              <Image source={{uri: imagePath}} style={styles.previewImage} />
              <TextInput
                style={styles.captionInput}
                value={caption}
                onChangeText={e => setCaption(e)}
                placeholder="Masukkan caption"
              />
              <Button title="Upload Gambar" onPress={() => uploadImage()} />
              <View style={styles.separator}></View>
              <Button title="Batal" onPress={() => backToHome()} />
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => openGallery()}
              style={styles.uploadBtn}>
              <AntDesign name="plus" size={50} color="black" />
            </TouchableOpacity>
            <Text style={{marginTop: 10}}>Klik tombol untuk upload gambar</Text>
          </>
        )}
      </View>
    </>
  );
};

export default Unggah;

const styles = StyleSheet.create({
  uploadBtn: {
    borderWidth: 2,
    borderColor: '#222',
    borderStyle: 'dotted',
    padding: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: 320,
    height: 240,
    marginBottom: 16,
  },
  captionInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 8,
  },
  separator: {
    marginVertical: 4,
  },
});
