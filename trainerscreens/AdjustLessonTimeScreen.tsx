import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View,Text, BackHandler, Dimensions, TouchableOpacity, Platform,ScrollView,Alert ,StyleSheet } from 'react-native'
import { AdjustLessonMainStackParamList, TRMainScreens } from '../stacks/Navigator';
import Icon from 'react-native-vector-icons/AntDesign'; 
import { adjustLessonTimes } from '../lessonTime/AdjustLessonTime'
import { diffWeekLessonTimes } from '../lessonTime/WeekendTime';
import TimePicker from '../timePicker/TimePicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config'
import uuid from 'react-native-uuid';
import { height, width} from './TRhomescreen';


const BASE_URL = config.SERVER_URL;



const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;




//////////////////////////////////////////////////////////////// 코드 타입정의

type AdjustLessonTimeScreenNavigationProps = StackNavigationProp<
    AdjustLessonMainStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던 HomeStackParamList
    'AdjustLessonTime' 
>;

interface AdjustLessonTimeScreenProps {
  navigation: AdjustLessonTimeScreenNavigationProps; // 네비게이션 속성에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
};

// 필터 상태 타입
type FilterType = '매일 같아요' 
// | '요일별로 달라요' | '평일/주말 달라요';





const AdjustLessonTimeScreen:React.FunctionComponent<AdjustLessonTimeScreenProps> = ({navigation}) => {

    const [filter, setFilter] = useState<FilterType>('매일 같아요'); // 필터 상태
    const [allDayLessonTimes, setAllDayLessonTimes] = useState([]);
    const { lessonTimes, addLessonTime, removeLessonTime, setLessonTimes } = adjustLessonTimes();
    const { weekendLessonTimes, addWeekendLessonTime, removeWeekendLessonTime, setWeekendLessonTimes } = diffWeekLessonTimes();
    // const diffWeekDays = ['평일','주말'];
    const [selectedStartTime, setSelectedStartTime] = useState('00:00');
    const [selectedEndTime, setSelectedEndTime] = useState('00:00');
    const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);
    const [editingTimeSlotId, setEditingTimeSlotId] = useState(null); // 편집 중인 시간 슬롯 ID
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const [currentEditing, setCurrentEditing] = useState({ day: '', id: null, type: '' });
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [allDayHasData, setAllDayHasData] = useState(false);
    const [weeklyDayHasData, setWeeklyDayHasData] = useState(false);  
    const [diffDayHasData, setDiffDayHasData] = useState(false);  
    const [dbAllDayLessonTimes, setDbAllDayLessonTimes] = useState([]);
    const [dbWeeklyDayLessonTimes, setDbWeeklyDayLessonTimes] = useState([]);
    const [dbDiffDayLessonTimes, setDbDiffDayLessonTimes] = useState([]);


// useEffect(() => {
//     checkAndSetFilter();
// }, [allDayHasData, weeklyDayHasData, diffDayHasData]);  // 상태가 변경될 때마다 checkAndSetFilter 호출

// const checkAndSetFilter = () => {
//     if (allDayHasData) {
//         setFilter('매일 같아요');
//         console.log(1)
//     } else if (weeklyDayHasData) {
//         setFilter('요일별로 달라요');
//         console.log(2)
//     } else if (diffDayHasData) {
//         setFilter('평일/주말 달라요');
//         console.log(3)
//     }
// };



useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
            // AsyncStorage에서 logId 가져오기
            let logId = await AsyncStorage.getItem('logId');
            console.log(logId)
            if (logId) {
                logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거

                // logId를 사용하여 사용자 데이터 가져오기
                const response = await axios.get(`${BASE_URL}/Tuser/${logId}`);
                if (response.status === 200) {
                    setUserData(response.data);
                    console.log('Fetched User Data:', response.data);
                }
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
}, []);

