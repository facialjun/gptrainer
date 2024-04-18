import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View,Text, BackHandler, Dimensions, TouchableOpacity,StyleSheet,Image,ScrollView } from 'react-native'
import { TRMainScreens, TRMainStackParamList } from '../stacks/Navigator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'
import { color } from 'native-base/lib/typescript/theme/styled-system';



const BASE_URL = config.SERVER_URL;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


export const basicDimensions = {
  height: 852,
  width: 393,
};

const calculateAdjustedRatio = (dimension, basicDimension) => {
  const ratio = dimension / basicDimension;
      if (ratio < 1) {
          // 화면 크기가 기준치보다 작은 경우, 비율을 조정
          return (1 / ratio).toFixed(2);
      }
  return ratio.toFixed(2);
};

export const height = calculateAdjustedRatio(screenHeight, basicDimensions.height);
export const width = calculateAdjustedRatio(screenWidth, basicDimensions.width);
//////////////////////////////////////////////////////////////// 코드 타입정의




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
    const [navigationTarget, setNavigationTarget] = useState(TRMainScreens.OpenLessonMain); // 1. 상태 변수 추가
    


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
                          setNavigationTarget(TRMainScreens.AdjustLessonMain); 
                      } else {
                          setButtonText("수업개설");
                          setLessonDescription("수업을 개설하고, 수익을 창출해보세요!");
                          setNavigationTarget(TRMainScreens.OpenLessonMain); 
                          
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
    <ScrollView style={{flex:1,paddingHorizontal:24}}>

    <View style={[styles.componnentBox,{marginTop:40}]}>
        <Text style={styles.body}>회원관리</Text>
        <Text style={[styles.captiongray,{marginTop:4}]}>회원관리를 쉽고 편하게 !</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',alignItems:'center',marginTop:'auto'}}>
          <View>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.AllMemberMain)}}
            style={{justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={styles.body}>
                10
              </Text>
              
              <Text style={[styles.caption,,{marginTop:4}]}>
                전체회원
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.NewMemberMain)}}
            style={{justifyContent:'flex-end',alignItems:'center',backgroundColor:'white'}}>
               <View style={{position: 'absolute', top: 4, right: 10, width: 4, height: 4, borderRadius: 10, backgroundColor: 'red'}} />
              <Text style={styles.body}>
                2
              </Text>
              
              <Text style={[styles.caption,{marginTop:4}]}>
                신규요청
              </Text>
            </TouchableOpacity>
          </View> 


          <View>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.ReregisterMemberMain)}}
            style={{justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={[styles.body]}>
                3
              </Text>
              
              <Text style={[styles.caption,,{marginTop:4}]}>
                종료임박
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>

      <View style={[styles.componnentBox,{marginTop:40}]}>
        <Text style={styles.body}>수업관리</Text>
        <Text style={[styles.captiongray,{marginTop:4}]}>수업관리를 쉽고 편하게 !</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',alignItems:'center',marginTop:'auto'}}>
          <View>
            <TouchableOpacity 
              onPress={()=>{navigation.navigate(TRMainScreens.LessonRequestMain)}}
              style={{justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={styles.body}>
                2
              </Text>
              
              <Text style={[styles.caption,{marginTop:4}]}>
                수업신청
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.LessonTodayMain)}}
            style={{justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={styles.body}>
                10
              </Text>
              
              <Text style={[styles.caption,{marginTop:4}]}>
                오늘수업
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate(TRMainScreens.LessonConfirmMain)}}
            style={{justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={styles.body}>
                3
              </Text>
              
              <Text style={[styles.caption,{marginTop:4}]}>
                완료대기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
        <TouchableOpacity  style={[styles.componentBox2,{marginTop:40}]} onPress={() => navigation.navigate(navigationTarget)}>
          <View style={{flex:1,paddingHorizontal:24,alignItems:'center',flexDirection:'row'}}>
            <Image source={require('../images/openClassIcon.png')} style={{width:28,height:28}}/>
            <View style={{marginLeft:8}}>
              <Text style={styles.bodyWhite}>{buttonText}</Text>
              <Text style={[styles.captionwhite,{marginTop:4}]}>{lessonDescription}</Text>
            </View>
          </View>
      </TouchableOpacity>

      {/* <View style={{backgroundColor:'white',height:screenHeight*0.2,marginTop:'7%',width:screenWidth*0.9,borderRadius:10}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>프로필 공유</Text>
        <Text style={{fontSize:13,color:'gray',marginTop:'1%'}}>링크를 공유하고, 회원스케줄을 편하게 관리하세요!</Text>
      </View> */}
    </ScrollView>
  )
}

export default TRhomescreen

 const styles = StyleSheet.create({
 componnentBox:{
  backgroundColor:'white',
  height:200/height,
  width:'100%',
  borderRadius:10,
  paddingHorizontal:24,
  paddingVertical:24
 },
 componentBox2:{
  backgroundColor:'#4169E1',
  height:90/height,
  width:'100%',
  borderRadius:8
 },
 body:{
  fontSize:20,
  fontWeight:'600'
 },
 bodyWhite:{
  color:'white',
  fontSize:20,
  fontWeight:'600'
 },
 caption:{
  fontSize:14,
  fontWeight:'400'
 },
 captionBold:{
  fontSize:14,
  fontWeight:'600'
 },
 captiongray:{
    color:'#868E96',
    fontSize:14,
    fontWeight:'400'
 },
 captionwhite:{
  color:'white',
  fontSize:14,
  fontWeight:'400'
}

  });