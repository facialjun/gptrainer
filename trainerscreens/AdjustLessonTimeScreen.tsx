import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View,Text, BackHandler, Dimensions, TouchableOpacity, Platform,ScrollView  } from 'react-native'
import { OpenLessonMainStackParamList } from '../stacks/Navigator';



const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const shadowStyle = Platform.select({
    ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    android: {
        elevation: 3,
    },
});



//////////////////////////////////////////////////////////////// 코드 타입정의

type AdjustLessonTimeScreenNavigationProps = StackNavigationProp<
    OpenLessonMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'AdjustLessonTime' 
>;

interface AdjustLessonTimeScreenProps {
  navigation: AdjustLessonTimeScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
};

// 필터 상태 타입
type FilterType = '매일 같아요' | '요일별로 달라요' | '평일/주말 달라요';



const AdjustLessonTimeScreen:React.FunctionComponent<AdjustLessonTimeScreenProps> = ({navigation}) => {

    const [filter, setFilter] = useState<FilterType>('매일 같아요'); // 필터 상태

    // 필터에 따른 뷰 렌더링
        const renderFilterView = () => {
            switch (filter) {
            case '매일 같아요':
                return (
                    <View style={{backgroundColor:'white',height:screenHeight*0.65,justifyContent:'flex-start'}}>
                        <View style={{width:screenWidth*0.9,height:screenHeight*0.2,borderRadius:8,borderWidth:1,borderColor:'white',...shadowStyle,backgroundColor:'white'}}>
                        <View style={{height:screenHeight*0.08,justifyContent:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'600',marginLeft:'5%'}}>수업 가능시간</Text>
                        </View>

                        <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>매일</Text>
                            <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                <TouchableOpacity 
                                style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                    <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                    <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    </View>
                    
                )

            case '요일별로 달라요':
                return (
                    <View style={{backgroundColor:'white',height:screenHeight*0.65}}>
                        <View style={{width:screenWidth*0.9,height:screenHeight*0.58,borderRadius:8,borderWidth:1,borderColor:'white',...shadowStyle,backgroundColor:'white'}}>
                            <View style={{height:screenHeight*0.08,justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'600',marginLeft:'5%'}}>수업 가능시간</Text>
                            </View>
                            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>월</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>화</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>수</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>목</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>금</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>토</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>일</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </ScrollView>
                        
                    </View>

                    </View>
                )

                
            case '평일/주말 달라요':
                    return (
                        <View style={{backgroundColor:'white',height:screenHeight*0.65}}>
                        <View style={{width:screenWidth*0.9,height:screenHeight*0.3,borderRadius:8,borderWidth:1,borderColor:'white',...shadowStyle,backgroundColor:'white'}}>
                            <View style={{height:screenHeight*0.08,justifyContent:'center'}}>
                                <Text style={{fontSize:20,fontWeight:'600',marginLeft:'5%'}}>수업 가능시간</Text>
                            </View>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>평일(월~금)</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{height:screenHeight*0.1,justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{fontSize:15,marginLeft:'5%'}}>주말</Text>
                                <View style={{flexDirection:'row',width:screenWidth*0.8,backgroundColor:'white',justifyContent:'space-between',paddingHorizontal:20,borderWidth:1,borderColor:'#4A7AFF',borderRadius:8,height:screenHeight*0.05}}>
                                    <TouchableOpacity 
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>시작: 00:00</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{justifyContent:'center',width:screenWidth*0.3,alignItems:'center'}}>
                                        <Text style={{fontWeight:'400'}}>종료: 00:00</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        </View>
                    )
                    
            }
        };

    useEffect(() => {
            const backAction = () => {
                navigation.goBack(); // 이전 화면으로 돌아가기
                return true; // 이벤트 버블링을 방지
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [navigation]); // 의존성 배열에 navigation 추가

        
    return (
        <View style={{ height:'100%',alignItems:'center' ,backgroundColor:'white',flexDirection:'column',justifyContent:'space-between'}}>
        {/* 필터 버튼 */}
        <View style={{
            flexDirection: 'row',
            marginTop:20,
            backgroundColor: 'white',
            height: screenHeight * 0.05,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: screenWidth,
            paddingHorizontal:10
            }}>
        {(['매일 같아요', '요일별로 달라요', '평일/주말 달라요'] as FilterType[]).map((type) => (
        <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            style={{
                marginHorizontal: 10,
                backgroundColor: filter === type ? '#4A7AFF' : 'transparent', // 선택된 필터는 파란색 배경
                padding: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor:  filter === type ? 'transparent':'lightgray' ,
            }}
        >
            <Text style={{ color: filter === type ? 'white' : 'black' ,fontWeight:'500'}}>
                {type} 
            </Text>
        </TouchableOpacity>
        ))}
    </View>
    
            {renderFilterView()}


        <View style={{backgroundColor:'white',width:screenWidth,alignItems:'center',height:screenHeight*0.1,justifyContent:'center'}}>
            <TouchableOpacity
            style={{width:screenWidth*0.9,backgroundColor:'#4A7AFF',justifyContent:'center',alignItems:'center',height:screenHeight*0.05,borderRadius:8}}>
                <Text style={{color:'white',fontSize:15,fontWeight:'600'}}>적용하기</Text>
            </TouchableOpacity>
        </View>

        </View>
    )
}

export default AdjustLessonTimeScreen