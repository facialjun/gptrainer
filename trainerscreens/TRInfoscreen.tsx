import React from 'react'
import { View,Text, Alert, TouchableOpacity, Dimensions } from 'react-native'
import { signIn, signOut, autoSignIn, getCurrentUser, fetchAuthSession} from 'aws-amplify/auth';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
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



type TRInfoScreenNavigationProps = StackNavigationProp<
    TRMainStackParamList, 
    'TRInfo'
>;

interface TRInfoScreenProps {
    navigation: TRInfoScreenNavigationProps;
};


const TRInfoscreen:React.FunctionComponent<TRInfoScreenProps> = ({navigation}) => {


  const handleSignOut = async () => {
    try {
        // 사용자에게 로그아웃 여부를 확인하는 알림 창 표시
        Alert.alert(
            '로그아웃',
            '로그아웃 하시겠습니까?',
            [
                {
                    text: '예',
                    onPress: async () => {
                        // 로그아웃 수행
                        await signOut({ global: true });
                        console.log('Logout completed');
                        
                        // AsyncStorage 클리어
                        await AsyncStorage.clear();
                        console.log('AsyncStorage cleared');
                    
                        // AsyncStorage가 비어있는지 확인
                        const keys = await AsyncStorage.getAllKeys();
                        if (keys.length === 0) {
                            console.log('Confirmed: AsyncStorage is empty');
                        } else {
                            console.log('Remaining keys in AsyncStorage:', keys);
                        }

                        // 로그인 화면으로 네비게이션 리셋
                        navigation.reset({routes: [{name: TRMainScreens.TRlogIn}]});
                    },
                },
                {
                    text: '아니요',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    } catch (error) {
        console.log('Error signing out: ', error);
    }
};


  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity
              style={{marginTop:'5%',borderColor:'blue',borderWidth:1,width:screenWidth*0.5,height:screenHeight*0.04,justifyContent:'center',alignItems:'center'}}
              onPress={handleSignOut}>
                        <Text style={{color:'black'}}>로그아웃</Text>
          </TouchableOpacity>
    </View>
  )
}

export default TRInfoscreen