import React, { useState } from 'react'
import { View,Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native'
import { signIn, signOut, autoSignIn, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { TRsigninStackParamList, TRsigninScreens, MainScreens } from '../stacks/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const authConfig: ResourcesConfig['Auth'] = {
        Cognito: {
            userPoolId: 'ap-northeast-2_Ygi7yuERr',
            userPoolClientId: '27bu3ncb7rvghc0gjdt6sjfr4d'
        }
    };

    Amplify.configure({
        Auth: authConfig
    });

    cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

    type TRsigninScreenNavigationProps = StackNavigationProp<
        TRsigninStackParamList, 
        'TRsignin'
    >;

    interface TRsigninScreenProps {
        navigation: TRsigninScreenNavigationProps;
    };



const TRsigninscreen:React.FunctionComponent<TRsigninScreenProps> = ({navigation}) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

const handleSignIn = async () => {
    try {
        const { isSignedIn } = await signIn({ username, password });

        if (isSignedIn) {
            console.log("log in successful");
            navigation.navigate(MainScreens.TRmain);
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
        <KeyboardAvoidingView style={{height:screenHeight*1,backgroundColor:'white'}} behavior='padding'>
            <View style={{justifyContent: 'center',alignItems:'center',backgroundColor:'white',height:'auto'}}>
                <View style={{height: screenHeight*0.37,backgroundColor:'white',justifyContent:'center',alignItems:'baseline'}}>
                    {/* <Image source={require('../images/gymprivate.jpeg')} style={{width: 200,height: 200}} /> */}
                </View>
                <View style={{width:screenWidth,justifyContent:'center',alignItems:'center'}}>
                    <TextInput
                    style={{borderBottomWidth:0.5,width:screenWidth-48,height:screenHeight*0.05}}
                    placeholderTextColor={'gray'}
                    placeholder="이메일을 입력해주세요"
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={{borderBottomWidth:0.5,width:screenWidth-48,height:screenHeight*0.05,marginTop:'5%'}}
                    placeholderTextColor={'gray'}
                    placeholder="패스워드를 입력해주세요"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
                <View style={{height:screenHeight*0.15,width:screenWidth,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity
                    style={{borderRadius:8,backgroundColor:'#4A7AFF',height:screenHeight*0.05,width:screenWidth*0.6,justifyContent:'center',alignItems:'center',marginBottom:'10%',marginTop:24}}
                    onPress={handleSignIn}
                    >
                        <Text style={{color:'white',fontWeight:'bold'}}>트레이너 로그인</Text>
                    </TouchableOpacity>
                </View>
            
                <View style={{justifyContent:'center',alignItems:'center',height:screenHeight*0.3}}>
                    <TouchableOpacity >
                        <Text 
                        // onPress={()=>{navigation.navigate(MainScreens.ForgotPassword)}}
                        style={{fontWeight:'300',fontSize:15,color:'black'}}>비밀번호 찾기</Text>
                    </TouchableOpacity> 
                </View>
                
            </View>
            
            </KeyboardAvoidingView>
    )
}

export default TRsigninscreen