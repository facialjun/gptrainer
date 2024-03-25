import React, { useEffect } from 'react'
import { View,Text, BackHandler, Dimensions } from 'react-native'
import { ReregisterMemberMainStackParamList, ReregisterMemberMainScreens } from '../stacks/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;



//////////////////////////////////////////////////////////////// 코드 타입정의

type ReregisterMemberScreenNavigationProps = StackNavigationProp<
    ReregisterMemberMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'ReregisterMember' 
>;

interface ReregisterMemberScreenProps {
  navigation: ReregisterMemberScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
};

const ReregisterMemberScreen:React.FunctionComponent<ReregisterMemberScreenProps> = ({navigation}) => {

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
        <View><Text>ReregisterMemberScreen</Text></View>
    )
}

export default ReregisterMemberScreen