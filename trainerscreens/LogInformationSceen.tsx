import React from 'react'
import { View,Text, Alert, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native'
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import config from '../config'
import { StackNavigationProp } from '@react-navigation/stack';
import { LogInfoMainScreens, LogInfoMainStackParamList, TRMainScreens } from '../stacks/Navigator';
import { signIn, signOut, autoSignIn, getCurrentUser, fetchAuthSession} from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BASE_URL = config.SERVER_URL;

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


type LogInfoMainScreenNavigationProps = StackNavigationProp<
    LogInfoMainStackParamList,
    'LogInformation'
>;

interface LogInfoScreenProps {
    navigation: LogInfoMainScreenNavigationProps;
};



const LogInformationSceen:React.FunctionComponent<LogInfoScreenProps> = ({navigation}) => {

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
        <ScrollView style={{flex:1}}>
        <View style={{height:'auto'}}>
            <View style={{height:screenHeight,width:screenWidth}}>
                <View style={{backgroundColor:'white',width:screenWidth,height:screenHeight*0.1,justifyContent:'center',alignItems:'flex-start',borderBottomColor:'lightgray',borderBottomWidth:0.5}}>
                    <Text style={{fontSize:18, fontWeight:'bold',marginLeft:'5%'}}>
                        가입정보
                    </Text>
                </View>
                <View style={{backgroundColor:'white',width:screenWidth,height:screenHeight*0.08,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'600',marginLeft: '5%'}}>이름 </Text>
                    {/* <Text style={{fontSize:15,fontWeight:'600',marginRight: '7%',color:'gray'}}>{userData?.username}</Text> */}
                </View>

                <View style={{backgroundColor:'white',width:screenWidth,height:screenHeight*0.08,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'600',marginLeft: '5%'}}>이메일 </Text>
                    {/* <Text style={{fontSize:15,fontWeight:'600',marginRight: '7%',color:'gray'}}>{userData?.email}</Text> */}
                </View>

                <View style={{backgroundColor:'white',width:screenWidth,height:screenHeight*0.08,justifyContent:'space-between',alignItems:'center',flexDirection:'row',borderBottomColor:'lightgray',borderBottomWidth:0.5}}>
                    <Text style={{fontSize:15,fontWeight:'600',marginLeft: '5%'}}>생일 </Text>
                    {/* <Text style={{fontSize:15,fontWeight:'600',marginRight: '7%',color:'gray'}}>{userData?.birthday}</Text> */}
                </View>

                <View style={{backgroundColor:'white',width:screenWidth,height:screenHeight*0.1,justifyContent:'center',alignItems:'flex-start',marginTop:'3%',borderBottomColor:'lightgray',borderBottomWidth:0.5,borderTopColor:'lightgray'}}>
                    <Text style={{fontSize:18, fontWeight:'bold',marginLeft:'5%'}}>
                        알림
                    </Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity 
                    // onPress={() => Linking.openURL('https://sites.google.com/view/using-gymprivate/%ED%99%88')}
                    style={{backgroundColor:'white',width:screenWidth,height:screenHeight*0.08,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                        <Text style={{fontSize:15,fontWeight:'600',marginLeft: '5%'}}>이용약관</Text>
                        <View style={{backgroundColor:'white',alignItems:'flex-end',marginRight:'5%'}}>
                                <AntDesign name="right" size={17} color="#131515" style={{marginLeft:'auto',fontWeight:'bold'}} />
                        </View>
                    </TouchableOpacity>
                    
                </View>

                {/* <View style={{backgroundColor:'white',width:screenWidth,height:screenHeight*0.08,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'600',marginLeft: '5%'}}>앱 버전 </Text>
                    <Text style={{fontSize:15,fontWeight:'600',marginRight: '5%',color:'gray'}}>v{getAppVersion()} </Text>
                </View> */}

                <View style={{justifyContent:'center',alignItems:'center',top:'6%'}}>
                    <TouchableOpacity
                        style={{
                            height:48,
                            width:screenWidth*0.8,
                            backgroundColor:'#4A7AFF',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:15,
                        }}
                        onPress={handleSignOut}>
                        <Text style={{color:'rgba(255,255,255,1)',fontWeight:'bold',fontSize:15}}>로그아웃</Text>
                    </TouchableOpacity>
                </View>

                <View style={{justifyContent:'center',alignItems:'center',top:'10%'}}>
                    <TouchableOpacity
                        style={{
                            height:screenWidth*0.12,
                            width:screenWidth*0.8,
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'row',
                            borderRadius:15,
                        }}
                        // onPress={() => setDeleteModal(true)}
                        >
                            <View style={{justifyContent:'flex-start',width:screenWidth*0.6}}>
                                <Text style={{color:'#868E96',fontWeight:'300',fontSize:14}}>더 이상 앱을 이용하지 않으시나요?</Text>
                            </View>
                        <AntDesign name="right" size={13} color='#868E96'/>
                    </TouchableOpacity>

                    {/* 모달 */}

            {/* <Modal
                animationType="none"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => {
                    setDeleteModal(!deleteModal);
                }}>
                <View style={{height:'100%',width:screenWidth,backgroundColor: 'rgba(0, 0, 0, 0.5)',justifyContent:'center',alignItems:'center'}}>
                    <View style={{height:screenHeight*0.3,width:screenWidth*0.8,backgroundColor:'white',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                        <View style={{height:screenHeight*0.15,alignItems:'center'}}>
                            <Text style={{fontSize:17,fontWeight:'400'}}>짐프라이빗 앱에서 회원탈퇴 하시겠어요?</Text>
                            <Text style={{fontSize:13,fontWeight:'400',color:'gray',marginTop:'3%'}}>⛔️ 회원 탈퇴 후, 서비스를 이용하시려면</Text>
                            <Text style={{fontSize:13,fontWeight:'400',color:'gray'}}>신규 회원으로 가입 후 이용해야합니다.</Text>
                        </View>
                        
                        <View style={{flexDirection: "row",justifyContent: "space-around",width: "80%"}}>
                            <TouchableOpacity
                                style={{borderRadius: 15,width:'40%',height:48, backgroundColor:'#4A7AFF',justifyContent:'center',alignItems:'center'}}
                                onPress={() => setDeleteModal(!deleteModal)}>
                                <Text style={{color: "white",fontWeight: "bold",fontSize:17}}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{borderRadius: 15,width:'40%',height:48, backgroundColor:'#F1F3F5',justifyContent:'center',alignItems:'center',borderColor:'#ADB5BD',borderWidth:1.5}}
                                onPress={onDeleteConfirm}>
                                <Text style={{color: "#ADB5BD",fontWeight: "bold",fontSize:17}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal> */}
                </View>

            </View>
        

        
        </View>
    </ScrollView>
    )
}

export default LogInformationSceen