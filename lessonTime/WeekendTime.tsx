import { useState } from "react";

export const diffWeekLessonTimes = () => {
    const [weekendLessonTimes, setWeekendLessonTimes] = useState({
        평일: [],
        주말: [],
    });
    const [selectedStartTime, setSelectedStartTime] = useState('00:00');
    const [selectedEndTime, setSelectedEndTime] = useState('00:00');

    const addWeekendLessonTime = (day, startTime = selectedStartTime, endTime = selectedEndTime) => {
        const newTime = { id: new Date().getTime(), startTime, endTime };
        setWeekendLessonTimes((currentTimes) => ({
            ...currentTimes,
            [day]: [...currentTimes[day], newTime],
        }));
    };

    const removeWeekendLessonTime = (day, id) => {
        setWeekendLessonTimes((currentTimes) => ({
            ...currentTimes,
            [day]: currentTimes[day].filter((time) => time.id !== id),
        }));
    };

    return { weekendLessonTimes, addWeekendLessonTime, removeWeekendLessonTime,setWeekendLessonTimes  };
};
