import {View, Text,TouchableOpacity} from 'react-native';
import palette from 'res/palette';
import ProfileHeader from './ProfileHeader';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import UserBio from './UserBio';
import EditProfileButton from './EditProfileButton';
import ConstantStories from './ConstantStories';
import LineSeperator from './LineSeperator';
import ProfileGrid from './ProfileGrid';
import colors from '../../../res/colors';
import GridIcon from './gridIcon';
import React, {useContext, useState,useEffect} from 'react';

//const data = [{key: '1'},{key: '2'}];
//const semdata = [{sem:"1",cgpa:'7.8'},{sem:'2',cgpa:'7.3'},{sem:'3',cgpa:'7.6'},{sem:'4',cgpa:'7.1'}]
const semdata = [{name:"Srinivas",sem:'1'}]
const it = [1,2,3,4]


export default function profileScreen() {
  const [data, setData] = useState({
    name:'',
    usn:'12',
 })
  const getData = async () => {
    let value
    try {
      value = await AsyncStorage.getItem('name');
      // console.log(" crct stored values are 55 "+value);
     // setDetails(value);
     
      // data.name = value;
      //setData(...data);
    } catch(e) {
      // read error
    }
    // console.log(data);
  }
  // let setDetails = (v)  => {
  //   console.log("inside"  +data);
  //   setData({
  //     ...data,
  //     [data.name] : v,
  //   });
   

  // }
  useEffect(() => {
   getData();    
  }, []);
  return (
    <FlatList
      style={{flex: 1, backgroundColor: colors.bottomBackGround}}
      /*<ProfileHeader />
      <UserBio />
      <EditProfileButton />
      <ConstantStories />
      <LineSeperator />
      <ProfileGrid />*/
      data={semdata}
      keyExtractor={(item, index) => item.sem}
      renderItem={({item}) => (
        <>
          {/* <ProfileHeader sem={item} /> */}
          <UserBio sem={item} />
          {/* <EditProfileButton />
          <ConstantStories />
          <LineSeperator />
          <GridIcon />
          <ProfileGrid /> */}
        </>
      )}
    />
  );
}
