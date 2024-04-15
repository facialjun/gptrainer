import React, { useEffect, useState } from 'react'
import { View,Text, BackHandler, Dimensions } from 'react-native'
import { ReregisterMemberMainStackParamList, ReregisterMemberMainScreens } from '../stacks/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'

const BASE_URL = config.SERVER_URL;

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

    const [userData, setUserData] = useState(null);
    const [membershipData, setMembershipData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

        useEffect(() => {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    // AsyncStorage에서 logId 가져오기
                    let logId = await AsyncStorage.getItem('logId');
                    console.log(logId)
                    if (logId) {
                        logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거

                        // logId를 사용하여 사용자 데이터 가져오기
                        const response = await axios.get(`${BASE_URL}/Tuser/${logId}`);
                        if (response.status === 200) {
                            setUserData(response.data);
                            // console.log('Fetched User Data:', response.data);
                        }
                    }
                } catch (error) {
                    console.log('Error:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }, []);



        // useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             let logId = await AsyncStorage.getItem('logId');
        //             if (logId) {
        //                 logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거
        //                 const response = await axios.get(`${BASE_URL}/NewMember/${logId}`);
        //                 setMembershipData(response.data);
        //                 console.log(response.data)
        //             }
        //         } catch (error) {
        //             console.error('Error fetching data:', error);
        //         } finally {
        //             setIsLoading(false);
        //         }
        //     };

        //     fetchData();
        // }, []);




    return (
        <View><Text>ReregisterMemberScreen</Text></View>
    )
}

export default ReregisterMemberScreen