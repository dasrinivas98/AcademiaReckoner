import React,{useState} from 'react';
import {View, Text, Button,TouchableOpacity,ScrollView} from 'react-native';
import palette from 'res/palette';
import colors from 'res/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input-counter';
import Modal from "react-native-modal";
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function addPostScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [subCount,setSubCount] = useState(0);
  const [textInput,setTextInput] = useState([]);
  const [marks,setMarks] = useState(0);
  const [sub,setSub] = useState("");
  //const [userInputs,setUserInputs] = useState([{"sub":"","marks":0,"credits":0}]);
  const [userInputs,setUserInputs] = useState([{"sub":"","marks":0,"credits":0}]);
  const [items, setItems] = useState([
    {label: 1, value: "1"},
    {label: 2, value: "2"},
    {label: 3, value: "3"},
    {label: 4, value: "4"},
    {label: 5, value: "5"},
    {label: 6, value: "6"},
    {label: 7, value: "7"},
    {label: 8, value: "8"},

  ]);
  updateState = (index,k,value) => {
    
    const dt = [{"sem":index+1,"sub":value,"marks":k}]
    console.log()
    // console.log(k);
    //const Textdata = userInputs; 
    // let  dt = {index:{k:value}}
    // console.log(dt);
    //onChangeText={(text) => {setData({...data,usn:text})}}//make a copy of array
    //setUserInputs([{...data,key:value}]);
    //Textdata[index] = {key:value};
    //setUserInputs({...userInputs,"sub":value,"marks":0});
    // setUserInputs(Textdata);
    console.log(dt);
 }
 const updateMarks = (index, value) => {
  userInputs[index] = {...userInputs[index], ['marks']: value};
  //setUserInputs({...userInputs[index],userInputs[index].marks: value});
  /*setState(prevObj => ({
    ...prevObj[index],
    value1: value,
  }));*/
  // console.log(userInputs[0]);
}

