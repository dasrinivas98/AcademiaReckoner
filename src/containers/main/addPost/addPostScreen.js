import React,{useState} from 'react';
import {View, Text} from 'react-native';
import palette from 'res/palette';
import colors from 'res/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input-counter';

export default function addPostScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 1, value: 1},
    {label: 2, value: 2},
    {label: 3, value: 3},
    {label: 4, value: 4},
    {label: 5, value: 5},
    {label: 6, value: 6},
    {label: 7, value: 7},
    {label: 8, value: 8},

  ]);

  return (
    <View style={{flex: 1, backgroundColor: colors.bottomBackGround}}>
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white'}}>Semester</Text>
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
      <View style={{marginBottom: 5}}>
        <Text style={{color: 'white'}}>Total No. of Subjects</Text>
        <NumericInput
          onChange={value => console.log(value)} rounded textColor='#59656F' iconStyle={{ color: 'white' }} rightButtonBackgroundColor='#292d3e' leftButtonBackgroundColor='#292d3e' minValue={1}
          maxValue={10} />
      </View>
    </View>
  );
}
