import { fetchAuthSession } from '@aws-amplify/auth';
import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet,Image, Dimensions, BackHandler, Alert, Platform, Linking} from 'react-native'
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { StackNavigationProp } from '@react-navigation/stack';
import { TRMainScreens, TRMainStackParamList } from '../stacks/Navigator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import config from '../config'
import getAppVersion from '../version';

const BASE_URL = config.SERVER_URL;

type SplashScreenNavigationProps = StackNavigationProp<
    TRMainStackParamList, 
    'Splash'
>;

interface SplashScreenProps {
    navigation: SplashScreenNavigationProps;
};


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


const authConfig: ResourcesConfig['Auth'] = {
        Cognito: {
            userPoolId: 'ap-northeast-2_qpnef51FU',
            userPoolClientId: '7rk4cvstuhuknuqgvadt2gkdsf'
        }
    };

    Amplify.configure({
        Auth: authConfig
    });

    cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);


const SplashScreen:React.FunctionComponent<SplashScreenProps> = ({navigation}) => {

    useEffect(() => {
    console.log("현재 앱 버전:", getAppVersion());

    const backAction = () => true; // 이 함수가 true를 반환하면 기본 동작을 수행하지 않음

    // 앱 버전 확인 및 업데이트 확인
    const checkForUpdates = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/Tapi/version`, {
            headers: { 'App-Version': getAppVersion() },
            });
            const { updateRequired, latestVersion, isMandatory, description } = response.data;
            console.log(response.data);

            if (getAppVersion() < latestVersion) {
            const handleUpdate = () => {
                const storeUrl = Platform.select({
                ios: `itms-apps://apps.apple.com/app/id6478826277`,
                android: `market://details?id=com.seung980428.GP`,
                });
                Linking.openURL(storeUrl).catch(err => console.error('An error occurred', err));
            };

            const alertOptions = [
                {
                text: '업데이트',
                onPress: () => {
                    handleUpdate();
                },
                },
            ];

            if (updateRequired === 0) {
                alertOptions.push({ text: '나중에', onPress: () => handleAutoSignIn() });
            }

            Alert.alert(
                '새로운 업데이트가 있습니다',
                `${description}` ,
                alertOptions,
                { cancelable: false },
            );
            } else {
            handleAutoSignIn();
            }
        } catch (error) {
            console.error('업데이트 확인 실패:', error);
            handleAutoSignIn();
        }
        };


    checkForUpdates();

    return () => {
        // 컴포넌트가 언마운트될 때 BackHandler 이벤트 리스너 제거
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
}, []);



    useEffect(()=>{
        console.log(BASE_URL);
    });

    const handleAutoSignIn = async () => {

    try {
        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        console.log(accessToken, idToken);
        const currentSession = await fetchAuthSession();

    if (currentSession && currentSession.tokens) {
        console.log('Auto Sign-In Successful');
        
        const userData = {
            logId: idToken.payload['cognito:username'],
            username: idToken.payload.name,
            email: idToken.payload.email,
            birthday: idToken.payload.birthdate,
            phoneNumber:idToken.payload.phone_number
        };

        axios.post(`${BASE_URL}/Tuser`, userData)
            .then(response => {
                console.log(response.data);
            
                    AsyncStorage.setItem('logId',JSON.stringify(userData.logId));
                    AsyncStorage.setItem('username', JSON.stringify(userData.username));
                    AsyncStorage.setItem('email', JSON.stringify(userData.email));
                    AsyncStorage.setItem('birthday', JSON.stringify(userData.birthday));
                    AsyncStorage.setItem('phoneNumber', JSON.stringify(userData.phoneNumber));

                    console.log(userData.logId,userData.username)
            })
            .catch(error => {
        // 에러 발생 시 처리
        console.error('Error sending user data to server:', error);
        if (error.response) {
            // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답한 경우
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // 요청이 이루어졌으나 응답을 받지 못한 경우
            console.log(error.request);
        } else {
            // 요청을 설정하는 중에 문제가 발생한 경우
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
    const timer = setTimeout(() => {
            navigation.navigate(TRMainScreens.TRMain)
        }, 1500);

        return () => clearTimeout(timer);
        
}    
    } 
    catch (error) {
        console.log('Auto Sign-In error:', error);   
        const timer = setTimeout(() => {
            navigation.replace(TRMainScreens.TRlogIn)
        }, 3000);
        return () => clearTimeout(timer);
    }
    };


    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <LottieView
                source={require('../src/lottie/loading.json')}
                style={{width:100,height:100}}
                autoPlay
                loop
            />
    </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent:'center',
    alignItems:'center'
},
gymIcon: {
    width:screenWidth,
    height:screenWidth,  
},


});