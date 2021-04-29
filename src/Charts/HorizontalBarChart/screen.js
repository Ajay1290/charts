import React from 'react';
import {View, Text} from 'react-native';
import HorizontalBarChart from '../HorizontalBarChart';
import data from '../HorizontalBarChart/data';


export default function HorizontalBarScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <HorizontalBarChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Horizontal Bar Chart</Text>
    </View>
  );
}
