import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Ionicons';
import TRsignupscreen from '../trainerscreens/TRsignupscreen';
import TRcontraction from '../trainerscreens/TRcontraction';
import TRhomescreen from '../trainerscreens/TRhomescreen';
import TRloginscreen from '../trainerscreens/TRloginscreen';
import TRJoinMembershipscreen from '../trainerscreens/TRJoinMembershipscreen';
import TRsignup2screen from '../trainerscreens/TRsignup2screen';
import TRInfoscreen from '../trainerscreens/TRInfoscreen';
import TRChatscreen from '../trainerscreens/TRChatscreen';
import TRReservationscreen from '../trainerscreens/TRReservationscreen';
import SplashScreen from '../trainerscreens/SplashScreen';
import ForgotPasswordScreen from '../trainerscreens/ForgotPasswordscreen';
import NewPasswordScreen from '../trainerscreens/NewPasswordScreen';
import LessonRequestScreen from '../trainerscreens/LessonRequestScreen';
import LessonTodayScreen from '../trainerscreens/LessonTodayScreen';
import LessonConfirmScreen from '../trainerscreens/LessonConfirmScreen';
import AllMemberScreen from '../trainerscreens/AllMemberScreen';
import ReregisterMemberScreen from '../trainerscreens/ReregisterMemberScreen';
import AdjustLessonTimeScreen from '../trainerscreens/AdjustLessonTimeScreen';
import LogInformationSceen from '../trainerscreens/LogInformationSceen';
import LessonRuleScreen from '../trainerscreens/LessonRuleScreen';
import OpenLessonTimeScreen from '../trainerscreens/OpenLessonTimeScreen';



export enum TRMainScreens {
    Splash = 'Splash',
    TRlogIn = 'TRlogIn',
    TRsu = 'TRsu',
    ForgotPassword ='ForgotPassword',
    NewPassword ='NewPassword',
    TRMain ='TRMain',
    TRInfo ='TRInfo',
    TRhome = 'TRhome',
    TRChat= 'TRChat',
    TRInfoMain ='TRInfoMain',
    LessonRequestMain = 'LessonRequestMain',
    LessonTodayMain ='LessonTodayMain',
    LessonConfirmMain ='LessonConfirmMain',
    AllMemberMain ='AllMemberMain',
    ReregisterMemberMain='ReregisterMemberMain',
    OpenLessonMain='OpenLessonMain',
    AdjustLessonMain='AdjustLessonMain',
    LogInformationMain='LogInformationMain',
    LessonRuleMain='LessonRuleMain'
};


export type TRMainStackParamList = {
    Splash : undefined;
    TRlogIn : undefined;
    TRsu: undefined;
    ForgotPassword: undefined;
    NewPassword: undefined;
    TRMain : undefined;
    TRInfo :undefined;
    TRhome : undefined;
    TRChat : undefined;
    TRInfoMain: undefined;
    LessonRequestMain:undefined;
    LessonTodayMain:undefined;
    LessonConfirmMain:undefined;
    AllMemberMain:undefined;
    ReregisterMemberMain:undefined;
    OpenLessonMain:undefined;
    AdjustLessonMain:undefined;
    LogInformationMain:undefined;
    LessonRuleMain:undefined;
}

type TRMainTabParamList= {
    TRhome: undefined;
    TRChat :undefined;
    TRInfo: undefined;
    LessonTodayMain: undefined;
};


export enum TRsignupScreens {
    TRJoinMembership = 'TRJoinMembership',
    TRsignup ='TRsignup',
    TRsignup2 = 'TRsignup2',
    TRcontraction = 'TRcontraction',
};

export type TRsignupStackParamList = {
    TRJoinMembership :undefined;
    TRsignup : undefined;
    TRsignup2: undefined;
    TRcontraction: undefined;
};

export enum LessonRequestMainScreens {
    LessonRequest ='LessonRequest'
};

export type LessonRequestMainStackParamList = {
    LessonRequest:undefined;
};

export enum LessonTodayMainScreens {
    LessonToday ='LessonToday'
};

export type LessonTodayMainStackParamList = {
    LessonToday:undefined;
};

export enum LessonConfirmMainScreens {
    LessonConfirm ='LessonConfirm'
};

export type LessonConfirmMainStackParamList = {
    LessonConfirm:undefined;
};


export enum OpenLessonMainScreens {
    OpenLessonTime ='OpenLessonTime'
};

export type OpenLessonMainStackParamList = {
    OpenLessonTime:undefined;
};

export enum AdjustLessonMainScreens {
    AdjustLessonTime ='AdjustLessonTime'
};

export type AdjustLessonMainStackParamList = {
    AdjustLessonTime:undefined;
};

export enum AllMemberMainScreens {
    AllMember ='AllMember'
};

export type AllMemberMainStackParamList = {
    AllMember:undefined;
};

export enum ReregisterMemberMainScreens {
    ReregisterMember ='ReregisterMember'
};

