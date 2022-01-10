import React,{useEffect,useState} from 'react';
import {View, Text,TouchableOpacity,Dimensions,Alert,NativeModules,BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { TextInput } from 'react-native-paper';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Toast from 'react-native-simple-toast';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useIsFocused } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';

export default function UserBio({sem}) {
  const isFocused = useIsFocused();
  const [usernameError,setUserNameError] = useState(null);
  const [usnError,setUsnError] = useState(null);
  const [collegeError,setColegeError] = useState(null);
  const [uniError,setUniError] = useState(null)
  const [data, setData] = useState({
    name:'',
    usn:'',
    college:'',
    university:'',
 })
 const [disable, setDisable] = useState(true);
 let  enable = async() =>{
  //setDisable(!disable)
  if(!disable){
    console.log("New values are : "+ data.name + data.college + data.usn + data.university)
    if(!data.usn.trim() || !data.university.trim() || !data.name.trim() || !data.college.trim()){
      (!data.name.trim()) ? setUserNameError("Name connot be blank") :  setUserNameError(null);
      (!data.usn.trim()) ? setUsnError("USN connot be blank") :  setUsnError(null);
      (!data.university.trim()) ? setUniError("University connot be blank") :  setUniError(null);
      (!data.college.trim()) ? setColegeError("College connot be blank") :  setColegeError(null);
      return
    }else{
      setUserNameError(null);
      setUsnError(null);
      setUniError(null);
      setColegeError(null);
      const name = ["name", data.name]
      const usn = ["usn", data.usn]
      const college = ["college", data.college]
      const university = ["university", data.university]
      try {
        await AsyncStorage.multiSet([name, usn,college,university])
        console.log("Updated")
        setDisable(!disable)
        Toast.show('Details updated sucessfully');
      } catch(e) {
        console.log("unable to save"+e)
        Toast.show('Failed to update details');
        setDisable(!disable)
      }
    }}else{
      setDisable(!disable)
    }
  
    //setDisable(!disable)
    // const newdData = {
    //   name: data.name,
    //   usn: data.usn,
    //   college: data.college,
    //   university:data.university
    // };
    // if(disable){
    //   console.log(data)
    //   const nme = {
    //     name: data.name,
    //   }      
    //   const name = ["name", JSON.stringify(data.name)]
    //   const usn = ["usn", JSON.stringify(data.usn)]
    //   const college = ["college", JSON.stringify(data.college)]
    //   const university = ["university", JSON.stringify(data.university)]
    //   try {
    //     await AsyncStorage.multiSet([name, usn,college,university])
    //     console.log("Updated")
    //     setDisable(!disable)
    //   } catch(e) {
    //     console.log("unable to save"+e)
    //   }
    // }else{
    //   setDisable(!disable)
    // }
   
 }
  const getData = async () => {
    //let value
    try {
      nm = await AsyncStorage.getItem('name');
      us = await AsyncStorage.getItem('usn');
      col = await AsyncStorage.getItem('college');
      uni = await AsyncStorage.getItem('university');
    } catch(e) {
      // read error
    }
    //console.log(" crct stored values are 55 "+value);
    setData({
      ...data,
          name : nm,
          usn : us,
          college : col,
          university : uni
        });
   
  }
  
  //console.log(data);
  const clearData = async() => {
    
    try {
        await AsyncStorage.clear();
      } catch(e) {
        console.log(e);
      }
      BackHandler.exitApp();
      
      
  }
  useEffect(() => {
   getData();
    
  }, [isFocused]);
  return (
    <View
      style={{
        marginStart: 10,
        marginEnd:10,
        marginTop: 20,
      }}>
      {/* <View style={{marginBottom: 5}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Name : {data.name}</Text>
      </View>
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>USN : {data.usn}</Text>
      </View>
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>College : {data.college}</Text>
      </View>
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>university : {data.university}</Text>
      </View> */}
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white'}}>Name</Text>
        <TextInput
        // label="Name"
        value={data.name}
        onChangeText={(text) => {setData({...data,name:text})}}
        mode='flat'
        disabled={disable}
        style={{backgroundColor: 'black'}}
        activeOutlineColor='white'
        activeUnderlineColor = 'white'
        outlineColor = 'white'
        //underlineColor = 'white'
        selectionColor = 'white'
        theme={{ colors: { text: 'white',placeholder: "white" } }}

       // onChangeText={text => setText(text)}
      />
      {!!usernameError && (
            <Text style={{color: 'red'}}>
              {usernameError}
            </Text>
          )}
      </View>
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white'}}>USN</Text>
        <TextInput
       // label="USN"
        value={data.usn}
        onChangeText={(text) => {setData({...data,usn:text})}}
        mode='flat'
        disabled={disable}
        style={{backgroundColor: 'black'}}
        activeOutlineColor='white'
        activeUnderlineColor = 'white'
        outlineColor = 'white'
        //underlineColor = 'white'
        selectionColor = 'white'
        theme={{ colors: { text: 'white',placeholder: "white" } }}
       // onChangeText={text => setText(text)}
      />
       {!!usnError && (
            <Text style={{color: 'red'}}>
              {usnError}
            </Text>
          )}
      </View>
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white'}}>College</Text>
        <TextInput
        //label="College"
        value={data.college}
        onChangeText={(text) => {setData({...data,college:text})}}
        mode='flat'
        disabled={disable}
        style={{backgroundColor: 'black'}}
        activeOutlineColor='white'
        activeUnderlineColor = 'white'
        outlineColor = 'white'
        //underlineColor = 'white'
        selectionColor = 'white'
        theme={{ colors: { text: 'white',placeholder: "white" } }}
       // onChangeText={text => setText(text)}
      />
      {!!collegeError && (
            <Text style={{color: 'red'}}>
              {collegeError}
            </Text>
          )}
      </View>
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white'}}>University</Text>
        <TextInput
        //label="University"
        value={data.university}
        onChangeText={(text) => {setData({...data,university:text})}}
        mode='flat'
        disabled={disable}
        style={{backgroundColor: 'black'}}
        activeOutlineColor='white'
        activeUnderlineColor = 'white'
        outlineColor = 'white'
        //underlineColor = 'white'
        selectionColor = 'white'
        theme={{ colors: { text: 'white',placeholder: "white" } }}
       // onChangeText={text => setText(text)}
      />
       {!!uniError && (
            <Text style={{color: 'red'}}>
              {uniError}
            </Text>
          )}
      </View>
      <TouchableOpacity
      onPress={enable}>
      <View style={{marginTop: 10}}>
        <View
          style={{
            flex: 1,
            height: 30,
            borderRadius: 5,
            marginStart: 10,
            marginEnd: 10,
            backgroundColor: disable ? '#808080' : "#0088f8",
            justifyContent: 'center',
            borderColor: '#262626',
            borderWidth: 1,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{disable ? "Edit Profile" : "Save"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={clearData}>
      <View style={{marginTop: 10}}>
        <View
          style={{
            flex: 1,
            height: 30,
            borderRadius: 5,
            marginStart: 10,
            marginEnd: 10,
            backgroundColor:"#0088f8",
            justifyContent: 'center',
            borderColor: '#262626',
            borderWidth: 1,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Clear all the data and signout</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
      {/* <Card>
        <CardTitle title="Name"/>
        <CardContent text={data.name} />
      </Card> */}
    </View>
  );
}
