import React, { useEffect } from 'react'
import { View,Text, Dimensions, BackHandler, TouchableOpacity,ScrollView } from 'react-native'
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
        <ScrollView style={{height:'auto'}}>
            
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity 
                    style={{width:screenWidth*0.9,justifyContent:'flex-start',alignItems:'flex-start',height:screenHeight*0.2,backgroundColor:'white',marginTop:'3%',borderRadius:8,borderWidth:1,borderColor:'#4A7AFF'}}>
                        <Text>xx회원(잔여회차)</Text>
                        <Text>방번호</Text>
                        <Text>날짜 시간</Text>
                        
            
                            <View style={{flexDirection:'row',backgroundColor:'gray',width:screenWidth*0.8,justifyContent:'space-between',alignItems:'center',height:screenHeight*0.1}}>
                                <Text>수업확정</Text>
                                <Text>시간변경</Text>
                                <Text>노쇼</Text>
                                <Text>수업완료</Text>
                            </View>
                

                        
                    </TouchableOpacity>
                </View>
            
        </ScrollView>
    
    )
}

export default LessonTodayScreen