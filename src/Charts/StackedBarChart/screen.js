import React from 'react';
import {View, Text} from 'react-native';
import StackedBarChart from '../StackedBarChart';
import data from '../StackedBarChart/data';

export default function StackedBarScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StackedBarChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Stacked Bar Chart</Text>
    </View>
  );
}