export type ReregisterMemberMainStackParamList = {
    ReregisterMember:undefined;
};

export enum LogInfoMainScreens {
    LogInformation='LogInformation',
};

export type LogInfoMainStackParamList = {
    LogInformation:undefined;
};

export enum LessonRuleMainScreens {
    LessonRule='LessonRule',
};

export type LessonRuleMainStackParamList = {
    LessonRule:undefined;
};


const TRMainStack = createNativeStackNavigator<TRMainStackParamList>();
const TRMainTab = createBottomTabNavigator<TRMainTabParamList>();
const TRsignupStack = createNativeStackNavigator<TRsignupStackParamList>();
const LessonRequestMainStack = createNativeStackNavigator<LessonRequestMainStackParamList>();
const LessonTodayMainStack = createNativeStackNavigator<LessonTodayMainStackParamList>();
const LessonConfirmMainStack = createNativeStackNavigator<LessonConfirmMainStackParamList>();
const OpenLessonMainStack = createNativeStackNavigator<OpenLessonMainStackParamList>();
const AdjustLessonMainStack = createNativeStackNavigator<AdjustLessonMainStackParamList>();
const AllMemberMainStack = createNativeStackNavigator<AllMemberMainStackParamList>();
const ReregisterMainStack = createNativeStackNavigator<ReregisterMemberMainStackParamList>();
const LogInfoMainStack = createNativeStackNavigator<LogInfoMainStackParamList>();
const LessonRuleMainStack = createNativeStackNavigator<LessonRuleMainStackParamList>();



function TRMainTabNavigator(): React.ReactElement {
    return (
        <TRMainTab.Navigator
            initialRouteName={TRMainScreens.TRhome}
            screenOptions={{
                tabBarActiveTintColor: 'black', // 활성 탭 아이콘 및 라벨 색상
                tabBarInactiveTintColor: 'black', // 비활성 탭 아이콘 및 라벨 색상
            }}
            >
            <TRMainTab.Screen
                name={TRMainScreens.TRhome}
                component={TRhomescreen}
                options={{
                // headerTitleAlign: 'center',
                // headerTitle: () => (
                //         <Image 
                //             source={require('../images/logogp1.png')}
                //             style={{width:screenWidth*0.45,height:'70%'}}
                //             resizeMode='cover'
                //         />
                    
                // ),
                headerShown:false,
                    title:'홈',
                    tabBarLabel: '홈',
                    tabBarIcon: ({ focused }) => (
                        focused
                        ? <Icon4 name="home-sharp" size={23} color='black' />
                        : <Icon4 name="home-outline" size={23} color='black' />
                    )
                }}
            />
            {/* <TRMainTab.Screen
                name={TRMainScreens.LessonTodayMain}
                component={LessonTodayMainStackNavigator}
                options={{
                    headerShown: true,
                    title:'오늘 수업',
                    tabBarLabel: '오늘 수업',
                    tabBarIcon: ({ focused }) => (
                        focused
                        ? <Icon3 name="clipboard-list" size={24} color='black' />
                        : <Icon name="list-ordered" size={23} color='black' />
                    )
                }}
            /> */}

            {/* <TRMainTab.Screen
                name={TRMainScreens.TRChat}
                component={TRChatscreen}
                options={{
                    headerShown: false,
                    title:'채팅',
                    tabBarLabel: '채팅',
                    tabBarIcon: ({ focused }) => (
                        focused
                        ? <Icon4 name="chatbox-ellipses" size={25} color='black' />
                        : <Icon4 name="chatbox-ellipses-outline" size={25} color='black' />
                    )
                }}
            /> */}
    
            
            <TRMainTab.Screen
                name={TRMainScreens.TRInfo}
                component={TRInfoscreen}
                options={{
                    headerShown: false,
                    title:'프로필',
                    tabBarLabel: '프로필',
                    tabBarIcon: ({ focused,color }) => (
                        focused
                        ? <Icon4 name="person" size={23} color='black' />
                        : <Icon4 name="person-outline" size={23} color='black' />
                    )
                }}
            />
        </TRMainTab.Navigator>
    );
};

