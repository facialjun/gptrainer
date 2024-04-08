import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const TimePicker = ({ isVisible, onClose, onConfirm }) => {
    const [selectedTime, setSelectedTime] = useState('');

    // 30분 단위 시간 슬롯을 위한 배열 생성
    const timeSlots = Array.from(new Array(48), (_, index) => {
        const hours = Math.floor(index / 2).toString().padStart(2, '0');
        const minutes = (index % 2 === 0 ? '00' : '30');
        return `${hours}:${minutes}`;
    });

    const handleConfirm = () => {
        onConfirm(selectedTime);
        handleClose();
    };

    const handleSelectTime = (timeSlot) => {
        // 이미 선택된 시간 슬롯을 다시 선택하면 선택을 취소
        if (selectedTime === timeSlot) {
            setSelectedTime('');
        } else {
            setSelectedTime(timeSlot);
        }
    };

    // FlatList에 필요한 데이터 배열 생성
    const data = timeSlots.map((timeSlot, index) => ({
        key: index.toString(), // 고유한 키 설정
        timeSlot: timeSlot, // 시간 슬롯 값
    }));

    const handleClose = () => {
        // 모달 닫힐 때 선택된 시간 초기화
        setSelectedTime('');
        // 모달 닫기를 호출한 부모 컴포넌트로 전달
        onClose();
    };

    


    return (
        <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={handleClose}>
            
                <View style={styles.modalBackground}>
                    <FlatList
                        data={data}
                        numColumns={3} // 열 수 설정
                        contentContainerStyle={styles.pickerContainer} // 컨테이너 스타일 적용
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.timeButton,
                                    // 선택된 시간 슬롯의 스타일 조정
                                    item.timeSlot === selectedTime && styles.selectedTimeButton
                                ]}
                                onPress={() => handleSelectTime(item.timeSlot)}
                            >
                                <Text style={[
                                    styles.timeText,
                                    // 선택된 시간 슬롯의 텍스트 색상을 하얀색으로 조정
                                    item.timeSlot === selectedTime ? styles.selectedTimeText : {}
                                ]}>{item.timeSlot}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <View style={{height:screenHeight*0.532}}>
                        <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                            <Text style={styles.confirmButtonText}>완료</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
                
            
        </Modal>
    );
};

export default TimePicker;

const styles = StyleSheet.create({
    modalBackground: {
        height:'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickerContainer: {
        flexGrow: 1,
        width: screenWidth * 0.9, // picker container width 조정
    },
    timeButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
        margin: 5,
        borderRadius: 8, // 외부 테두리 radius 설정
        borderWidth: 0.5, // 테두리 너비 설정
        borderColor: '#4A7AFF', // 테두리 색상 설정
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: '#4A7AFF',
        padding: 10,
        borderRadius: 8,
        width: screenWidth * 0.4,
        marginTop:'5%'
    },
    confirmButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
        justifyContent:'center',
        alignItems:'center'
    },
    selectedTimeButton: {
        backgroundColor: '#4A7AFF', // 선택된 타임슬롯의 배경색
        borderColor: 'white', // 선택된 타임슬롯의 테두리 색상
    },
    selectedTimeText: {
    color: 'white', // 선택된 타임슬롯의 텍스트 색상을 하얀색으로 설정
    },
});
