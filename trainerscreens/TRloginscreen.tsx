import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Modal, Button, BackHandler, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image , StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { signIn, signOut, autoSignIn, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRMainScreens, TRMainStackParamList } from '../stacks/Navigator';
import { height } from './TRhomescreen';

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

type TRlogInScreenNavigationProps = StackNavigationProp<
    TRMainStackParamList,
    'TRlogIn'
>;

interface TRlogInScreenProps {
    navigation: TRlogInScreenNavigationProps;
}

const TRloginscreen: React.FunctionComponent<TRlogInScreenProps> = ({ navigation }) => {

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
        <SafeAreaView style={{ flex:1,backgroundColor:'white'}}>
            <KeyboardAvoidingView  behavior='padding'>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: 'auto', marginTop: 24 }}>
                    <View style={{ height: screenHeight * 0.27, backgroundColor: 'white', justifyContent: 'center', alignItems: 'baseline' }}>
                        <Image source={require('../images/gymprivate.jpeg')} style={{ width: 200, height: 200 }} />
                    </View>
                    <View style={{ width: screenWidth, height: screenHeight * 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                        style={{borderBottomWidth:0.5,width:screenWidth-48,height:screenHeight*0.065}}
                        placeholderTextColor={'gray'}
                        placeholder="이메일을 입력해주세요"
                        onChangeText={(text) => setUsername(text)}
                    />
                        <TextInput
                        style={{borderBottomWidth:0.5,width:screenWidth-48,height:screenHeight*0.065,marginTop:'8%'}}
                        placeholderTextColor={'gray'}
                        placeholder="패스워드를 입력해주세요"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                    </View>
                    <View style={{ height: screenHeight * 0.1, width: screenWidth, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={{ borderRadius: 8, backgroundColor: '#4A7AFF', height: screenHeight * 0.06, width: screenWidth - 48, justifyContent: 'center', alignItems: 'center', marginBottom: '10%', marginTop: 24 }}
                            onPress={handleSignIn}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>트레이너로그인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: screenHeight * 0.25, width: screenWidth, alignItems: 'center', paddingHorizontal: 24 }}>
                        <View>
                            <TouchableOpacity
                                style={{ height: 48, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text
                                    onPress={() => { navigation.navigate(TRMainScreens.ForgotPassword) }}
                                    style={{ fontWeight: '200', fontSize: 15, color: 'gray' }}>비밀번호를 잊으셨나요?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginRight: '5%' }}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate(TRMainScreens.TRsu) }}
                                style={{height:48,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{ fontWeight: '200', fontSize: 15, color: 'gray' }}>회원가입</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default TRloginscreen;



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