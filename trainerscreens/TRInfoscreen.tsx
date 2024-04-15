import React, { useEffect, useState } from 'react'
import { View,Text, Alert, TouchableOpacity, Dimensions, Linking, ScrollView, RefreshControl,Image } from 'react-native'
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
        <ScrollView
        style={{height:'auto',backgroundColor:'white'}}
            >
        <View style={{height:'auto',backgroundColor:'white'}}>
            <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white',paddingHorizontal:24,marginTop:30}}>
                    
                    <View style={{height:50,backgroundColor:'white',justifyContent:'center'}}>
                        <Text style={{fontSize: 17,fontWeight:'bold',marginLeft:10,color:'#4F4F4F'}}>{userData?.username} 트레이너님!</Text>
                        <Text style={{fontSize: 13,marginLeft:10,color:'#4F4F4F'}}>안녕하세요</Text>
                    </View>    
        </View>
        
        
        {/* <View style={{paddingHorizontal:24,marginTop:40,borderBottomColor:'#DEE2E6',borderBottomWidth:1}}>
            <Text style={{fontWeight:'600',fontSize:20}}>보유회원권</Text>
            <TouchableOpacity 
                onPress={()=>[]}
                style={{flexDirection:'row',alignItems:'center',marginTop:24,justifyContent:'space-between',paddingBottom:24,backgroundColor:'white'}}>
                <Text style={{fontSize:18}}>대관/PT 이용권</Text>
            </TouchableOpacity>
        </View> */}
        <View style={{paddingHorizontal:24,marginTop:24,borderBottomColor:'#DEE2E6',borderBottomWidth:1}}>
            <Text style={{fontWeight:'600',fontSize:20}}>회원정보</Text>
            <TouchableOpacity 
                onPress={()=>{navigation.navigate(TRMainScreens.LogInformationMain)}}
                style={{flexDirection:'row',alignItems:'center',marginTop:24,justifyContent:'space-between',paddingBottom:24,backgroundColor:'white'}}>
                    <Text style={{fontSize:18}}>내 계정정보</Text>
                    {/* <AntDesign name="right" size={18} color="black" /> */}
            </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:24,marginTop:24,backgroundColor:'white'}}>
            <Text style={{fontWeight:'600',fontSize:20}}>정책</Text>
            <TouchableOpacity 
                onPress={()=>{navigation.navigate(TRMainScreens.LessonRuleMain)}}
                style={{flexDirection:'row',alignItems:'center',marginTop:24,justifyContent:'space-between'}}>
                    <Text style={{fontSize:18}}>트레이너 정책</Text>
                    
            </TouchableOpacity>
        </View>

        {/* <View style={{marginTop:24}}>
            <TouchableOpacity onPress={()=>[]}>
            
                <View style={{flex:1,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,flexDirection:'row',paddingHorizontal:24}}>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{color:'white',fontSize:12}}>PT를 받아보고 싶으신가요?</Text>
                        <Text style={{color:'white',fontSize:18,fontWeight:'600'}}>정기권 이용자를 위한 할인 혜택!</Text>
                    </View>
                        
                </View>
                </TouchableOpacity>
                
            </View> */}
            <View style={{backgroundColor:'#F8F9FA',paddingHorizontal:24,borderTopColor:'#E5E5E5',marginTop:40}}>
                {/* <Image source={require('../images/logo2.png')} style={{width: 160, height: 28 ,marginTop:30 }}/> */}
                    <Text style={{color:'#868E96',fontSize:16,fontWeight:'bold',marginTop:24}}>
                                    (주) 라이프팔레트
                    </Text>
                    <Text style={{color:'#868E96',fontSize:10,marginTop:8,fontWeight:'500'}}>
                            서울특별시 강남구 언주로 134길 6 2층 
                    </Text>
                    <Text style={{color:'#868E96',fontSize:10,marginTop:4,fontWeight:'500'}}>
                            대표이사:이승준,이상범 | 사업자번호: 853-87-02854
                    </Text>
                    <Text style={{color:'#868E96',fontSize:10,marginTop:4,fontWeight:'500'}}>
                            통신판매번호:제 2023-서울강남-06134
                    </Text>
                    <Text style={{color:'#868E96',fontSize:10,marginTop:4,fontWeight:'500'}}>
                            이메일: facialjun@gmail.com
                    </Text>
                    <Text style={{color:'#868E96',fontSize:10,marginTop:8}}>
                            주식회사 라이프팔레트는 통신판매중개자로서 통신판매의 당사자가 아니며 입점판매자가 등록한 상품정보 및 거래에 대한 책임을 지지 않습니다.
                    </Text>

                </View>
                    <View style={{flex:0.2,marginBottom:50,backgroundColor:'#F8F9FA',paddingHorizontal:24,paddingBottom:16}}>
                        <View style={{flex:0.7,flexDirection:'row',backgroundColor:'#F8F9FA'}}>
                            <TouchableOpacity 
                            style={{height:48,justifyContent:'center'}}
                            onPress={() => Linking.openURL('https://sites.google.com/view/using-gymprivate/%ED%99%88')}>
                                    <Text style={{ color: '#797676', fontSize: 10 }}>이용약관   |</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={{height:48,justifyContent:'center'}}
                            onPress={() => Linking.openURL('https://sites.google.com/view/gymprivate/%ED%99%88')}>
                                <Text style={{color:'#797676',fontSize:10,}}> 개인정보처리방침 </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={{height:48,justifyContent:'center'}}
                            onPress={() => Linking.openURL('https://sites.google.com/view/gymprivateusingduration/%ED%99%88')}>
                                <Text style={{ color: '#797676', fontSize: 10 }}>|   환불정책</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
            </View>

        </ScrollView>
        // <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
        //     <View style={{justifyContent:'flex-start',width:screenWidth,height:screenHeight*0.1}}>
        //         <View style={{height:50,backgroundColor:'white',justifyContent:'center'}}>
        //             <Text style={{fontSize: 17,fontWeight:'bold',marginLeft:10,color:'#4F4F4F'}}>안녕하세요</Text>
        //             <Text style={{fontSize: 17,fontWeight:'bold',marginLeft:10,color:'#4F4F4F'}}>{userData?.username} 트레이너님!</Text>
        //         </View>    

        //         {/* <View style={{height:50,backgroundColor:'white',justifyContent:'center'}}>
                    
        //         </View>     */}
                
        //     </View>
            
            
        //     <View style={{height:50,backgroundColor:'white',marginTop:'3%'}}>
        //         <TouchableOpacity
        //         onPress={()=>{navigation.navigate(TRMainScreens.LogInformationMain)}}>
        //             <Text>내 정보 보기</Text>
        //         </TouchableOpacity>
                
        //     </View>
            
        //     {/* <View style={{height:50,backgroundColor:'white',marginTop:'3%'}}>
        //         <TouchableOpacity
        //         onPress={()=>{navigation.navigate()}}>
        //             <Text>정산관리</Text>
        //         </TouchableOpacity>
        //     </View> */}

        //     <View style={{height:50,backgroundColor:'white',marginTop:'3%'}}>
        //         <TouchableOpacity
        //         onPress={()=>{navigation.navigate(TRMainScreens.LessonRuleMain)}}>
        //             <Text>트레이너 수업정책</Text>
        //         </TouchableOpacity>
        //     </View>

            

                    
            
        // </View>
    )
    }

export default TRInfoscreen