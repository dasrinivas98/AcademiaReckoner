import React,{useState,useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image,ScrollView} from 'react-native';
import palette from 'res/palette';
import images from 'res/images';
import colors from 'res/colors';
import PostImage from './PostImage';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Modal from "react-native-modal";
import {
  CardOne,
  CardTwo,
  CardThree,
  CardFour,
  CardFive,
  CardSix,
  CardSeven,
  CardEight,
  CardNine,
  CardTen,
  CardEleven,
  CardTwelve,
  CardEcomOne,
  CardEcomTwo,
  CardEcomThree,
  CardEcomFour
} from "react-native-card-ui";
import { useIsFocused } from "@react-navigation/native";


export default function PostHeader({sem}) {
   const [tabledata,setTableData] = useState({
    tableHead: ['Subject', 'Marks', 'Credits'],
    Data: []
  });
  const init = () =>{
    // var parResult = [];
    var comResult = [];
      sem.marks.map(ob =>{
      //console.log(ob);
      const parResult = [];
      count = 0;
      for(var i in ob){
      parResult.push(ob[i])
      //parResult.splice(count, 0, ob[i]);
      //console.log("count : "+count+ " value :"+ ob[i]);
      count+=1;;
      
    }
    //Object.values(ob).forEach((value, index)=> console.log(value));
      comResult.push(parResult)
      //console.log(parResult);
      tabledata.Data = [...tabledata.Data,parResult];
      //console.log(comResult);
      
    });
    //tabledata.Data = [...tabledata.Data,comResult];
    //console.log(tabledata.Data);

  }
  const [isModalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    init(); 
   }, [isFocused]);
  return (
    
    <View style={{ flex: 1 }}>
      <CardEcomFour
            title={"Semester "+sem.sem}
            subTitle={"SGPA"}
            price={sem.sgpa+"/10"}
            image={images.background}
            buttonText={"VIEW DETAILS"}
            buttonColor={"red"}
            onClickButton={toggleModal}
          />

      <Modal 
        animationType="slide"
        backdropOpacity={0.9}
        isVisible={isModalVisible}>
        <ScrollView style={{ flex: 1}}>
          <Text style={{color:'grey',fontFamily:'sans-serif',fontSize:20}}>Semester {sem.sem}</Text>
          <Text style={{color:'white',fontSize:20,marginTop:10}}>Total marks : <Text style={{color:'red'}}>{sem.marks.length*100}</Text></Text>
          <Text style={{color:'white',fontSize:20,marginTop:10}}>Marks scored : <Text style={{color:'red'}}>{sem.tMarks}</Text></Text>
          {
            sem.marks.map(ob =>{
              return(<Text key={ob.sub} style={{color:'white',fontSize:20,marginTop:10}}>{ob.sub} : <Text style={{color:'red'}}>{ob.marks}/100</Text></Text>)
            })
          }
          <Text style={{color:'white',fontSize:20,marginTop:10}}>Percentage : <Text style={{color:'red'}}>{sem.per}%</Text></Text>
          <Text style={{color:'white',fontSize:20,marginTop:10}}>SGPA : <Text style={{color:'red'}}>{sem.sgpa}</Text></Text>
          <Text style={{color:'white',fontSize:20,marginTop:10}}>CGPA : <Text style={{color:'red'}}>{sem.cgpa}</Text></Text>


          <TouchableOpacity style={{alignItems: 'center',height: 40,width:80,marginTop: 10, backgroundColor: '#0088f8', justifyContent: 'center',
                borderRadius: 5,}} onPress={toggleModal}>
                <Text style={{color: '#fff'}}>OK</Text>
                {/* <Icon style={Styles.loginText} name='chevron-right' type='font-awesome-5' color='#FFFFFF'/> */}
            </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
    
  //   <View style={styles.container}>
  //   <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
  //     <Row data={tabledata.tableHead} style={styles.head} textStyle={styles.text}/>
  //     <Rows data={tabledata.Data} textStyle={styles.text}/>
  //   </Table>
  // </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
// const Styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.background,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 12,
//     marginBottom: 6,
//     marginStart: 10,
//     marginEnd: 10,
//     alignItems: 'center',
//   },
//   nameContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   personImage: {
//     width: 30,
//     height: 30,
//     borderRadius: 30,
//   },
//   personName: {
//     color: colors.text,
//     marginStart: 10,
//     fontWeight: 'bold',
//   },
//   placeName: {
//     color: colors.text,
//     marginStart: 10,
//     fontSize: 12,
//   },
//   iconMore: {
//     height: 15,
//     width: 15,
//   },
// });
