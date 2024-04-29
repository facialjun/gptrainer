
import axios from 'axios';
import { Button } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View,Text, StyleSheet,ScrollView, TouchableOpacity,Image } from 'react-native'
import config from '../config';
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign';

const BASE_URL = config.SERVER_URL;

export const TrainingMemberProfile = ({route}) => {
    const { data } = route.params;

    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 여기서 data.tmid는 실제로 받아오는 데이터에 따라서 결정되어야 합니다.
                const tmid = data.tmid; // data.tmid를 사용할 수 있는 데이터로 대체해야 합니다.
                console.log(tmid)

                // TrainingProgressDetail로 요청 보내기
                const response = await axios.get(`${BASE_URL}/TrainingProgressDetail/${tmid}`);
                
                
                if (response.status === 200) {
                    setProgressData(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error fetching progress data:', error);
            }
        };

        fetchData();
    }, [data.tmid]); // d

    
    return (
    <ScrollView>
        
        <View style={{flex:1}}>
            <View style={{backgroundColor:'white',paddingHorizontal:24,paddingBottom:40}}>
            <Text style={{fontSize:24,fontWeight:'600',marginTop:30}}>
                회원정보
            </Text>
            <View style={{width:'100%',height:144,backgroundColor:'#4169E1',borderRadius:8,paddingHorizontal:24,paddingVertical:24,justifyContent:'space-between',marginTop:24}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.body3White}>이름</Text>
                <Text style={styles.body3WhiteBold}>{data.username}</Text>

                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.body3White}>전화번호</Text>
                <Text style={styles.body3WhiteBold}>{data.phone_number}</Text>    
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.body3White}>생년월일</Text>
                <Text style={styles.body3WhiteBold}>{data.birthday}</Text>
                </View>
            </View>
            </View>
            <View style={{marginTop:24,paddingHorizontal:24,backgroundColor:'white',paddingVertical:24}}>
                <View style={{flexDirection:'row',backgroundColor:'white',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={styles.Title}>보유회차</Text>
                    <Text style={styles.TitlePrimary}>{data.session}회</Text>

                </View>
                <Text style={[styles.body3Gray,{marginTop:4}]}>구매일자 : {new Date(data.start_date).toLocaleDateString()}</Text>

            </View>
            <View style={{marginTop:24,paddingHorizontal:24,backgroundColor:'white',paddingVertical:24}}>
               
                    <Text style={styles.Title}>진행이력</Text>
                    {progressData.map((detail, index) => (
                    <View key={index} style={{width:'100%',height:68,flexDirection:'row',alignItems:'center',backgroundColor:'#F8F9FA',borderRadius:8,marginTop:24,justifyContent:'space-between',paddingHorizontal:24}} >
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.body1Bold}>{detail.SessionNumber}회</Text>
                            <Text style={[styles.body2,{marginLeft:24}]}>{new Date(detail.DateofProgress).toLocaleDateString()}</Text>
                        </View>

                        <Image source={require('../images/TrainingCalenderIcon.png')} style={{width:24,height:24}}/>
                    
                    </View>

                ))}

         


                

            </View>
        </View>
    </ScrollView>

  )
}

export default TrainingMemberProfile

const styles = StyleSheet.create({
    container: {
        height:'100%',
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop:24,

        width:'100%',
        paddingVertical:16,
        flexDirection:'row',
        alignItems:'center'
    },
  
    Title:{
        fontSize:24,
        fontWeight:'600'
    },
    TitlePrimary:{
        fontSize:24,
        fontWeight:'600',
        color:'#4169E1'
    },
    body1Bold:{
        fontSize:20,
        fontWeight:'600'
       },
    body2Bold:{
        fontSize:18,
        fontWeight:'600'
       },
    body2:{
        fontSize:18,
        fontWeight:'400'
       },
    body2PrimaryBold:{
        fontSize:18,
        fontWeight:'600',
        color:'#4169E1'
    },

    body3Primary:{
     fontSize:16,
     fontWeight:'400',
     color:'#4169E1'
    },
    body3White:{
        fontSize:16,
        fontWeight:'400',
        color:'white'
    },
    body3Gray:{
        fontSize:16,
        fontWeight:'400',
        color:'#868E96'
    },
    body3WhiteBold:{
        fontSize:16,
        fontWeight:'600',
        color:'white'
    }
    
    

 
});