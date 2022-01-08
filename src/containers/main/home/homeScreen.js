import React,{useEffect,useState} from 'react';
import {FlatList, View} from 'react-native';
import Post from './post/Post';
import colors from '../../../res/colors';
import {Text} from 'react-native';
import {Image} from 'react-native';
import images from 'res/images';
import StoryContainer from './story/StoryContainer';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderKit from 'react-native-loader-kit';


  const data = [{key: '1'},{key: '2'}];
  const semdata = [{sem:"1",cgpa:'7.8'},{sem:'2',cgpa:'7.3'},{sem:'3',cgpa:'7.6'},{sem:'4',cgpa:'7.1'}]
  
  const it = [1,2,3,4]
  let ic = true;
export default function homeScreen({navigation}) {
  const [finalData,setFinalData] = useState([{sem:'',sgpa:0,cgpa:0,per:0,tMarks:0,marks:[]}]);
  const [isDataAvailable, setDataAvailable] = useState(false);
  const [loadingScreeen, setLoadingScreen] = useState(true);
  const [icon,setIcon] = useState(true);
  const isFocused = useIsFocused();
  const storyOnPress = () => navigation.navigate('StoryScreen');
  const init = async() => {
   let x = Math.floor(Math.random() * 11);
    if(x>=0 && x<5){
      ic = !ic;
    }
    setLoadingScreen(true);
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys();
      console.log("Semesters in homescreen: " +keys.length)
      console.log("Keys in homescreen: " +keys)
    } catch(e) {
      console.log(e);
    }
    if(keys.length>0){
      let keyarr = [];
      for(let i=1;i<=keys.length-4;i++){
        keyarr.push(i.toString());
      }
      console.log(keyarr);
      console.log("data is available");
      await FinalData(keyarr);
      setDataAvailable(true);
      setTimeout(() => {
        setLoadingScreen(false);
      }, 4000);
    }else{
      setDataAvailable(false);
      console.log("no data");
      setTimeout(() => {
        setLoadingScreen(false);
      }, 4000);
    }
    // console.log(finalData[0].marks);
    console.log(finalData);
  }
  const FinalData = async (keys) =>{
    let AllMarksData = [];
      AllMarksData = await getAllMarksData(keys);
      parsedData = await parseAllMarksData(AllMarksData);
      let creditsSum = 0;
      let CPSum = 0;
      parsedData.map(pd => {
        console.log(pd[1]);
      const totalMarks = pd[1].reduce((prev,next) => prev + parseInt(next.marks),0);
      //console.log(totalMarks);
      const totalCredits = pd[1].reduce((prev,next) => prev + parseInt(next.credits),0);
      //console.log(totalCredits)
      const totalCP = pd[1].reduce((prev,next) => prev + getGradePoint(parseInt(next.marks))*parseInt(next.credits),0);
      creditsSum = creditsSum + totalCredits;
      CPSum = CPSum + totalCP;
      //console.log(totalCP)
      finalData[pd[0]-1] = {...finalData[pd[0]-1], ['sem']: (pd[0]).toString(),['per']:(totalMarks/pd[1].length).toFixed(2),['sgpa']:(totalCP/totalCredits).toFixed(2),['cgpa']:(CPSum/creditsSum).toFixed(2),['tMarks']:totalMarks,['marks']:pd[1]};
      });
      console.log("creditSum : "+creditsSum)
      console.log("TotalCP : "+CPSum);
      // const totalMarks = parsedData.map(parsedData =>parsedData[1].reduce((prev,next) => prev + parseInt(next.marks),0));
      // console.log(totalMarks);
      // const totalCredits = parsedData.map(parsedData =>parsedData[1].reduce((prev,next) => prev + parseInt(next.credits),0));
      // console.log(totalCredits)
      // const totalCP = parsedData.map(parsedData =>parsedData[1].reduce((prev,next) => prev + getGradePoint(parseInt(next.marks))*parseInt(next.credits),0));
      // console.log(totalCP)
      // finalData[parsedData[0]-1] = {...finalData[parsedData[0]-1], ['sem']: (parsedData[0]),['per']:(totalMarks/parsedData[1].length).toFixed(2),['cgpa']:(totalCP/totalCredits).toFixed(2)};
  }
  const getAllMarksData = async(keys) =>{
    console.log(keys);
    let AllMarksData = []
    try {
      AllMarksData = await AsyncStorage.multiGet(keys);
    } catch(e) {
        console.log(e);
    }
    console.log("All marks data " +AllMarksData)
    return(AllMarksData);
  }
  
  const parseAllMarksData = (AllMarksData) => {
    parsedData = AllMarksData.map(amd => amd.map(req => JSON.parse(req)));
    //parsedData = AllMarksData[1].map((req => JSON.parse(req)));
    console.log("parsed marks data " +parsedData)
    return(parsedData);
  }
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
  const post = {
    userName: 'John Doe',
    placeName: 'Istanbul, Turkey',
    imgUrl: 'https://picsum.photos/1920/1080',
    likeCount: 103,
    commentCount: 21,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra.',
    publishDate: new Date().toDateString(),
  }
  
  useEffect(() => {
      init(); 
   }, [isFocused]);
   
   return({},loadingScreeen ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:colors.bottomBackGround}}>
        <LoaderKit
        style={{ width: 100, height: 100 }}
        name={ic ? 'Pacman':'BallScaleMultiple'} // Optional: see list of animations below
        size={50} // Required on iOS
        color={'red'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
      />
      <Text style={{color:'grey',fontWeight:'bold',fontFamily:'sans-serif-thin',letterSpacing:5,textAlign:'center',alignSelf:'center'}}>{ic ? 'Please wait while the Pac-Man finishes all the dots..' : 'Everything in this universe is either a potato or not a potato..'}</Text>
    </View>
    ) : ({},isDataAvailable ? (
      <FlatList
      style={{backgroundColor: colors.background}}
      data={finalData}
      keyExtractor={(item, index) => (item.sem)}
      // ListHeaderComponent={() => (
      //   <StoryContainer stories={stories} storyOnPress={storyOnPress} />
      // )}
      renderItem={({item}) => (
        /*<View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={images.harun}
            style={{height: 512, width: 512, resizeMode: 'contain'}}
          />
        </View>
        */
        <Post sem={item} />
      )}
    />
    ) : (
      <View style={{flex: 1, backgroundColor: colors.bottomBackGround,justifyContent:'center'}}>
        <Text style={{color:'grey',fontWeight:'bold',fontFamily:'sans-serif-thin',letterSpacing:5,textAlign:'center',alignSelf:'center'}}>Add Marks to get started</Text>
      </View>
    )))
  // return ({},
  //   isDataAvailable ? (
  //   <FlatList
  //     style={{backgroundColor: colors.background}}
  //     data={finalData}
  //     keyExtractor={(item, index) => item.sem}
  //     // ListHeaderComponent={() => (
  //     //   <StoryContainer stories={stories} storyOnPress={storyOnPress} />
  //     // )}
  //     renderItem={({item}) => (
  //       /*<View style={{flex: 1, alignItems: 'center'}}>
  //         <Image
  //           source={images.harun}
  //           style={{height: 512, width: 512, resizeMode: 'contain'}}
  //         />
  //       </View>
  //       */
  //       <Post sem={item} />
  //     )}
  //   />
  // ) :(
  //   <View style={{flex: 1, backgroundColor: colors.bottomBackGround,justifyContent:'center'}}>
  //     <Text style={{color:'grey',fontWeight:'bold',fontFamily:'sans-serif-thin',letterSpacing:5,textAlign:'center',alignSelf:'center'}}>Add Marks to get started</Text>
  //   </View>
    
  // ));
}