const updateSubject = (index, value) => {
  //state[index] = {...state[index], ['suub']: value};
  userInputs[index] = {...userInputs[index], ['sub']: value};
  //setUserInputs({...userInputs[index],['sub']: value});
  /*setState(prevObj => ({
    ...prevObj[index],
    value2: value,
  }));*/
  // console.log(userInputs[0]);
}
const updateCredits = (index, value) => {
  //state[index] = {...state[index], ['suub']: value};
  userInputs[index] = {...userInputs[index], ['credits']: value};
  //setUserInputs({...userInputs[index],['sub']: value});
  /*setState(prevObj => ({
    ...prevObj[index],
    value2: value,
  }));*/
  // console.log(userInputs[0]);
}
  const toggleModal = () => {
    let textInput1 = [];
    for(let i=0;i<subCount;i++){
      textInput1.push(<View style={{marginBottom: 5}}key={i}>
      <Text style={{color: 'white'}}>Subject {i+1}</Text>
        <TextInput
        mode='flat'
        style={{backgroundColor: 'black'}}
        activeOutlineColor='white'
        activeUnderlineColor = 'white'
        outlineColor = 'white'
        //underlineColor = 'white'
        onChangeText={val => updateSubject(i, val)}
        selectionColor = 'white'
        theme={{colors: { text: 'white',placeholder: "white" }}}
      />
      <Text style={{color: 'white',marginTop:10}}>Credits Assigned</Text>
      <NumericInput
        totalWidth={240} 
        totalHeight={50}
          onChange={value => updateCredits(i,value)} 
          rounded textColor='#59656F' iconStyle={{ color: '#59656F' }} rightButtonBackgroundColor='#292d3e' leftButtonBackgroundColor='#292d3e' minValue={1}
          maxValue={10}/>
      <Text style={{color: 'white',marginTop:10}}>Marks Obtained</Text>
        <TextInput
        mode='flat'
        keyboardType='numeric'
        style={{backgroundColor: 'black'}}
        activeOutlineColor='white'
        activeUnderlineColor = 'white'
        outlineColor = 'white'
        //underlineColor = 'white'
        onChangeText={val => updateMarks(i,val)}
        selectionColor = 'white'
        theme={{ colors: { text: 'white',placeholder: "white" } }}
      />
    </View>);
    }
    setTextInput(textInput1);
    setModalVisible(!isModalVisible);
  };
  const saveMarks = async () => {
    console.log(value);
    console.log(userInputs);
  try {
    const jsonValue = JSON.stringify(userInputs)
    await AsyncStorage.setItem(value, jsonValue)
  } catch(e) {
    console.log(e);
  }
  let va
      try {
        va = await AsyncStorage.getItem('5');
        let arrayData = JSON.parse(va);
        console.log(va);
      } catch(e) {
        console.log(e);
      }
      console.log("stored values are "+va);
      setModalVisible(!isModalVisible);
      console.log('Saved succesfully'); 
      let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
    console.log(keys)
  } catch(e) {
    console.log(e);
  }
  let valu
  try {
    valu = await AsyncStorage.multiGet(keys)
  } catch(e) {
    // read error
  }
  console.log(valu[0])
  // try {
  //   await AsyncStorage.clear()
  // } catch(e) {
  //   // clear error
  // }

  console.log('Done.')

}


  return (
    <View style={{flex: 1, backgroundColor: colors.bottomBackGround}}>
      <View style={{marginBottom: 10,marginStart: 10}}>
        <Text style={{color: 'white',marginBottom: 5}}>Semester</Text>
          <DropDownPicker
            placeholder="Select Semester"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            theme="DARK"
          />
      </View>    
      <View style={{marginBottom: 10,marginStart: 10}}>
        <Text style={{color: 'white',marginBottom: 5}}>Total No. of Subjects</Text>
        <NumericInput
        totalWidth={240} 
        totalHeight={50}
           onChange={value => setSubCount(value)} rounded textColor='#59656F' iconStyle={{ color: '#59656F' }} rightButtonBackgroundColor='#292d3e' leftButtonBackgroundColor='#292d3e' minValue={1}
          maxValue={10}/>
      </View>
      <View style={{marginBottom: 10,marginStart: 10}}>
          <TouchableOpacity style={{alignItems: 'center',height: 40,marginTop: 20, backgroundColor: '#0088f8', justifyContent: 'center',
            borderRadius: 5,}} onPress={toggleModal}>
            <Text style={{color: '#fff'}}>Next</Text>
            {/* <Icon style={Styles.loginText} name='chevron-right' type='font-awesome-5' color='#FFFFFF'/> */}
          </TouchableOpacity>
          <Modal isVisible={isModalVisible} style={{backgroundColor:'#121212',padding:10}} coverScreen={true}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{marginBottom: 5,justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:'white'}}>Add Marks</Text>
              </View>
              {/* <View style={{marginBottom: 5}}>
                <Text style={{color: 'white'}}>Subject Name</Text>
                  <TextInput
                  mode='flat'
                  style={{backgroundColor: 'black'}}
                  activeOutlineColor='white'
                  activeUnderlineColor = 'white'
                  outlineColor = 'white'
                  //underlineColor = 'white'
                  selectionColor = 'white'
                  theme={{ colors: { text: 'white',placeholder: "white" } }}
                />
                <Text style={{color: 'white',marginTop:10}}>Credits Assigned</Text>
                <NumericInput
                  totalWidth={240} 
                  totalHeight={50}
                    onChange={value => console.log(value)} rounded textColor='#59656F' iconStyle={{ color: '#59656F' }} rightButtonBackgroundColor='#292d3e' leftButtonBackgroundColor='#292d3e' minValue={1}
                    maxValue={10}/>
                <Text style={{color: 'white',marginTop:10}}>Marks Obtained</Text>
                  <TextInput
                  mode='flat'
                  keyboardType='numeric'
                  style={{backgroundColor: 'black'}}
                  activeOutlineColor='white'
                  activeUnderlineColor = 'white'
                  outlineColor = 'white'
                  //underlineColor = 'white'
                  selectionColor = 'white'
                  theme={{ colors: { text: 'white',placeholder: "white" } }}
                />
              </View> */}
              {textInput.map((value, index) => {
                  return value
              })}
            <TouchableOpacity style={{alignItems: 'center',height: 40,marginTop: 10, backgroundColor: '#0088f8', justifyContent: 'center',
                borderRadius: 5,}} onPress={saveMarks}>
                <Text style={{color: '#fff'}}>Save</Text>
                {/* <Icon style={Styles.loginText} name='chevron-right' type='font-awesome-5' color='#FFFFFF'/> */}
            </TouchableOpacity>
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
}
