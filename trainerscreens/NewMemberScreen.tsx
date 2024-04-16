import React, { useEffect, useState } from 'react'
import { View,Text, BackHandler, Dimensions,ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import { NewMemberMainStackParamList } from '../stacks/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'



const BASE_URL = config.SERVER_URL;


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;



//////////////////////////////////////////////////////////////// 코드 타입정의

type NewMemberScreenNavigationProps = StackNavigationProp<
    NewMemberMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'NewMember' 
>;

interface NewMemberScreenProps {
  navigation: NewMemberScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
};

const NewMemberScreen:React.FunctionComponent<NewMemberScreenProps> = ({navigation}) => {

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



        useEffect(() => {
            const fetchData = async () => {
                try {
                    let logId = await AsyncStorage.getItem('logId');
                    if (logId) {
                        logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거
                        const response = await axios.get(`${BASE_URL}/NewMember/${logId}`);
                        setMembershipData(response.data);
                        console.log(response.data)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }, []);




    return (
        <ScrollView style={styles.container}>
        {membershipData.map((data) => (
            
                <View key={data.tmid} style={styles.card}>
                    {/* <Text style={styles.title}>회원번호: {data.tmid}</Text> */}
                    <Text style={styles.text}>Name: {data.username}</Text>
                    <Text style={styles.text}>Sessions: {data.used_time}/{data.session}</Text>
                    <Text style={styles.text}>Email: {data.email}</Text>
                    <Text style={styles.text}>Phone: {data.phone_number}</Text>
                </View>
        
        ))}
    </ScrollView>
    )
}

export default NewMemberScreen

const styles = StyleSheet.create({
    container: {
        height:'auto',
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    }
});