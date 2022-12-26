import React from "react";

export default function CalenderDate(cnt=0) {
    let result = [];
    const Today = new Date();
    const ChangeMonth = Today.setMonth(Today.getMonth()+cnt);
    const SelectMonth = new Date(ChangeMonth).getMonth();
    const SelectYear = Today.getFullYear();

    const TMFirestDate = new Date(SelectYear,SelectMonth,1);
    const TMFirestDay = TMFirestDate.getDay();
    const TMLastDate = new Date(SelectYear,SelectMonth+1,0);
    const TMLastDay = TMLastDate.getDay();

    const getCalendarArray = ({prevNum, curNum, nextNum}) => {
        const CADate = new Date(TMFirestDate.setDate(TMFirestDate.getDate() - (prevNum+1)));
        const arrayCnt = prevNum+curNum+nextNum;
        let Acnt = 0;
    
        while(Acnt < arrayCnt) {
            Acnt++;
            const date = CADate.setDate(CADate.getDate()+1);
            result.push(date);
        }
    };
    getCalendarArray({prevNum:TMFirestDay, curNum: TMLastDate.getDate(), nextNum: 6-TMLastDay});

    const todayObj = new Date();
    const todayMS = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate()).getTime();

    return {
        calenderArray: result,
        today: todayMS,
        month: SelectMonth,
        year: SelectYear
    }
};