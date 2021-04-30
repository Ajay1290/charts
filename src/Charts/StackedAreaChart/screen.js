import React from 'react';
import {View, Text} from 'react-native';
import StackedAreaChart from '../StackedAreaChart';
import data from '../StackedAreaChart/data';

export default function StackedAreaScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StackedAreaChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Stacked Area Chart</Text>
    </View>
  );
}
