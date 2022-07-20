import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

const Preview = ({navigation, route}) => {
  const {data} = route.params;

  async function removeCurentData(data) {
    await database()
      .ref('images/' + data)
      .remove()
      .then(() => {
        console.log('Data Berhasil Dihapus!');
      });

    await navigation.navigate('A');
  }

  return (
    <>
      <View style={styles.container}>
        <Image source={{uri: data.url}} style={styles.image} />
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginTop: 10,
            fontStyle: 'italic',
          }}>
          {data.caption}
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={() => removeCurentData(data.timestamp)}>
            <Icon name="delete" size={22} color="red">
              <Text>Delete</Text>
            </Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              onPress={() => Linking.openURL(data.url)}
              name="link"
              size={22}
              color="blue">
              <Text>Link</Text>
            </Icon>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Preview;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  container: {
    padding: 4,
  },
});
