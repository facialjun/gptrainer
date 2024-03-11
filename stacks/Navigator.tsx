import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome';
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



export enum TRMainScreens {
    Splash = 'Splash',
    TRlogIn = 'TRlogIn',
    TRsu = 'TRsu',
    ForgotPassword ='ForgotPassword',
    NewPassword ='NewPassword',
    TRMain ='TRMain',
    TRhome = 'TRhome',
    TRReservation= 'TRReservation',
    TRChat= 'TRChat',
    TRInfo ='TRInfo'
};


export type TRMainStackParamList = {
    Splash : undefined;
    TRlogIn : undefined;
    TRsu: undefined;
    ForgotPassword: undefined;
    NewPassword: undefined;
    TRMain : undefined;
    TRhome : undefined;
    TRChat : undefined;
    TRReservation: undefined;
    TRInfo: undefined;
}

type TRMainTabParamList= {
    TRhome: undefined;
    TRChat :undefined;
    TRInfo: undefined;
    TRReservation: undefined;
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





const TRMainStack = createNativeStackNavigator<TRMainStackParamList>();
const TRMainTab = createBottomTabNavigator<TRMainTabParamList>();
const TRsignupStack = createNativeStackNavigator<TRsignupStackParamList>();




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
            <TRMainTab.Screen
                name={TRMainScreens.TRReservation}
                component={TRReservationscreen}
                options={{
                    headerShown: false,
                    title:'내 예약',
                    tabBarLabel: '내 예약',
                    tabBarIcon: ({ focused }) => (
                        focused
                        ? <Icon4 name="calendar-number-sharp" size={26} color='black' />
                        : <Icon3 name="calendar-o" size={23} color='black' />
                    )
                }}
            />

            <TRMainTab.Screen
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
            />
    
            
            <TRMainTab.Screen
                name={TRMainScreens.TRInfo}
                component={TRInfoscreen}
                options={{
                    headerShown: false,
                    title:'내 정보',
                    tabBarLabel: '내 정보',
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
            <TRMainStack.Screen name={TRMainScreens.TRhome} component={TRhomescreen} />
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






export default TRMainStackNavigator;