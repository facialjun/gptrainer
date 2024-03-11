import React, { useEffect, useState } from 'react'
import { View,Text, Dimensions,Modal, Button, BackHandler, Alert, TextInput, TouchableOpacity} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { signIn, signOut, autoSignIn, getCurrentUser, fetchAuthSession} from 'aws-amplify/auth';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRMainScreens, TRMainStackParamList } from '../stacks/Navigator';

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

/////////////////////////////////////////////////////////////////


type TRlogInScreenNavigationProps = StackNavigationProp<
    TRMainStackParamList, 
    'TRlogIn'
>;

interface TRlogInScreenProps {
    navigation: TRlogInScreenNavigationProps;
};


/////////////////////////////////////////////////////////////////


const TRloginscreen: React.FunctionComponent<TRlogInScreenProps> = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
    try {
        const { isSignedIn } = await signIn({ username, password });

        if (isSignedIn) {
            console.log("log in successful");
            navigation.navigate(TRMainScreens.TRMain)
        }
    } catch (error) {
    console.log('Error signing in:', error);
        if (error.message.includes('NotAuthorizedException') || error.message.includes('Incorrect username or password.')) {
            Alert.alert("로그인 실패", "아이디나 비밀번호가 잘못되었습니다!");
        } else if (error.message.includes('UserNotFoundException') || error.message.includes('User does not exist.')) {
            Alert.alert("로그인 실패", "존재하지 않는 사용자입니다.");
        } else {
            Alert.alert("로그인 실패", "정보를 모두 입력해주세요!");
        }
    }
};


    
    return (
    <View style={{height:'100%', justifyContent:'center', alignItems:'center', padding: 20}}>
            <TextInput
                style={{height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10}}
                placeholder="이메일"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={{height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10}}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity 
            onPress={handleSignIn}
            style={{borderColor:'blue',borderWidth:1,width:screenWidth*0.3,height:screenHeight*0.04,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'black'}}>트레이너 로그인</Text>
            </TouchableOpacity>

            <View style={{marginTop:'5%'}}>
                <TouchableOpacity 
                        onPress={()=>{navigation.navigate(TRMainScreens.TRsu)}}
                        style={{borderColor:'blue',borderWidth:1,width:screenWidth*0.3,height:screenHeight*0.04,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black'}}>회원가입</Text>
                </TouchableOpacity>
        
            </View>
                
            <View style={{marginTop:'5%'}}>
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate(TRMainScreens.ForgotPassword)}}
                    style={{borderColor:'blue',borderWidth:1,width:screenWidth*0.5,height:screenHeight*0.04,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'black'}}>forgot password?</Text>
                </TouchableOpacity>            
            </View>

        </View>
        
    )
}

export default TRloginscreen