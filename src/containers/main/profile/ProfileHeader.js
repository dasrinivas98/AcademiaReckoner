import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from 'res/images';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
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
export default function ProfileHeader({sem}) {
  return (
    // <View style={Styles.container}>
    //   {/* <TouchableOpacity>
    //     <Image
    //       source={{uri: 'https://picsum.photos/600'}}
    //       style={Styles.prfilePicture}
    //     />
    //   </TouchableOpacity> */}

    //   {/* <View style={Styles.container2}>
    //     <View style={Styles.container3}>
    //       <TouchableOpacity>
    //         <Text style={Styles.numberContainer}>10</Text>
    //         <Text style={Styles.text}>Posts</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View style={Styles.container3}>
    //       <TouchableOpacity>
    //         <Text style={Styles.numberContainer}>160</Text>
    //         <Text style={Styles.text}>Followers</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View style={Styles.container3}>
    //       <TouchableOpacity>
    //         <Text style={Styles.numberContainer}>100</Text>
    //         <Text style={Styles.text}>Following</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View> */}
    // </View>
//     <Card
//     style={{height:200}}>
//   <CardImage 
//     source={images.background} 
//     title="1st Semester"
//   />
//   {/* <CardTitle 
//     title="This is a title" 
//     subtitle="This is subtitle"
//    />
//   <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" /> */}
//   <CardAction 
//     separator={true} 
//     inColumn={false}
//     style={{color:'black'}}>
//     <CardButton
//       onPress={() => {}}
//       title="Explore"
//       color="blue"
//     />
//   </CardAction>
// </Card>

<CardEcomFour
            title={"Semester "+sem.sem}
            subTitle={"SGPA"}
            price={sem.cgpa+"/10"}
            image={images.background}
            buttonText={"VIEW DETAILS"}
            buttonColor={"purple"}
            onClickButton={() => console.log("this")}
          />

  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 20,
  },
  numberContainer: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginEnd: 20,
  },
  text: {
    color: 'white',
    //fontWeight: 'bold',
    alignSelf: 'center',
  },
  container3: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});
