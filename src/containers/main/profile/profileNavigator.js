import React,{useEffect,useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import profileScreen from './profileScreen';
import {Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from 'res/colors';
import images from 'res/images';

export default function profileNavigator() {
  const [name, setName] = useState(null);
  const Stack = createStackNavigator();
  const getData = async () => {
    let value
    try {
      value = await AsyncStorage.getItem('name')
    } catch(e) {
      // read error
    }
    console.log(" crct stored values are 3 "+value);
  }
  useEffect(() => {
   getData();
    
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={profileScreen}
        options={{
          headerTitle: (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color:'grey',fontWeight:'bold',fontFamily:'sans-serif-thin',letterSpacing:5}}>PROFILE</Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: {alignSelf: 'center'},
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: colors.seperatorLineColor,
          },
          // headerRight: () => (
          //   <TouchableOpacity>
          //     <View
          //       style={{
          //         flex: 1,
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         marginRight: 10,
          //       }}>
          //       <Image
          //         source={images.list3}
          //         style={{resizeMode: 'contain', width: 25, height: 25}}
          //       />
          //     </View>
          //   </TouchableOpacity>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity> 
          //     <View
          //       style={{
          //         flex: 1,
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         marginStart: 10,
          //       }}>
          //       <Image
          //         source={images.addIcon}
          //         style={{resizeMode: 'contain', width: 20, height: 20}}
          //       />
          //     </View>
          //   </TouchableOpacity>
          // ),
        }}
      />
    </Stack.Navigator>
  );
}