const TRMainStackNavigator: React.FunctionComponent = () => {
    return (
    <NavigationContainer>
        <TRMainStack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
            <TRMainStack.Screen name={TRMainScreens.Splash} component={SplashScreen}/>
            <TRMainStack.Screen name={TRMainScreens.TRlogIn} component={TRloginscreen}/>
            <TRMainStack.Screen name={TRMainScreens.ForgotPassword} component={ForgotPasswordScreen}/>
            <TRMainStack.Screen name={TRMainScreens.NewPassword} component={NewPasswordScreen}/>
            <TRMainStack.Screen name={TRMainScreens.TRsu} component={TRsignupStackNavigator}/>
            <TRMainStack.Screen name ={TRMainScreens.TRMain} component={TRMainTabNavigator}/>
            <TRMainStack.Screen name={TRMainScreens.LessonTodayMain} component={LessonTodayMainStackNavigator} />
            <TRMainStack.Screen name={TRMainScreens.LessonRequestMain} component={LessonRequestMainStackNavigator} />
            <TRMainStack.Screen name={TRMainScreens.LessonConfirmMain} component={LessonConfirmMainStackNavigator} />
            <TRMainStack.Screen name={TRMainScreens.AllMemberMain} component={AllMemberMainStackNavigator} />
            <TRMainStack.Screen name={TRMainScreens.ReregisterMemberMain} component={ReregisterMainStackNavigator} />
            <TRMainStack.Screen name={TRMainScreens.OpenLessonMain} component={OpenLessonMainStackNavigator} />
            <TRMainStack.Screen name={TRMainScreens.AdjustLessonMain} component={AdjustLessonMainStackNavigator} />
            <TRMainStack.Screen name={TRMainScreens.LogInformationMain} component={LogInfoMainStackNavigator} />
            <TRMainStack.Screen name={TRMainScreens.LessonRuleMain} component={LessonRuleMainStackNavigator} />
        </TRMainStack.Navigator>
    </NavigationContainer> 
    );
}


const TRsignupStackNavigator: React.FunctionComponent = () => {
    return (
            <TRsignupStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <TRsignupStack.Screen name={TRsignupScreens.TRJoinMembership} component={TRJoinMembershipscreen}/>
                <TRsignupStack.Screen name={TRsignupScreens.TRsignup} component={TRsignupscreen}/>
                <TRsignupStack.Screen name={TRsignupScreens.TRsignup2} component={TRsignup2screen}/>
                <TRsignupStack.Screen name={TRsignupScreens.TRcontraction} component={TRcontraction}/>
            </TRsignupStack.Navigator>
    );
}

const LessonRequestMainStackNavigator: React.FunctionComponent = () => {
    return (
            <LessonRequestMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <LessonRequestMainStack.Screen name={LessonRequestMainScreens.LessonRequest} component={LessonRequestScreen} options={{headerShown:true}}/>
            </LessonRequestMainStack.Navigator>
    );
}

const LessonTodayMainStackNavigator: React.FunctionComponent = () => {
    return (
            <LessonTodayMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <LessonTodayMainStack.Screen name={LessonTodayMainScreens.LessonToday} component={LessonTodayScreen} options={{headerShown:true}}/>
            </LessonTodayMainStack.Navigator>
    );
}

const LessonConfirmMainStackNavigator: React.FunctionComponent = () => {
    return (
            <LessonConfirmMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <LessonConfirmMainStack.Screen name={LessonConfirmMainScreens.LessonConfirm} component={LessonConfirmScreen} options={{headerShown:true}}/>
                
            </LessonConfirmMainStack.Navigator>
    );
}



const OpenLessonMainStackNavigator: React.FunctionComponent = () => {
    return (
            <OpenLessonMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <OpenLessonMainStack.Screen name={OpenLessonMainScreens.OpenLessonTime} component={OpenLessonTimeScreen} options={{headerShown:true,title: '수업시간 설정하기'}}/>
            </OpenLessonMainStack.Navigator>
    );
}

const AdjustLessonMainStackNavigator: React.FunctionComponent = () => {
    return (
            <AdjustLessonMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <AdjustLessonMainStack.Screen name={AdjustLessonMainScreens.AdjustLessonTime} component={AdjustLessonTimeScreen} options={{headerShown:true,title: '수업시간 수정하기'}}/>
            </AdjustLessonMainStack.Navigator>
    );
}

const AllMemberMainStackNavigator: React.FunctionComponent = () => {
    return (
            <AllMemberMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <AllMemberMainStack.Screen name={AllMemberMainScreens.AllMember} component={AllMemberScreen} options={{headerShown:true}}/>
                
            </AllMemberMainStack.Navigator>
    );
}

const ReregisterMainStackNavigator: React.FunctionComponent = () => {
    return (
            <ReregisterMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <ReregisterMainStack.Screen name={ReregisterMemberMainScreens.ReregisterMember} component={ReregisterMemberScreen} options={{headerShown:true}}/>

            </ReregisterMainStack.Navigator>
    );
}

const LogInfoMainStackNavigator: React.FunctionComponent = () => {
    return (
            <LogInfoMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <LogInfoMainStack.Screen name={LogInfoMainScreens.LogInformation} component={LogInformationSceen} options={{headerShown:true,title: '내 정보'}}/>
            </LogInfoMainStack.Navigator>
    );
}

const LessonRuleMainStackNavigator: React.FunctionComponent = () => {
    return (
            <LessonRuleMainStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <LessonRuleMainStack.Screen name={LessonRuleMainScreens.LessonRule} component={LessonRuleScreen} options={{headerShown:true,title: '내 정보'}}/>
            </LessonRuleMainStack.Navigator>
    );
}






export default TRMainStackNavigator;