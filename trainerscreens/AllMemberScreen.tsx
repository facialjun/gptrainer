import React, { useEffect, useState } from 'react'
import { View,Text, BackHandler, Dimensions,ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import { AllMemberMainStackParamList,  AllMemberMainScreens, TRMainScreens} from '../stacks/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'
import AntDesign from 'react-native-vector-icons/AntDesign';



const BASE_URL = config.SERVER_URL;


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;




//////////////////////////////////////////////////////////////// 코드 타입정의

type AllMemberScreenNavigationProps = StackNavigationProp<
    AllMemberMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'AllMember' 
>;

interface AllMemberScreenProps {
  navigation: AllMemberScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
  route: any
};


const AllMemberScreen:React.FunctionComponent<AllMemberScreenProps> = ({navigation,route}) => {

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [membershipData, setMembershipData] = useState([]);
    

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
                    if (logId) {
                        logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거
    
                        // logId를 사용하여 사용자 데이터 가져오기
                        const userResponse = await axios.get(`${BASE_URL}/Tuser/${logId}`);
                        if (userResponse.status === 200) {
                            const userData = userResponse.data;
                            console.log('Fetched User Data:', userData);
    
                            // Trainer_id로 TrainingMembership 데이터 조회
                            const membershipResponse = await axios.get(`${BASE_URL}/TrainingMembership/${userData.Trainer_id}`);
                            if (membershipResponse.status === 200) {
                                setMembershipData(membershipResponse.data);
                                console.log('Fetched Membership Data:', membershipResponse.data);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
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
        //                 const response = await axios.get(`${BASE_URL}/AllMember/${logId}`);
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

        const [selectedTab, setSelectedTab] = useState('allMembers');
    
     
        const handleTabPress = (tab) => {
            setSelectedTab(tab);
            // You can add logic here to update the content based on the selected tab
        };
    
        const renderTab = (tabName, label) => (
            <TouchableOpacity
                key={tabName}
                style={{ flex: 1, alignItems: 'center', paddingVertical: 16, backgroundColor: '#fff' ,borderBottomColor:selectedTab === tabName ? '#4169E1' : '#fff',borderBottomWidth:1}}
                onPress={() => handleTabPress(tabName)}
            >
                <Text style={{ color:'#000' }}>{label}</Text>
            </TouchableOpacity>
        );

        const renderMembershipData = (selectedTab) => {
            if (selectedTab === 'allMembers') {
                return membershipData.map((data) => (
                    <TouchableOpacity key={data.tmid} style={styles.card} onPress={() => navigation.navigate('TrianingMemberProfile', { data })}>
                        <View>
                            <Text style={styles.body2Bold}>{data.username}</Text>
                            <Text style={styles.body3Primary}>진행이력: {data.CompleteSession === null ? 0 : data.CompleteSession}/{data.session}</Text>
                        </View>
                        <AntDesign name="right" size={24} style={{marginLeft:'auto', color:'#CBCBCB'}}/>
                    </TouchableOpacity>
                ));
            } else if (selectedTab === 'newRequests') {
                const newRequestsData = membershipData.filter(data => data.CompleteSession === 0 || data.CompleteSession === null);
                return newRequestsData.map((data) => (
                    <TouchableOpacity key={data.uid} style={styles.card} onPress={() => navigation.navigate('TrianingMemberProfile', { data })}>
                        <View>
                            <Text style={styles.body2Bold}>{data.username}</Text>
                            <Text style={styles.body3Primary}>진행이력: {data.CompleteSession === null ? 0 : data.CompleteSession}/{data.session}</Text>
                        </View>
                        <AntDesign name="right" size={24} style={{marginLeft:'auto', color:'#CBCBCB'}}/>
                    </TouchableOpacity>
                ));
            } else if (selectedTab === 'endingSoon') {
                const endingSoonData = membershipData.filter(data => (data.session - data.CompleteSession) <= 2);
                return endingSoonData.map((data) => (
                    <TouchableOpacity key={data.tmid} style={styles.card} onPress={() => navigation.navigate('TrianingMemberProfile', { data })}>
                        <View>
                            <Text style={styles.body2Bold}>{data.username}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.body3Primary}>진행이력: </Text>
                                <Text style={styles.body3Red}>{data.CompleteSession}/</Text>
                                <Text style={styles.body3Primary}>{data.session}</Text>
                            </View>
                        </View>
                        <AntDesign name="right" size={24} style={{marginLeft:'auto', color:'#CBCBCB'}}/>
                    </TouchableOpacity>
                ));
            }
        };


        

    return (
        <ScrollView style={{flex:1}}>
         <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                {renderTab('allMembers', '전체회원')}
                {renderTab('newRequests', '신규요청')}
                {renderTab('endingSoon', '종료임박')}
        </View>
        <View style={{flex:1,paddingHorizontal:24}}>
            <Text style={{fontWeight:'600',fontSize:24,marginTop:30}}>회원프로필</Text>
            {renderMembershipData(selectedTab)}
        </View>
    </ScrollView>
    )
}

export default AllMemberScreen

const styles = StyleSheet.create({
  
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop:24,
        paddingHorizontal:24,
        width:'100%',
        paddingVertical:16,
        flexDirection:'row',
        alignItems:'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    body2Bold:{
        fontSize:18,
        fontWeight:'600'
       },
    body3Primary:{
     fontSize:16,
     fontWeight:'400',
     color:'#4169E1'
    },
    body3Red:{
        fontSize:16,
        fontWeight:'600',
        color:'red'
       }
 
});