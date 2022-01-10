import React,{useState} from 'react';
import {View, Text, Button,TouchableOpacity,ScrollView,Alert} from 'react-native';
import palette from 'res/palette';
import colors from 'res/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input-counter';
import Modal from "react-native-modal";
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { NavigationContainer } from '@react-navigation/native';
import { mark } from 'regenerator-runtime';
export default function addPostScreen({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [subCount,setSubCount] = useState(0);
  const [textInput,setTextInput] = useState([]);
  const [marks,setMarks] = useState(0);
  const [sub,setSub] = useState("");
  const [subErr,setSubErr] = useState(null);
  const [creditsErr,setCreditsErr] = useState(null);
  const [marksErr,setMarksErr]= useState(null);
  const [semErr,setSemError] = useState(null);
  const [subCountErr,setSubCountErr] = useState(null);
  //const [userInputs,setUserInputs] = useState([{"sub":"","marks":0,"credits":0}]);
  const [userInputs,setUserInputs] = useState([{"sub":'',"marks":0,"credits":0}]);
  const [userInputErr,setUserInputErr] = useState([{"sub":null,"marks":null,"credits":null}]);
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
//   updateState = (index,k,value) => {
    
//     const dt = [{"sem":index+1,"sub":value,"marks":k}]
//     console.log()
//     // console.log(k);
//     //const Textdata = userInputs; 
//     // let  dt = {index:{k:value}}
//     // console.log(dt);
//     //onChangeText={(text) => {setData({...data,usn:text})}}//make a copy of array
//     //setUserInputs([{...data,key:value}]);
//     //Textdata[index] = {key:value};
//     //setUserInputs({...userInputs,"sub":value,"marks":0});
//     // setUserInputs(Textdata);
//     console.log(dt);
//  }
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
    console.log("semester and sub count in addpost: "+subCount,value)
    if(subCount == 0 || value == 0){
      (subCount == 0) ? setSubCountErr("Select total number of subjects") :  setSubCountErr(null);
      (value == 0) ? setSemError("Select Sem") :  setSemError(null);
    }else{
      setSemError(null);
      setSubCountErr(null);
      for(let i=0;i<subCount;i++){
        userInputs[i] = {...userInputs[i], ['sub']: '',['marks']:0,['credits']:0}
        userInputErr[i] = {...userInputs[i], ['sub']: null,['marks']:null,['credits']:null}
        console.log("index:"+i)
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
        {
        console.log(userInputErr[i].sub),
        !!userInputErr[i].sub && (
            <Text style={{color: 'red'}}>
              {userInputErr[i].sub}
            </Text>
          )}
        <Text style={{color: 'white',marginTop:10}}>Credits Assigned</Text>
        <NumericInput
          totalWidth={240} 
          totalHeight={50}
            onChange={value => updateCredits(i,value)} 
            rounded textColor='#59656F' iconStyle={{ color: '#59656F' }} rightButtonBackgroundColor='#292d3e' leftButtonBackgroundColor='#292d3e' minValue={1}
            maxValue={10}/>
            {!!userInputErr[i].credits && (
            <Text style={{color: 'red'}}>
              {userInputErr[i].credits}
            </Text>
          )}
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
        {!userInputErr[i].marks && (
            <Text style={{color: 'red'}}>
              {userInputErr[i].marks}
            </Text>
          )}
      </View>);
      }
      setTextInput(textInput1);
      setModalVisible(!isModalVisible);
    }
  };
  const getGradePoint = (marks) =>{
    if(marks>=0 && marks<50){
      return 0;
    }else if(marks>=50 && marks<55){
      return 4;
    }else if(marks>=55 && marks<60){
      return 6;
    }else if(marks>=60 && marks<70){
      return 7;
    }else if(marks>=70 && marks<80){
      return 8;
    }else if(marks>=80 && marks<90){
      return 9;
    }else{
      return 10;
    }

  }
  const saveMarks = async () => {
    //console.log(value);
 var err = false
    console.log("marks input in  add post :"+userInputs);
    userInputs.map((st,index) => {
      console.log(st.sub,index);
      (st.sub.trim() == "") ? (err = true) : (err == false ? false : true);
      (!st.credits) ? err = true : (err == false ? false : true);
      (!st.marks) ? err = true : (err == false ? false : true);
    });
    if(err){
      Alert.alert(
        "Add marks",
        "Please enter all the details",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: false,
        }
      );
    }else{
      try {
        const jsonValue = JSON.stringify(userInputs)
        await AsyncStorage.setItem(value, jsonValue)
        Toast.show("Saved successfully");
        navigation.navigate('Home');
      } catch(e) {
        console.log(e);
        Toast.show("Failed to save");
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
      let valu = []
      try {
        valu = await AsyncStorage.multiGet(keys);
      } catch(e) {
        // read error
      }
      console.log((valu))
      let vf = []
      vf = valu[0].map(req => JSON.parse(req));
      let sum = 0;
      //console.log(vf[1][0].marks);
      // sum = vf[1].map(mrks => sum+parseInt(mrks.marks));
      // console.log("Total marks is :"+sum);
      const totalMarks = vf[1].reduce((prev,next) => prev + parseInt(next.marks),0);
      const totalCredits = vf[1].reduce((prev,next) => prev + parseInt(next.credits),0);
      const totalCP = vf[1].reduce((prev,next) => prev + getGradePoint(parseInt(next.marks))*parseInt(next.credits),0);
      console.log("Total marks in addpost screen is :"+totalMarks);
      console.log("Total credits in addpost screen is :"+totalCredits);
      console.log("Total CP in addpost screen is :"+totalCP);
      console.log("CGPA in addpost screen is :"+(totalCP/totalCredits).toFixed(2));
      //console.log("CGPA in addpost screen is :"+(((totalMarks/vf[1].length)+0.75)/10.0));
      // try {
      //   await AsyncStorage.clear()
      // } catch(e) {
      //   console.log(e);
      // }
    
      console.log('Done.')

    }
    
  // try {
  //   const jsonValue = JSON.stringify(userInputs)
  //   await AsyncStorage.setItem(value, jsonValue)
  //   Toast.show("Saved successfully");
  //   navigation.navigate('Home');
  // } catch(e) {
  //   console.log(e);
  //   Toast.show("Failed to save");
  // }
  
  // let va
  //     try {
  //       va = await AsyncStorage.getItem('5');
  //       let arrayData = JSON.parse(va);
  //       console.log(va);
  //     } catch(e) {
  //       console.log(e);
  //     }
  //     console.log("stored values are "+va);
  //     setModalVisible(!isModalVisible);
  //     console.log('Saved succesfully'); 
  //     let keys = []
  // try {
  //   keys = await AsyncStorage.getAllKeys();
  //   console.log(keys)
  // } catch(e) {
  //   console.log(e);
  // }
  // let valu = []
  // try {
  //   valu = await AsyncStorage.multiGet(keys);
  // } catch(e) {
  //   // read error
  // }
  // console.log((valu))
  // vf = valu[0].map(req => JSON.parse(req));
  // let sum = 0;
  // //console.log(vf[1][0].marks);
  // // sum = vf[1].map(mrks => sum+parseInt(mrks.marks));
  // // console.log("Total marks is :"+sum);
  // const totalMarks = vf[1].reduce((prev,next) => prev + parseInt(next.marks),0);
  // const totalCredits = vf[1].reduce((prev,next) => prev + parseInt(next.credits),0);
  // const totalCP = vf[1].reduce((prev,next) => prev + getGradePoint(parseInt(next.marks))*parseInt(next.credits),0);
  // console.log("Total marks in addpost screen is :"+totalMarks);
  // console.log("Total credits in addpost screen is :"+totalCredits);
  // console.log("Total CP in addpost screen is :"+totalCP);
  // console.log("CGPA in addpost screen is :"+(totalCP/totalCredits).toFixed(2));
  // //console.log("CGPA in addpost screen is :"+(((totalMarks/vf[1].length)+0.75)/10.0));
  // // try {
  // //   await AsyncStorage.clear()
  // // } catch(e) {
  // //   console.log(e);
  // // }

  // console.log('Done.')

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
           {!!semErr && (
            <Text style={{color: 'red'}}>
              {semErr}
            </Text>
          )}
      </View>    
      <View style={{marginBottom: 10,marginStart: 10}}>
        <Text style={{color: 'white',marginBottom: 5}}>Total No. of Subjects</Text>
        <NumericInput
        totalWidth={240} 
        totalHeight={50}
           onChange={value => setSubCount(value)} rounded textColor='#59656F' iconStyle={{ color: '#59656F' }} rightButtonBackgroundColor='#292d3e' leftButtonBackgroundColor='#292d3e' minValue={1}
          maxValue={10}/>
           {!!subCountErr && (
            <Text style={{color: 'red'}}>
              {subCountErr}
            </Text>
          )}
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
