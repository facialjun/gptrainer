import React, { useEffect } from 'react'
import { View,Text, Dimensions, BackHandler } from 'react-native'
import { TRMainScreens, TRMainStackParamList } from '../stacks/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;



//////////////////////////////////////////////////////////////// 코드 타입정의

type LessonTodayScreenNavigationProps = StackNavigationProp<
    TRMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'LessonTodayMain' 
>;

interface LessonTodayScreenProps {
  navigation: LessonTodayScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
};

const LessonTodayScreen:React.FunctionComponent<LessonTodayScreenProps> = ({navigation}) => {

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
        <Text>LessonTodayScreen</Text>
    </View>
    )
}

export default LessonTodayScreen