useEffect(() => {
    // DB에서 시간 정보를 가져오는 로직
    const fetchAllDayLessonTimes = async () => {
    setIsLoading(true);
    try {
        let logId = await AsyncStorage.getItem('logId');
        if (logId) {
            logId = logId.replace(/^['"](.*)['"]$/, '$1');
            const response = await axios.get(`${BASE_URL}/allDayAvailable_times`, {
                params: {
                    logId: logId,
                }
            });
            if (response.status === 200 && response.data.length > 0) {
                const fetchedTimes = response.data.map(({ id, start_time, end_time, day_of_week }) => ({
                    id: id,
                    startTime: start_time,
                    endTime: end_time,
                    dayOfWeek: day_of_week
                }));
                setDbAllDayLessonTimes(fetchedTimes);
                // 여기서 allDayHasData를 설정합니다.
                    setAllDayHasData(response.data.some(item => item.day_of_week === 'All'));
                    console.log("매일",allDayHasData)
            }
            else {
                    setAllDayHasData(false); // 데이터가 없으면 false로 설정
                }
                
        }
    } catch (error) {
        console.log('Error fetching all day lesson times:', error);
    } finally {
        setIsLoading(false);
    }
};


    fetchAllDayLessonTimes();
    
}, []);


// useEffect(() => {
//     const fetchWeeklyDayLessonTimes = async () => {
//         setIsLoading(true);
//         try {
//             let logId = await AsyncStorage.getItem('logId');
//             if (logId) {
//                 logId = logId.replace(/^['"](.*)['"]$/, '$1');
//                 const response = await axios.get(`${BASE_URL}/weeklyDayAvailable_times`, {
//                     params: { logId: logId }
//                 });
//                 if (response.status === 200 && response.data) {
//                     const weekDays = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
//                     const sortedTimes = response.data.reduce((acc, current) => {
//                         const day = current.day_of_week;
//                         if (!acc[day]) {
//                             acc[day] = [];
//                         }
//                         acc[day].push({
//                             id: current.id,
//                             startTime: current.start_time,
//                             endTime: current.end_time,
//                             dayOfWeek: day
//                         });
//                         return acc;
//                     }, {});
//                     setDbWeeklyDayLessonTimes(sortedTimes);
//                     console.log(sortedTimes);
//                     // 여기서 weeklyDayHasData를 설정합니다.
//                     setWeeklyDayHasData(response.data.some(item => weekDays.includes(item.day_of_week)));
//                     console.log("요일별",weeklyDayHasData)
//                 } else {
//                     setWeeklyDayHasData(false); // 데이터가 없으면 false로 설정
//                 }
                
//             }
//         } catch (error) {
//             console.log('Error fetching weekly day lesson times:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     fetchWeeklyDayLessonTimes();
    
// }, []);

// useEffect(() => {
//     const fetchDiffDayLessonTimes = async () => {
//         setIsLoading(true);
//         try {
//             let logId = await AsyncStorage.getItem('logId');
//             if (logId) {
//                 logId = logId.replace(/^['"](.*)['"]$/, '$1');
//                 const response = await axios.get(`${BASE_URL}/diffDayAvailable_times`, {
//                     params: { logId: logId }
//                 });
//                 if (response.status === 200 && response.data) {
//                     const weekDays = ['평일', '주말'];
//                     const sortedTimes = response.data.reduce((acc, current) => {
//                         const day = current.day_of_week;
//                         if (!acc[day]) {
//                             acc[day] = [];
//                         }
//                         acc[day].push({
//                             id: current.id,
//                             startTime: current.start_time,
//                             endTime: current.end_time,
//                             dayOfWeek: day
//                         });
//                         return acc;
//                     }, {});
//                     setDbDiffDayLessonTimes(sortedTimes);
//                     console.log(sortedTimes);
//                    // 여기서 weeklyDayHasData를 설정합니다.
//                     setDiffDayHasData(response.data.some(item => weekDays.includes(item.day_of_week)));
//                     console.log("평주",diffDayHasData)
//                 } else {
//                     setDiffDayHasData(false); // 데이터가 없으면 false로 설정
//                 }
                
//             }
//         } catch (error) {
//             console.log('Error fetching weekly day lesson times:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     fetchDiffDayLessonTimes();
    
// }, []);






const removeAllDayLessonTimeFromDb = async (id, startTime, endTime) => {
    let logId = await AsyncStorage.getItem('logId');
    if (logId){
        logId = logId.replace(/^['"](.*)['"]$/, '$1');
        console.log(logId);
        console.log(startTime, endTime);

        try {
            await axios.delete(`${BASE_URL}/allDayAvailable_times/${logId}/${id}`);
            // 성공적으로 삭제된 후 UI 업데이트를 위해 상태를 재조정합니다.
            const filteredTimes = dbAllDayLessonTimes.filter(item => item.id !== id);
            setDbAllDayLessonTimes(filteredTimes);
        } catch (error) {
            console.error('Error deleting lesson time:', error);
            // 에러 처리 로직 (예: 사용자에게 알림 표시)
        }
    } 
};

// const removeWeeklyDayLessonTimeFromDb = async (day, id, startTime, endTime) => {
//     let logId = await AsyncStorage.getItem('logId');
//     if (logId){
//         logId = logId.replace(/^['"](.*)['"]$/, '$1');
//         console.log(logId);
//         console.log(startTime, endTime);

//         try {
//             await axios.delete(`${BASE_URL}/weeklyDayAvailable_times/${logId}/${id}`);
//             // 요일별 배열 접근 및 필터링
//             if (dbWeeklyDayLessonTimes && Array.isArray(dbWeeklyDayLessonTimes[day])) {
//                 const filteredTimes = dbWeeklyDayLessonTimes[day].filter(item => item.id !== id);
//                 setDbWeeklyDayLessonTimes({
//                     ...dbWeeklyDayLessonTimes,
//                     [day]: filteredTimes
//                 });
//             } else {
//                 console.error('dbWeeklyDayLessonTimes[day] is not an array or does not exist.');
//             }
//         } catch (error) {
//             console.error('Error deleting lesson time:', error);
//         }
//     } 
// };

// const removeDiffDayLessonTimeFromDb = async (day, id, startTime, endTime) => {
//     let logId = await AsyncStorage.getItem('logId');
//     if (logId){
//         logId = logId.replace(/^['"](.*)['"]$/, '$1');
//         console.log(logId);
//         console.log(startTime, endTime);

//         try {
//             await axios.delete(`${BASE_URL}/diffDayAvailable_times/${logId}/${id}`);
//             // 요일별 배열 접근 및 필터링
//             if (dbDiffDayLessonTimes && Array.isArray(dbDiffDayLessonTimes[day])) {
//                 const filteredTimes = dbDiffDayLessonTimes[day].filter(item => item.id !== id);
//                 setDbDiffDayLessonTimes({
//                     ...dbDiffDayLessonTimes,
//                     [day]: filteredTimes
//                 });
//             } else {
//                 console.error('dbDiffDayLessonTimes[day] is not an array or does not exist.');
//             }
//         } catch (error) {
//             console.error('Error deleting lesson time:', error);
//         }
//     } 
// };





const renderAllDayLessonTimes = () => (
    <>
        {dbAllDayLessonTimes.map((item) => (
            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                <Text>시작: {item.startTime}</Text>
                <Text>종료: {item.endTime}</Text>
                <TouchableOpacity onPress={() => removeAllDayLessonTimeFromDb(item.id, item.startTime, item.endTime)}>
                    <Icon name="closecircle" size={18} color="red" />
                </TouchableOpacity>
            </View>
        ))}

        {allDayLessonTimes.map((item) => (
            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                <TouchableOpacity onPress={() => { setStartTimePickerVisible(true); setEditingTimeSlotId(item.id); }}>
                    <Text>시작: {item.startTime}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setEndTimePickerVisible(true); setEditingTimeSlotId(item.id); }}>
                    <Text>종료: {item.endTime}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => allDayRemoveLessonTime(item.id)}>                        
                    <Icon name="closecircle" size={18} color="red" />
                </TouchableOpacity>
            </View>
        ))}
    </>
);


// const renderWeeklyDayLessonTimes = () => (
//     <>
//         {Object.keys(lessonTimes).map((day) => (
//             <View key={day} style={{ width: screenWidth*0.9, borderRadius: 8, borderWidth: 1, borderColor: '#4A7AFF', backgroundColor: 'white', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
//                     <Text style={{ fontSize: 15, fontWeight:'600' }}>{day}</Text>
//                     <TouchableOpacity onPress={() => handleAddLessonTime(day)}>
//                         <Icon name="pluscircle" size={20} color="#4A7AFF" />
//                     </TouchableOpacity>
//                 </View>

//                 {dbWeeklyDayLessonTimes[day]?.map((item) => (
//                     <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
//                         <Text>시작: {item.startTime}</Text>
//                         <Text>종료: {item.endTime}</Text>
//                         <TouchableOpacity onPress={()=>{removeWeeklyDayLessonTimeFromDb(day, item.id, item.startTime, item.endTime)}}>
//                             <Icon name="closecircle" size={18} color="red" />
//                         </TouchableOpacity>
//                     </View>
//                 ))}

//                 {lessonTimes[day]?.map((timeSlot) => (
//                     <View key={timeSlot.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
//                         <TouchableOpacity onPress={() => editTimeSlot(day, timeSlot.id, 'startTime')}>
//                             <Text>시작: {timeSlot.startTime}</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => editTimeSlot(day, timeSlot.id, 'endTime')}>
//                             <Text>종료: {timeSlot.endTime}</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => removeLessonTime(day, timeSlot.id)}>
//                             <Icon name="closecircle" size={20} color="red" />
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//             </View>
//         ))}
//     </>
// );

// const renderDiffDayLessonTimes = () => (
//     <>
//         {diffWeekDays.map((day) => (
//             <View key={day} 
//             style={{ width: screenWidth * 0.9, 
//                     alignSelf: 'center', 
//                     borderRadius: 8, 
//                     borderWidth: 1, 
//                     borderColor: '#4A7AFF', 
//                     backgroundColor: 'white', 
//                     marginBottom: 20, 
//                     paddingBottom: 20, 
//                     borderBottomWidth: 1, 
//                     borderBottomColor: 'lightgray'
//                 }}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20,marginTop:'4%' }}>
//                     <Text style={{ fontSize: 22, fontWeight: '600' }}>{day}</Text>
//                     <TouchableOpacity onPress={() => addWeekendLessonTime(day, '00:00', '00:00')}>
//                         <Icon name="pluscircle" size={20} color="#4A7AFF" />
//                     </TouchableOpacity>
//                 </View>

//                 {dbDiffDayLessonTimes[day]?.map((item) => (
//                     <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
//                         <Text>시작: {item.startTime}</Text>
//                         <Text>종료: {item.endTime}</Text>
//                         <TouchableOpacity onPress={()=>{removeDiffDayLessonTimeFromDb(day, item.id, item.startTime, item.endTime)}}>
//                             <Icon name="closecircle" size={18} color="red" />
//                         </TouchableOpacity>
//                     </View>
//                 ))}

//                 {weekendLessonTimes[day]?.map((timeSlot) => (
//                     <View key={timeSlot.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
//                         <TouchableOpacity onPress={() => editTimeSlot(day, timeSlot.id, 'startTime')}>
//                             <Text>시작: {timeSlot.startTime}</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => editTimeSlot(day, timeSlot.id, 'endTime')}>
//                             <Text>종료: {timeSlot.endTime}</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => removeWeekendLessonTime(day, timeSlot.id)}>
//                             <Icon name="closecircle" size={20} color="red" />
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//             </View>
//         ))}
//     </>
// );


// 매일 같아요 시 시작 시간 설정 함수
const handleSetStartTime = async (time, id) => {
    setStartTimePickerVisible(false); // TimePicker 숨기기
    await AsyncStorage.setItem('selectedStartTime', time);
    const updatedTimes = allDayLessonTimes.map(item => {
        if (item.id === id) {
            return { ...item, startTime: time };
        }
        return item;
    });
    console.log(updatedTimes);
    setAllDayLessonTimes(updatedTimes);
};

// 종료 시간 설정 함수
const handleSetEndTime = async (time, id) => {
    setEndTimePickerVisible(false); // TimePicker 숨기기
    await AsyncStorage.setItem('selectedEndTime', time);
    const updatedTimes = allDayLessonTimes.map(item => {
        if (item.id === id) {
            return { ...item, endTime: time };
        }
        return item;
    });
    console.log(updatedTimes);
    setAllDayLessonTimes(updatedTimes);
};
    

    const allDayAddLessonTime = () => {
        // 간단한 예시를 위해 현재 시간을 startTime으로 사용
        const allDayNewTime = {
            id: uuid.v4(),// 고유 ID 생성
            startTime: selectedStartTime, // 예시 시간
            endTime: selectedEndTime, // 예시 시간
        };
        setAllDayLessonTimes([...allDayLessonTimes, allDayNewTime]);
    };

    const allDayRemoveLessonTime = (id) => {
        setAllDayLessonTimes(allDayLessonTimes.filter(item => item.id !== id));
    };
        

const addAllDayLessonTimeToDB = async () => {
    // AsyncStorage에서 logId 직접 가져오기
    let logId = await AsyncStorage.getItem('logId');
    if (logId) {
        logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거

        const timeSlots = allDayLessonTimes.map(slot => ({
            day_of_week: 'All', // 또는 다른 요일을 지정
            start_time: slot.startTime,
            end_time: slot.endTime
        }));
        console.log(logId);

        try {
            // Axios 라이브러리를 사용하여 서버에 POST 요청, 여기에 logId를 포함하여 전송
            const response = await axios.post(`${BASE_URL}/allDayAvailable-times`, {
                logId, // logId를 POST 요청 본문에 포함
                timeSlots: timeSlots
            });

            console.log('Data saved:', response.data);
            Alert.alert(
                '수업개설 완료',
                '수업이 개설되었습니다!',
                [
                    {
                        text: '확인',
                        onPress: () => navigation.navigate(TRMainScreens.TRMain)
                    }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error adding time slots:', error);
        }
    } else {
        console.error('No logId found in AsyncStorage.');
    }
};



    ////////요일별

//     const handleAddLessonTime = (day) => {
//             // 여기서는 예시로 '00:00'을 기본 값으로 사용합니다.
//             addLessonTime(day, '00:00', '00:00');
//         };
    
//     // // 시작 시간 또는 종료 시간 편집을 위한 함수
//     const editTimeSlot = (day, id, type) => {
//         setCurrentEditing({ day, id, type });
//         setIsTimePickerVisible(true);
//     };

//     // TimePicker에서 시간 선택 후 콜백
//         const handleTimeSelected = (selectedTime) => {
//             const { day, id, type } = currentEditing;
//             const updatedLessonTimes = { ...lessonTimes };
//             const updatedTimeSlots = updatedLessonTimes[day].map(slot => {
//             if (slot.id === id) {
//                 return { ...slot, [type]: selectedTime };
//             }
//             return slot;
//             });

//             setLessonTimes({ ...updatedLessonTimes, [day]: updatedTimeSlots });
//             setIsTimePickerVisible(false);
//         };


//     const weeklyChangeableToDB = async () => {
//     let logId = await AsyncStorage.getItem('logId');
//     if (logId) {
//         logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거

//         const timeSlots = Object.keys(lessonTimes).flatMap(day =>
//             lessonTimes[day].map(slot => ({ day_of_week: day, start_time: slot.startTime, end_time: slot.endTime }))
//         );

//         try {
//             const response = await axios.post(`${BASE_URL}/weeklyChangeable-times`, {
//                 logId,
//                 timeSlots
//             });
//             console.log('Data saved:', response.data);
//             Alert.alert(
//                 '수업개설 완료',
//                 '수업이 개설되었습니다!',
//                 [
//                     { text: '확인', onPress: () => navigation.navigate(TRMainScreens.TRMain) }
//                 ],
//                 { cancelable: false }
//             );
//         } catch (error) {
//             console.error('Error submitting lesson times:', error);
//         }
//     } else {
//         console.error('No logId found in AsyncStorage.');
//     }
// };
    

//         ////////평일,주말

//         const handleWeekendTimeSelected = (selectedTime) => {
//             const { day, id, type } = currentEditing;
//             const updatedWeekendLessonTimes = { ...weekendLessonTimes };
//             const updatedTimeSlots = updatedWeekendLessonTimes[day].map(slot => {
//                 if (slot.id === id) {
//                     return { ...slot, [type]: selectedTime };
//                 }
//                 return slot;
//             });

//             setWeekendLessonTimes({ ...updatedWeekendLessonTimes, [day]: updatedTimeSlots });
//             setIsTimePickerVisible(false);
//         };



// const diffWeekendToDB = async () => {
//     let logId = await AsyncStorage.getItem('logId');
//     if (logId) {
//         logId = logId.replace(/^['"](.*)['"]$/, '$1'); // logId에서 따옴표 제거

//         const timeSlots = Object.keys(weekendLessonTimes).flatMap(day =>
//             weekendLessonTimes[day].map(slot => ({ day_of_week: day, start_time: slot.startTime, end_time: slot.endTime }))
//         );

//         try {
//             const response = await axios.post(`${BASE_URL}/diffWeekend-times`, {
//                 logId,
//                 timeSlots
//             });
//             console.log('Data saved:', response.data);
//             Alert.alert(
//                 '수업개설 완료',
//                 '수업이 개설되었습니다!',
//                 [
//                     { text: '확인', onPress: () => navigation.navigate(TRMainScreens.TRMain) }
//                 ],
//                 { cancelable: false }
//             );
//         } catch (error) {
//             console.error('Error submitting lesson times:', error);
//         }
//     } else {
//         console.error('No logId found in AsyncStorage.');
//     }
// };





    


    // 필터에 따른 뷰 렌더링r
        const renderFilterView = () => {
            switch (filter) {
            case '매일 같아요':
                return (
                    <View style={{ backgroundColor: 'white', height: screenHeight * 0.85 }}>
                        <ScrollView style={{ flex: 1}}>
                            <View 
                            style={{ 
                                width: screenWidth * 0.9, 
                                alignSelf: 'center',
                                borderRadius: 8, 
                                borderWidth: 1, 
                                borderColor: '#4A7AFF', 
                                backgroundColor: 'white', 
                                marginBottom: 20,
                                paddingBottom: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: 'lightgray',
                            }}
                            >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 ,marginTop:'3%'}}>
                                <Text style={{ fontSize: 22, fontWeight: '600'}}>매일</Text>
                                <TouchableOpacity onPress={allDayAddLessonTime}>
                                    <Icon name="pluscircle" size={22} color='#4A7AFF'/>
                                </TouchableOpacity>
                            </View>

                            {renderAllDayLessonTimes()}

                            <TimePicker 
                                isVisible={startTimePickerVisible}
                                onClose={() => setStartTimePickerVisible(false)}
                                onConfirm={(time) => handleSetStartTime(time, editingTimeSlotId)}
                            />
                            <TimePicker 
                                isVisible={endTimePickerVisible}
                                onClose={() => setEndTimePickerVisible(false)}
                                onConfirm={(time) => handleSetEndTime(time, editingTimeSlotId)}
                            />
                            </View>

                            
                            
                        </ScrollView>

                            <View style={{backgroundColor:'white',width:screenWidth,alignItems:'center',height:screenHeight*0.1,justifyContent:'center'}}>
                                <TouchableOpacity
                                onPress={addAllDayLessonTimeToDB }
                                style={{width:screenWidth*0.9,backgroundColor:'#4A7AFF',justifyContent:'center',alignItems:'center',height:screenHeight*0.055,borderRadius:8}}>
                                    <Text style={{color:'white',fontSize:17,fontWeight:'600'}}>적용하기</Text>
                                </TouchableOpacity>
                            </View>

                        
                    </View>
                    

                )

            // case '요일별로 달라요':
            //     return (

            //         <View style={{height:'auto',justifyContent:'center',alignItems:'center'}}>
            //             <ScrollView style={{ height:'auto',marginTop:'5%' }}>

            //                 {renderWeeklyDayLessonTimes()}
                        
            //             {isTimePickerVisible && (
            //                 <TimePicker
            //                 isVisible={isTimePickerVisible}
            //                 onClose={() => setIsTimePickerVisible(false)}
            //                 onConfirm={handleTimeSelected}
            //                 />
            //             )}
                        
            //             </ScrollView>

            //             <View style={{backgroundColor:'white',width:screenWidth,alignItems:'center',height:screenHeight*0.25,justifyContent:'center'}}>
            //                 <TouchableOpacity
            //                 onPress={weeklyChangeableToDB}
            //                 style={{width:screenWidth*0.9,backgroundColor:'#4A7AFF',justifyContent:'center',alignItems:'center',height:screenHeight*0.055,borderRadius:8}}>
            //                     <Text style={{color:'white',fontSize:17,fontWeight:'600'}}>적용하기</Text>
            //                 </TouchableOpacity>
            //             </View>
            //         </View>
                    


            //     )

                
            // case '평일/주말 달라요':
            //         return (
            //            <View style={{ backgroundColor: 'white', height: screenHeight * 0.75,justifyContent:'center',alignItems:'center' }}>
            //                 <ScrollView style={{ flex: 1 }}>

            //                     {renderDiffDayLessonTimes()}
            //                     {/* {diffWeekDays.map((day) => (
            //                         <View key={day} style={{ 
            //                                 width: screenWidth * 0.9, 
            //                                 alignSelf: 'center', 
            //                                 borderRadius: 8, 
            //                                 borderWidth: 1, 
            //                                 borderColor: '#4A7AFF', 
            //                                 backgroundColor: 'white', 
            //                                 marginBottom: 20, 
            //                                 paddingBottom: 20, 
            //                                 borderBottomWidth: 1, 
            //                                 borderBottomColor: 'lightgray' }}>
            //                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20,marginTop:'4%' }}>
                                            
            //                                     <Text style={{ fontSize: 22, fontWeight: '600' }}>{day}</Text>
            //                                     <TouchableOpacity onPress={() => addWeekendLessonTime(day, '00:00', '00:00')}>
            //                                         <Icon name="pluscircle" size={20} color="#4A7AFF" />
            //                                     </TouchableOpacity>
                                        
            //                             </View>
            //                             {weekendLessonTimes[day].map((timeSlot) => (
            //                                 <View key={timeSlot.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
            //                                     <TouchableOpacity onPress={() => editTimeSlot(day, timeSlot.id, 'startTime')}>
            //                                         <Text>시작: {timeSlot.startTime}</Text>
            //                                     </TouchableOpacity>
            //                                     <TouchableOpacity onPress={() => editTimeSlot(day, timeSlot.id, 'endTime')}>
            //                                         <Text>종료: {timeSlot.endTime}</Text>
            //                                     </TouchableOpacity>
            //                                     <TouchableOpacity onPress={() => removeWeekendLessonTime(day, timeSlot.id)}>
            //                                         <Icon name="closecircle" size={20} color="red" />
            //                                     </TouchableOpacity>
            //                                 </View>
            //                             ))}
            //                         </View>
            //                     ))} */}
            //                 </ScrollView>
            //                     {isTimePickerVisible && (
            //                     <TimePicker
            //                         isVisible={isTimePickerVisible}
            //                         onClose={() => setIsTimePickerVisible(false)}
            //                         onConfirm={handleWeekendTimeSelected}
            //                     />
            //                 )}

            //                 <View style={{backgroundColor:'white',width:screenWidth,alignItems:'center',height:screenHeight*0.1,justifyContent:'center'}}>
            //                     <TouchableOpacity
            //                     onPress={diffWeekendToDB}
            //                     style={{width:screenWidth*0.9,backgroundColor:'#4A7AFF',justifyContent:'center',alignItems:'center',height:screenHeight*0.055,borderRadius:8}}>
            //                         <Text style={{color:'white',fontSize:17,fontWeight:'600'}}>적용하기</Text>
            //                     </TouchableOpacity>
            //                 </View>
            //             </View>

            //         )
                    
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

                {/* {(['매일 같아요', 
                '요일별로 달라요', '평일/주말 달라요'
            ] as FilterType[]).map((type) => {

                        return (
                            <TouchableOpacity
                                key={type}
                                onPress={() => setFilter(type)}
                                style={{
                                    marginHorizontal: 10,
                                    backgroundColor: filter === type ? '#4A7AFF' : 'transparent',  // 선택된 필터는 파란색 배경
                                    padding: 10,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: filter === type ? 'transparent' : 'lightgray',
                                }}
                            >
                                <Text style={{ color: filter === type ? 'white' : 'black', fontWeight: '500' }}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        );
                    })} */}

    </View>
    
            {renderFilterView()}

        </View>
    )
}

export default AdjustLessonTimeScreen

const styles = StyleSheet.create({
    TimeSelectBox:
        { 
        paddingHorizontal:24,
        flexDirection: 'row', justifyContent: 
        'space-between', alignItems: 'center',
        marginTop:24,width:'100%',
        height:60/height,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#4169E1'
        }
})