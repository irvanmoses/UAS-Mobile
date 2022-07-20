import {View, Text, Button, StyleSheet, Image, TextInput} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/database';

const AppX = () => {
  const [imagePath, setImagePath] = useState(null);
  const [caption, setCaption] = useState('');

  function openGallery() {
    ImagePicker.openPicker({
      width: 480,
      height: 640,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImagePath(image.path);
    });
  }

  function uploadImage() {
    console.log('Upload Gambar...');
    storage()
      .ref('images/' + imagePath.split('/').pop())
      .putFile(imagePath)
      .then(() => {
        console.log('Berhasil Upload Data Ke Storage!');
        storage()
          .ref('images/' + imagePath.split('/').pop())
          .getDownloadURL()
          .then(url => {
            console.log('URL Gambar :', url);
            firebase
              .app()
              .database(
                'https://quiz-app-35d7f-default-rtdb.asia-southeast1.firebasedatabase.app/',
              )
              .ref('/images/')
              .set({
                url: url,
                caption: caption,
              })
              .then(() => {
                console.log('Berhasil Upload Data Ke Database!');
              });
          });
      });
  }

  return (
    <View>
      <Text style={{textAlign: 'center', padding: 16}}>
        Upload Gambar ke Firebase
      </Text>
      <Image style={styles.previewImage} source={{uri: imagePath}} />
      <TextInput
        style={styles.captionInput}
        value={caption}
        onChangeText={e => setCaption(e)}
        placeholder="Masukkan caption"
      />
      <Button title="Ambil Gambar" onPress={() => openGallery()} />
      <Button title="Upload Gambar" onPress={() => uploadImage()} />
    </View>
  );
};

export default AppX;

const styles = StyleSheet.create({
  previewImage: {
    width: 480,
    height: 480,
    marginBottom: 16,
  },
  captionInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 8,
  },
});
