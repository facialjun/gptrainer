import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { View,Text, BackHandler } from 'react-native'
import { OpenLessonMainStackParamList } from '../stacks/Navigator';

//////////////////////////////////////////////////////////////// 코드 타입정의

type AdjustLessonTimeScreenNavigationProps = StackNavigationProp<
    OpenLessonMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'AdjustLessonTime' 
>;

interface AdjustLessonTimeScreenProps {
  navigation: AdjustLessonTimeScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
};



const AdjustLessonTimeScreen:React.FunctionComponent<AdjustLessonTimeScreenProps> = ({navigation}) => {

    useEffect(() => {
            const backAction = () => {
                navigation.goBack(); // 이전 화면으로 돌아가기
                return true; // 이벤트 버블링을 방지
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [navigation]); // 의존성 배열에 navigation 추가

        
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>수업시간 설정하기</Text>
        </View>
    )
}

export default AdjustLessonTimeScreen