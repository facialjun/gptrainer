import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TRsignupscreen from '../trainerscreens/TRsignupscreen';
import TRsigninscreen from '../trainerscreens/TRsigninscreen';
import TRcontraction from '../trainerscreens/TRcontraction';
import TRhomescreen from '../trainerscreens/TRhomescreen';



export enum MainScreens {
    TRsu = 'TRsu',
    TRsi = 'TRsi',
    TRmain ='TRmain'
};


export type MainStackParamList = {
    TRsu: undefined;
    TRsi :undefined;
    TRmain : undefined;
}


export enum TRsignupScreens {
    TRsignup ='TRsignup',
    TRcontraction = 'TRcontraction',
};

export type TRsignupStackParamList = {
    TRsignup : undefined;
    TRcontraction: undefined;
};

export enum TRsigninScreens {
    TRsignin ='TRsignin',
};

export type TRsigninStackParamList = {
    TRsignin : undefined;
};






const MainStack = createNativeStackNavigator<MainStackParamList>();
// const MainTab = createBottomTabNavigator<MainTabParamList>();

const TRsignupStack = createNativeStackNavigator<TRsignupStackParamList>();
const TRsigninStack = createNativeStackNavigator<TRsigninStackParamList>();






// function MainTabNavigator(): React.ReactElement {
//     return (
//         <MainTab.Navigator
//             initialRouteName={MainScreens.Home}
//             screenOptions={{
//                 tabBarActiveTintColor: 'black', // 활성 탭 아이콘 및 라벨 색상
//                 tabBarInactiveTintColor: 'black', // 비활성 탭 아이콘 및 라벨 색상
//             }}
//             // tabBarStyle={{ backgroundColor:'white',borderRadius:10,justifyContent:'center',alignItems:'center',height:screenHeight*0.055}}
//             >
//             <MainTab.Screen
//                 name={MainScreens.Home}
//                 component={HomeScreen}
//                 options={{
//                 headerTitleAlign: 'center',
//                 headerTitle: () => (
//                         <Image 
//                             source={require('../images/logogp1.png')}
//                             style={{width:screenWidth*0.45,height:'70%'}}
//                             resizeMode='cover'
//                         />
                    
//                 ),
//                     title:'홈',
//                     tabBarLabel: '홈',
//                     tabBarIcon: ({ focused }) => (
//                         focused
//                         ? <Icon4 name="home-sharp" size={23} color='black' />
//                         : <Icon4 name="home-outline" size={23} color='black' />
//                     )
//                 }}
//             />
//             <MainTab.Screen
//                 name={MainScreens.MyReservation}
//                 component={MyReservationScreen}
//                 options={{
//                     headerShown: false,
//                     title:'내 예약',
//                     tabBarLabel: '내 예약',
//                     tabBarIcon: ({ focused }) => (
//                         focused
//                         ? <Icon3 name="calendar-check-o" size={23} color='black' />
//                         : <Icon3 name="calendar-o" size={23} color='black' />
//                     )
//                 }}
//             />
    
            
//             <MainTab.Screen
//                 name={MainScreens.MyInfo}
//                 component={MyInfoScreen}
//                 options={{
//                     headerStyle: {
//                         height: 60, // 헤더의 높이 값을 원하는 크기로 설정
//                     },
//                     headerTitle: '',
//                     headerTitleAlign: 'center',
//                     title:'내 정보',
//                     tabBarLabel: '내 정보',
//                     tabBarIcon: ({ focused,color }) => (
//                         focused
//                         ? <Icon name="user-check" size={23} color='black' />
//                         : <Icon2 name="user" size={23} color='black' />
//                     )
//                 }}
//             />
//         </MainTab.Navigator>
//     );
// };

const MainStackNavigator: React.FunctionComponent = () => {
    return (
    <NavigationContainer>
        <MainStack.Navigator initialRouteName="TRmain" screenOptions={{headerShown: false}}>
            <MainStack.Screen name={MainScreens.TRsu} component={TRsignupStackNavigator}/>
            <MainStack.Screen name={MainScreens.TRsi} component={TRsigninStackNavigator}/>
        </MainStack.Navigator>
    </NavigationContainer>
    );
}


const TRsignupStackNavigator: React.FunctionComponent = () => {
    return (
            <TRsignupStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <TRsignupStack.Screen name="TRsignup" component={TRsignupscreen}/>
            </TRsignupStack.Navigator>
    );
}


const TRsigninStackNavigator: React.FunctionComponent = () => {
    return (
            <TRsigninStack.Navigator screenOptions={{ headerShown : false, headerBackTitleVisible: false}}>
                <TRsigninStack.Screen name="TRsignin" component={TRsigninscreen}/>
            </TRsigninStack.Navigator>
    );
}




export default MainStackNavigator;