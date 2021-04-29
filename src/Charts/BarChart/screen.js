import React from 'react';
import {View, Text} from 'react-native';
import BarChart from '../BarChart';
import data from '../BarChart/data';


export default function BarScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <BarChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Bar Chart</Text>
    </View>
  );
}
