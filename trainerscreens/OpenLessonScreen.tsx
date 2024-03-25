import React, { useEffect } from 'react'
import { View,Text, BackHandler, Dimensions,TouchableOpacity } from 'react-native'
import { OpenLessonMainStackParamList, OpenLessonMainScreens } from '../stacks/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';



const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;



//////////////////////////////////////////////////////////////// 코드 타입정의

type OpenLessonScreenNavigationProps = StackNavigationProp<
    OpenLessonMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'OpenLesson' 
>;

interface OpenLessonScreenProps {
  navigation: OpenLessonScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
};

const OpenLessonScreen:React.FunctionComponent<OpenLessonScreenProps> = ({navigation}) => {

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
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>수업 개설하기</Text>
            
            <View style={{width:screenWidth*0.3,height:50}}>
                <TouchableOpacity 
                onPress={()=>{navigation.navigate(OpenLessonMainScreens.AdjustLessonTime)}}
                style={{width:screenWidth*0.3,height:screenHeight*0.06,backgroundColor:'white',borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                    <Text>수업 개설하기</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default OpenLessonScreen