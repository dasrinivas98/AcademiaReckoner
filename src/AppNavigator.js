import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState,useEffect} from 'react';
import {
  View,
  Text,
 
  TextInput,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView
} from 'react-native';
import palette from 'res/palette';
import TabNavigator from './containers/main/TabNavigator';
import MainNavigator from './containers/main/MainNavigator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from 'res/images';
import colors from './res/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
StatusBar.setBarStyle('light-content');

export default function AppNavigator() {
  const [validate, setValidate] = React.useState(false); 
  // const [username,setUserName] = useState('');
  // const [password,setPassword] = useState('');
  function LoginScreen() {
    const _signInAsync = async () => {
      setValidate(true);
      console.log(this.usn)
      console.log(this.username)
      console.log(this.college)
      console.log(this.university)
      const name = ["name", this.username]
      const usn = ["usn", this.usn]
      const college = ["college", this.college]
      const university = ["university", this.university]
      console.log(this.usn)
      try {
        await AsyncStorage.multiSet([name, usn,college,university])
      } catch(e) {
        console.log("unable to save"+e)
      }
      let values
      try {
        values = await AsyncStorage.multiGet(['name', 'usn', 'college', 'university'])
      } catch(e) {
        // read error
      }
      console.log("stored values are "+values);
      const keys = ['name', 'usn', 'college', 'university']
      // try {
      //   await AsyncStorage.multiRemove(keys)
      // } catch(e) {
      //   // remove error
      // }

      // console.log('removed')
    };
    return (
      <ScrollView>
        <View style={Styles.container}>
          <View style={Styles.logoContainer}>
            <Image source={images.logo} style={{height: 70, width: 200}} />
          </View>
          <Text style={{color:'#000000',fontSize:50,fontFamily:'sans-serif-thin',marginStart: 20,marginEnd: 20,marginTop: 30}}>Welcome</Text>
          <Text style={{color:'#000000',fontSize:20,fontFamily:'sans-serif-light',marginStart: 20,marginEnd: 40}}>First things first, please provide us the following details.</Text>
          <View style={Styles.passwordContainer}>
            <TextInput
              style={Styles.userNameInput}
              placeholder="Name"
              placeholderTextColor={colors.textFaded2}
              onChangeText={(text) => this.username = text}
            />
          </View>
          <View style={Styles.passwordContainer}>
            <TextInput
              style={Styles.userNameInput}
              placeholder="USN"
              placeholderTextColor={colors.textFaded2}
              onChangeText={(text) => this.usn = text}
            />
          </View>
          <View style={Styles.passwordContainer}>
            <TextInput
              style={Styles.userNameInput}
              placeholder="College"
              placeholderTextColor={colors.textFaded2}
              onChangeText={(text) => this.college = text}
            />
          </View>
          <View style={Styles.passwordContainer}>
            <TextInput
              style={Styles.userNameInput}
              placeholder="University"
              placeholderTextColor={colors.textFaded2}
              onChangeText={(text) => this.university = text}
            />
          </View>
          
          {/* <View style={Styles.forgotPasswordContainer}>
            <TouchableOpacity>
              <Text style={Styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity style={Styles.loginContainer} onPress={_signInAsync}>
            <Text style={Styles.loginText}>Let's Get Started</Text>
            {/* <Icon style={Styles.loginText} name='chevron-right' type='font-awesome-5' color='#FFFFFF'/> */}
          </TouchableOpacity>
          {/* <View
            style={{
              //flex: 0.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#262626'}}></View>
            <Text style={{marginLeft: 40, marginRight: 40, color: '#969696'}}>
              OR
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: '#262626',
              }}></View>
          </View>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={images.facebookLogo} style={{width: 20, height: 20}} />
            <TouchableOpacity style={{alignItems: 'center', marginStart: 10}}>
              <Text style={{color: '#008bef'}}>Log In With Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 50}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#262626',
                height: 1,
              }}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#969696'}}>Don't have an account ?</Text>
            <TouchableOpacity>
              <Text style={{color: '#008bef'}}> Sign Up.</Text>
            </TouchableOpacity>
          </View> */}
          
        </View>
        </ScrollView>  
      
    );
  }
  const Stack = createStackNavigator();
  return validate ? (
    <MainNavigator />
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 120,
  },
  userNameContainer: {
    borderColor: '#262626',
    backgroundColor: '#FFFFFF',
    // borderWidth: 1,
    // borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 20,
    
  },
  userNameInput: {
    marginStart: 10,
    color: 'black',
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  passwordContainer: {
    borderColor: '#262626',
    // borderWidth: 1,
    // borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    
  },
  passwordInput: {marginStart: 10,
     color: 'black',
     borderBottomColor: '#000',
     borderBottomWidth: 1},
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginEnd: 20,
  },
  forgotPasswordText: {
    color: '#0088f8',
  },
  loginContainer: {
    alignItems: 'center',
    height: 60,
    marginTop: 30,
    backgroundColor: '#0088f8',
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
    
  },
  loginText: {
    color: '#fff',
  },
});
