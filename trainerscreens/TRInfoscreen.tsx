import React, { useEffect, useState } from 'react'
import { View,Text, Alert, TouchableOpacity, Dimensions } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { TRMainScreens, TRMainStackParamList} from '../stacks/Navigator';
import config from '../config'

const BASE_URL = config.SERVER_URL;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;




type TRInfoScreenNavigationProps = StackNavigationProp<
    TRMainStackParamList,
    'TRInfoMain'
>;

interface TRInfoScreenProps {
    navigation: TRInfoScreenNavigationProps;
};


const TRInfoscreen:React.FunctionComponent<TRInfoScreenProps> = ({navigation}) => {

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
            // AsyncStorage에서 logId 가져오기
            let logId = await AsyncStorage.getItem('logId');
            if (logId) {
                // Remove quotes from logId, if present
                logId = logId.replace(/^['"](.*)['"]$/, '$1');
                console.log(logId);

                // logId를 사용하여 사용자 데이터 가져오기
                const response = await axios.get(`${BASE_URL}/Tuser/${logId}`);
                if (response.status === 200) {
                setUserData(response.data);
                console.log('Fetched User Data:', response.data);
                }
            }
            } catch (error) {
            console.log('Error:', error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
        }, []); // 빈 의존성 배열로, 컴포넌트 마운트 시에만 실행





    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

            <View style={{height:50,backgroundColor:'white',justifyContent:'center'}}>
                <Text style={{fontSize: 17,fontWeight:'bold',marginLeft:10,color:'#4F4F4F'}}>{userData?.username} 트레이너</Text>
            </View>    
            
            <View style={{height:50,backgroundColor:'white',marginTop:'3%'}}>
                <TouchableOpacity
                onPress={()=>{navigation.navigate(TRMainScreens.LogInformationMain)}}>
                    <Text>내 정보 보기</Text>
                </TouchableOpacity>
                
            </View>
            
            {/* <View style={{height:50,backgroundColor:'white',marginTop:'3%'}}>
                <TouchableOpacity
                onPress={()=>{navigation.navigate()}}>
                    <Text>정산관리</Text>
                </TouchableOpacity>
            </View> */}

            <View style={{height:50,backgroundColor:'white',marginTop:'3%'}}>
                <TouchableOpacity
                onPress={()=>{navigation.navigate(TRMainScreens.LessonRuleMain)}}>
                    <Text>트레이너 수업정책</Text>
                </TouchableOpacity>
            </View>

                    
            
        </View>
    )
    }

export default TRInfoscreen