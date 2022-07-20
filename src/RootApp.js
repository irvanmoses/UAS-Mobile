import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Page
import Album from './screens/Album';
import Preview from './screens/Preview';
import Unggah from './screens/Unggah';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const UnggahStack = createNativeStackNavigator();

function HomeRoot() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="A"
        component={Album}
        options={{title: 'Your Album'}}
      />
      <HomeStack.Screen
        name="Preview"
        component={Preview}
        options={{title: 'Pratinjau'}}
      />
    </HomeStack.Navigator>
  );
}

function UnggahRoot() {
  return (
    <UnggahStack.Navigator>
      <UnggahStack.Screen
        name="A"
        component={Unggah}
        options={{title: 'Unggah Gambar Anda'}}
      />
    </UnggahStack.Navigator>
  );
}

const RootApp = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Unggah') {
              iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF5F00',
          tabBarInactiveTintColor: '#a1aab8',
          tabBarStyle: {
            backgroundColor: '#fff',
            padding: 10,
            height: 70,
          },
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 13,
          },
        })}>
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeRoot}
        />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Unggah"
          component={UnggahRoot}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootApp;
