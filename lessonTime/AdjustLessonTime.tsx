import { useState } from "react";

export const adjustLessonTimes = () => {
    const [lessonTimes, setLessonTimes] = useState({
        월요일: [],
        화요일: [],
        수요일: [],
        목요일: [],
        금요일: [],
        토요일: [],
        일요일: [],
    });
    const [selectedStartTime, setSelectedStartTime] = useState('00:00');
    const [selectedEndTime, setSelectedEndTime] = useState('00:00');

    const addLessonTime = (day, startTime = selectedStartTime, endTime = selectedEndTime) => {
        const newTime = { id: new Date().getTime(), startTime, endTime };
        setLessonTimes((currentTimes) => ({
            ...currentTimes,
            [day]: [...currentTimes[day], newTime],
        }));
    };

    const removeLessonTime = (day, id) => {
        setLessonTimes((currentTimes) => ({
            ...currentTimes,
            [day]: currentTimes[day].filter((time) => time.id !== id),
        }));
    };

    return { lessonTimes, setLessonTimes, addLessonTime, removeLessonTime };
};
