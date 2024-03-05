import React from 'react'
import { View,Text } from 'react-native'
import { signIn, signOut, autoSignIn, getCurrentUser, fetchAuthSession, } from 'aws-amplify/auth';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

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

const TRsignupscreen = () => {
    return (
        <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
            <Text>
                TRsignupscreen
            </Text>
        </View>
    )
}

export default TRsignupscreen