import { createUserWithEmailAndPassword, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection, doc, getDoc, getDocFromCache, setDoc, updateDoc } from '@firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { loginState, RCMonth, RCMonthCnt } from '../atom';
import { auth, fireStoreDB } from '../firebaseConfig';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Text = styled.Text`
`;

const SWeek = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const SWeekItem = styled.View`
    background: red;
    width: ${props => props.itemWidth}px;
    
`;

const SWeekText = styled.Text`
    text-align: center;
    color: ${props => props.curDate ? 'blue' : props.curMonth ? '#fff' : '#aaa'};
    background: ${props => props.curSelect ? 'green' : 'red'};
`;

const dateDate = [
    {
        id:1,
        date:1,
        text:1
    },
    {
        id:2,
        date:2,
        text:2
    },
    {
        id:3,
        date:3,
        text:3
    }
];

const renderItem = ({item:{id, date, text}}) => {
    return(
        <View key={id}>
            <Text>{date}</Text>
        </View>
    )
}

const WeekArray = ['일', '월', '화', '수', '목', '금', '토'];



export default function Home({navigation:{navigate, setOptions}}) {
    const [appIsReady, setAppIsReady] = useState(false);
    
    const {height, width} = useWindowDimensions();
    const setMonthCnt = useSetRecoilState(RCMonthCnt);
    const calender = useRecoilValue(RCMonth);
    const [selectDate, setSelectDate] = useState(calender.today);
    const [cSelectorState, setCSelectorState] = useState(false);
    const [userDiary, setUserDiary] = useState({});
    const [userId, setUserId] = useState('');
    const [login, setLogin] = useRecoilState(loginState);
    const [userInfo, setUserInfo] = useState();

    

    const yearArray = [calender.year-2, calender.year-1, calender.year, calender.year+1, calender.year+2];
    const monthArray = [...Array(12)]

    console.log(auth);
    // createUserWithEmailAndPassword(auth, 'test@test.com', '@123test123@')
    // .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user);
    // })

    const authTest = ({password, email}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUserId(user.uid);
            });
    };
    
    const nextWeek = () => {
        setMonthCnt(prev => ++prev);
    };

    const prevWeek = () => {
        setMonthCnt(prev => --prev);
    };

    const selectYMD = (year, month) => {
        const yearCnt = (year - calender.year) * 12;
        const monthCnt = (month-1)-calender.month;
        setMonthCnt(prev => prev + yearCnt + monthCnt);
    }

    const testRef = doc(fireStoreDB, 'diary', `${calender.today}`);

    const addFireStore = async(date) => {
        const prevDiary = await (await getDoc(testRef, 'diary', `${calender.today}`)).data().diary;
        try {
            await updateDoc(testRef, {
                diary: [...prevDiary,
                    {
                        date: selectDate,
                        emotion: 'sun',
                        text: '이건 내용입니다~~',
                        img: 'https://test.com/dlrjsdlrjsdl.jpg'
                    }
                ]
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const getDiaryInfo = async() => {
        const docRef = doc(fireStoreDB, "diary", `${calender.today}`);
        const docSnap = await getDoc(docRef);
        setUserDiary(prev => prev = docSnap.data());
    };

    const testField = () => {
        const docRef = doc(fireStoreDB, 'users', userId);
        setDoc(docRef, {test:'test123'});
    }

    console.log('ttest');
    console.log(userId);

    const onLoginPage = () => {
        navigate('StackNav', {screen: 'Login'});
    }

    const anonyState = () => {
        signInAnonymously(auth)
            .then(() => {
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    useEffect(() => {
        const userCheck = async () => {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    setUserId(uid);
                    getUserInfo();
                } else {
    
                }
            });
        };

        async function prepare() {
            if(auth.currentUser?.uid){
                try {
                    await Font.loadAsync(Entypo.font);
                } catch (e) {
                    console.warn(e);
                } finally {
                    setAppIsReady(true);
                }
            }   
        }
        const getUserInfo = async () => {
            const docRef = doc(fireStoreDB, 'users', userId);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            setUserInfo(prev => prev = docSnap.data());
        }
        getUserInfo();

        userCheck();
        prepare();

        getDiaryInfo();
    }, [auth.currentUser?.uid]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if(!appIsReady) {
        return <Text>loadding...</Text>
    }
    
    const defaultItem = () => {
        return (
            <View onLayout={onLayoutRootView}>
            <Entypo name="rocket" size={30} />
            <View>
                {
                    auth?.currentUser
                        ? (
                            <>
                            <Text>{`${auth.currentUser.uid ? '로그인' : '로그아웃'}`}</Text>
                            <Text>{auth.currentUser.uid}</Text>
                            <Text>{userInfo?.test}</Text>
                            </>
                        ) : (
                            <Text>유저정보 없음</Text>
                        )
                }
            </View>
            <View>
                <Text>{calender?.year}년</Text>
                <Text>{calender?.month+1}월</Text>
            </View>

            <TouchableWithoutFeedback onPress={onLoginPage}>
                <Text>로그인 페이지 이동</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => authTest({email: 'test@test.com', password:'@123test123@'})}>
                <Text>로그인 테스트</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={testField}>
                <Text>로그인 유저필드 생성</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => setCSelectorState(prev => !prev)}>
                <Text>캘린더 펼쳐보기</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => addFireStore(selectDate)}>
                <Text>testFireButton</Text>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={nextWeek}>
                <Text>{'>'}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={prevWeek}>
                <Text>{'<'}</Text>
            </TouchableWithoutFeedback> 

            <SWeek>
            {
                WeekArray.map((item, index) => (
                    <SWeekItem key={index} itemWidth={Math.floor(width/7)}>
                        <SWeekText>{item}</SWeekText>
                    </SWeekItem>
                ))
            }
            </SWeek>

            <SWeek>
            {
                calender?.calenderArray?.map((item, index) => (
                    <SWeekItem key={index} itemWidth={Math.floor(width/7)}>
                        <SWeekText onPress={() => setSelectDate(item)} curSelect={item === selectDate} curDate={item === calender.today} curMonth={new Date(item).getMonth() === calender.month}>
                            {new Date(item).getDate()}
                        </SWeekText>
                        <Text>
                            test
                        </Text>
                    </SWeekItem>
                ))
            }
            </SWeek>

            <View>
                {
                    cSelectorState ?
                    yearArray.map((year, index) => (
                        <View>
                            <View>
                                <Text key={index}>{year}</Text>
                            </View>

                            <View>
                                {
                                    monthArray.map((_, index) => (
                                        <Text onPress={() => selectYMD(year, index+1)} key={index}>{index+1}</Text>
                                    ))
                                }
                            </View>
                        </View>
                    )) : null
                }
            </View>

            
            </View>
        )
    }

    return (
        <View>
            <FlatList
                ListHeaderComponent={defaultItem}
                data={dateDate}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
};