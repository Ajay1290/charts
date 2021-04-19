import React from 'react';
import {View, Text} from 'react-native';
import LineChart from '../LineChart';
import data from '../LineChart/data';

export default function LineScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LineChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Line Chart</Text>
    </View>
  );
}
