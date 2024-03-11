import React, { useEffect } from 'react'
import { View,Text, BackHandler } from 'react-native'

const TRhomescreen = () => {

  useEffect(() => {
        // 뒤로 가기 버튼을 눌렀을 때 호출될 함수
        const backAction = () => {
        BackHandler.exitApp();
        return true;
        };

        // 뒤로 가기 버튼의 이벤트 리스너를 추가합니다.
        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => backHandler.remove();
    }, []);

    
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>TRhomescreen</Text>
    </View>
  )
}

export default TRhomescreen