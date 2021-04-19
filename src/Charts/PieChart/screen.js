import React from 'react';
import {View, Text} from 'react-native';
import PieChart from '../PieChart';
import data from '../PieChart/data';


export default function PieScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <PieChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Pie Chart</Text>
    </View>
  );
}
