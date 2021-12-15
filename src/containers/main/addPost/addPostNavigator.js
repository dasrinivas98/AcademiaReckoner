import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import addPostScreen from './addPostScreen';
import colors from 'res/colors';
import {View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';


export default function addPostNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Post"
        component={addPostScreen}
        options={{
          headerTitle: (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color:'grey',fontWeight:'bold',fontFamily:'sans-serif-thin',letterSpacing:5}}>Add Marks</Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: {alignSelf: 'center'},
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: colors.seperatorLineColor,
          },
        }}
      />
    </Stack.Navigator>
  );
}
