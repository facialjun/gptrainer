import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View,Text, BackHandler, Dimensions, TouchableOpacity } from 'react-native'
import { TRMainScreens, TRMainStackParamList } from '../stacks/Navigator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'

const BASE_URL = config.SERVER_URL;


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;



//////////////////////////////////////////////////////////////// 코드 타입정의

type TRhomeScreenNavigationProps = StackNavigationProp<
    TRMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'TRhome' 
>;

interface TRhomeScreenProps {
  navigation: TRhomeScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
};


//////////////////////////////////////////////////////////////// 

const TRhomescreen:React.FunctionComponent<TRhomeScreenProps> = ({navigation}) => {

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [buttonText, setButtonText] = useState('');
    const [lessonDescription, setLessonDescription] = useState('');
    


    useEffect(() => {
    const fetchAvailableTimes = async () => {
        try {
            // AsyncStorage에서 logId 가져오기
            let logId = await AsyncStorage.getItem('logId');
            if (logId) {
                logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거

                // logId를 사용하여 사용자의 uid를 가져오는 요청
                const userResponse = await axios.get(`${BASE_URL}/Tuser/${logId}`);
                if (userResponse.status === 200) {
                    const uid = userResponse.data.uid;

                    // uid를 사용하여 사용자의 available_times 정보를 가져오는 요청
                    const timesResponse = await axios.get(`${BASE_URL}/userAvailableTimes/${uid}`);
                    if (timesResponse.data.hasAvailableTimes) {
                      
                        // 여기에서 UI 업데이트 로직을 추가
                        setButtonText("수업시간 수정하기");
                        setLessonDescription("나의 수업시간 수정하기")
                    } else {
                        setButtonText("수업개설");
                        setLessonDescription("수업을 개설하고, 수익을 창출해보세요!")
                        
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching available times:', error);
        }
    };

    fetchAvailableTimes();
}, []);



  useEffect(() => {
        // 뒤로 가기 버튼을 눌렀을 때 호출될 함수
        const backAction = () => {
        BackHandler.exitApp();
        return true;
        };

        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );

        return () => backHandler.remove();
    }, []);

    
  return (
    <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>

    <View style={{backgroundColor:'white',height:screenHeight*0.2,width:screenWidth*0.9,borderRadius:10}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>회원관리</Text>
        {/* <Text style={{fontSize:13,color:'gray',marginTop:'1%'}}>회원분들을 관리하고, 만족도를 높여보세요.</Text> */}
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{width:100,height:100}}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.AllMemberMain)}}
            style={{width:100,height:100,justifyContent:'flex-end',alignItems:'center'}}>
              <Text>
                10
              </Text>
              
              <Text>
                전체회원
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width:100,height:100}}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.ReregisterMemberMain)}}
            style={{width:100,height:100,justifyContent:'flex-end',alignItems:'center'}}>
              <Text>
                2
              </Text>
              
              <Text>
                신규요청
              </Text>
            </TouchableOpacity>
          </View> 


          <View style={{width:100,height:100}}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.ReregisterMemberMain)}}
            style={{width:100,height:100,justifyContent:'flex-end',alignItems:'center'}}>
              <Text>
                3
              </Text>
              
              <Text>
                종료임박
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>

      <View style={{backgroundColor:'white',marginTop:'7%',height:screenHeight*0.2,width:screenWidth*0.9,borderRadius:10}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>수업관리</Text>
        {/* <Text style={{fontSize:13,color:'gray',marginTop:'1%'}}>요청을 확인하고 수업을 시작해보세요!</Text> */}
      
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{width:100,height:100}}>
            <TouchableOpacity 
              onPress={()=>{navigation.navigate(TRMainScreens.LessonRequestMain)}}
              style={{width:100,height:100,justifyContent:'flex-end',alignItems:'center'}}>
              <Text>
                2
              </Text>
              
              <Text>
                수업신청
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width:100,height:100}}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.LessonTodayMain)}}
            style={{width:100,height:100,justifyContent:'flex-end',alignItems:'center'}}>
              <Text>
                10
              </Text>
              
              <Text>
                오늘수업
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width:100,height:100}}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.LessonConfirmMain)}}
            style={{width:100,height:100,justifyContent:'flex-end',alignItems:'center'}}>
              <Text>
                3
              </Text>
              
              <Text>
                완료대기
              </Text>
            </TouchableOpacity>
          </View>

          
        </View>

      </View>
      
        <TouchableOpacity onPress={()=>{navigation.navigate(TRMainScreens.OpenLessonMain)}}>
          <View style={{backgroundColor:'#4169E1',height:screenHeight*0.1,marginTop:'7%',width:screenWidth*0.9,borderRadius:10}}>
              <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}>{buttonText}</Text>
              <Text style={{fontSize:13,color:'white',marginTop:'1%'}}>{lessonDescription}</Text>
          </View>
      </TouchableOpacity>

      {/* <View style={{backgroundColor:'white',height:screenHeight*0.2,marginTop:'7%',width:screenWidth*0.9,borderRadius:10}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>프로필 공유</Text>
        <Text style={{fontSize:13,color:'gray',marginTop:'1%'}}>링크를 공유하고, 회원스케줄을 편하게 관리하세요!</Text>
      </View> */}
    </View>
  )
}

export default TRhomescreen