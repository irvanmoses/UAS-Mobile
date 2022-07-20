import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';

const Album = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    database()
      .ref('/images/')
      .on('value', snapshot => {
        const data = [];
        // console.log(snapshot.val());
        snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          data.push(childData);
        });
        setData(data);
      });
  }, []);

  function selectImages(index) {
    navigation.navigate('Preview', {
      data: data[index],
    });
  }

  return (
    <View style={styles.container}>
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => selectImages(index)}>
              <View style={styles.box}>
                <Image source={{uri: item.url}} style={styles.image} />
                <Text>{item.caption}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text>Album Kosong</Text>
          <View style={styles.separator}></View>
          <Button
            title="Upload Gambar"
            onPress={() => navigation.navigate('Unggah')}
          />
        </View>
      )}
    </View>
  );
};

export default Album;

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 180,
    marginBottom: 10,
  },
  box: {
    marginHorizontal: 4,
    marginVertical: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 10,
  },
  separator: {
    marginVertical: 4,
  },
});
