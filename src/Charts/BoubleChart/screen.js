import React from 'react';
import {View, Text} from 'react-native';
import BoubleChart from '../BoubleChart';
import data from '../BoubleChart/data';

export default function BoubleScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <BoubleChart data={data} />
      <Text style={{marginTop: 30, fontSize: 24}}>Bouble Chart</Text>
    </View>
  );
}
