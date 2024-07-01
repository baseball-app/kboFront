import React from 'react';
import {View, Text, Button} from 'react-native';
import {MainScreenProps} from '../../types/main';

function Main({navigation}: MainScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>메인 화면</Text>
      <Button
        title="캘린더로 이동"
        onPress={() => navigation.navigate('캘린더')}
      />
    </View>
  );
}

export default Main;
