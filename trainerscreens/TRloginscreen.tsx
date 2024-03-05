import React, { useEffect, useState } from 'react'
import { View,Text, Dimensions,Modal, Button, BackHandler} from 'react-native'
import { MainScreens, MainStackParamList, TRmainScreens } from '../stacks/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import config from '../config'
import LottieView from 'lottie-react-native';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = config.SERVER_URL;

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

type TRlogInScreenNavigationProps = StackNavigationProp<
    MainStackParamList, 
    'TRmain'
>;

interface TRlogInScreenProps {
    navigation: TRlogInScreenNavigationProps;
};

const TRloginscreen: React.FunctionComponent<TRlogInScreenProps> = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(true);
    
    useEffect(() => {
        const backAction = () => {
                navigation.popToTop();
                return true; 
        };

        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [navigation])

    
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                        <Text style={{ marginBottom: 15, textAlign: "center" }}>
                            계정이 있으신가요? 아니면 새로 가입하시겠습니까?
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
                            <Button
                            title="회원가입"
                            onPress={() => {
                                navigation.replace(TRmainScreens.TRsignup)
                            }}
                        />
                        <Button
                            title="로그인"
                            onPress={() => {
                                navigation.replace(TRmainScreens.TRsignin)
                            }}
                        />

                        </View>
                        
                    </View>
                </View>
            </Modal>
            <Text>
                TRloginscreen
            </Text>
        </View>
    )
}

export default TRloginscreen