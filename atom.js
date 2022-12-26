import React from 'react';
import { atom, selector } from "recoil";
import CalenderDate from './components/calendarDate';

export const RCMonthCnt = atom({
    key: 'RCMonthCnt',
    default: 0
})

export const RCalender = atom({
    key: 'RCalender',
    default: {
        today: CalenderDate().today,
        year: CalenderDate().year,
        month: CalenderDate().month,
        calenderArray: CalenderDate().calenderArray,
    }
});

export const RCMonth = selector({
    key: 'RCMonth',
    get: ({get}) => {
        const calender = get(RCalender);
        const cnt = get(RCMonthCnt);
        const test = CalenderDate(cnt);

        if(cnt === 0) {
            return ({...calender});
        } else {
            return ({...test})
        }
    }
});

export const loginState = atom({
    key: 'loginState',
    default: false
})

export const loginUserID = atom({
    key: 'loginUserID',
    default: ''
})