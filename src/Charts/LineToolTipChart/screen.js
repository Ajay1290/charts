import React from 'react';
import {View, Text} from 'react-native';
import LineToolTipChart from '../LineToolTipChart';
import data from './data';

export default function LineToolTipScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LineToolTipChart data={data} />
      <Text style={{marginTop: 40, fontSize: 24}}>Line ToolTip Chart</Text>
    </View>
  );
}
