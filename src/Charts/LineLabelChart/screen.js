import React from 'react';
import {View, Text} from 'react-native';
import LineLabelChart from '../LineLabelChart';
import data from './data';

export default function LineLabelScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LineLabelChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Line Label Chart</Text>
    </View>
  );
}
