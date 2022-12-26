import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, TextInput, useWindowDimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";
import { loginState, loginUserID } from "../../atom";
import { auth, fireStoreDB } from "../../firebaseConfig";

const Container = styled.View`
    background: #fff;
    flex:1;
`;

const Logo = styled.Image`
    height: 100px;
`;

const LocationView = styled.View`
    width: 100%;
    align-items: center;
    margin-bottom: 40px;
`;

const TextBox = styled.TextInput`
    margin: 0 16px 20px;
    background: #ECF3F8;
    padding: 16px;
    border-radius: 16px;
    font-size: 16px;
`;

const Submit = styled.Pressable`
    width: ${props => props.screenWidth - 32}px;
    padding: 0 16px;
    border-radius: 32px;
    background: #45528B;
    margin: 0 16px;
`;

const SubmitText = styled.Text`
    display: flex;
    color: #fff;
    text-align: center;
    width:100%;
    padding: 20px 0;
    font-size: 20px;
    line-height: 24px;
    font-weight: 800;
`;

export default function Login({navigation:{navigate, setOptions}}) {
    const {width, height} = useWindowDimensions();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userID, setUserID] = useRecoilState(loginUserID);
    const [login, setLogin] = useRecoilState(loginState);
    const passwordRef = useRef();
    const submitRef = useRef();

    useEffect(() => {
        
    },[])
    
    const onChangeEmail = (text) => {
        setEmail(text)
    };

    const onChangePassword = (text) => {
        setPassword(text)
    };

    const onSubmit = async () => {
        console.log('press');
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUserID(user.uid);
                setLogin(true);
                navigate('BottomNav', {screen:'home'})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMsg = error.message;
                console.log(errorCode, errorMsg);
            });
    }

    return (
        <Container>
            <LocationView>
                <Logo swidth={width} source={require('../../assets/images/logo.png')} style={{resizeMode: "contain"}} />                
            </LocationView>

            <TextBox
                autoCapitalize='none'
                value={email}
                keyboardType='email-address'
                onSubmitEditing={() => passwordRef.current.focus()}
                onChangeText={onChangeEmail}
                placeholder='ex) test@test.com'
                placeholderTextColor='#B9C4D6'
            />
            <TextBox
                autoCapitalize='none'
                ref={passwordRef}
                keyboardType='default'
                value={password}
                onChangeText={onChangePassword}
                placeholder='ex) 숫자, 문자 및 특수문자 조합 8~16자리'
                placeholderTextColor='#B9C4D6'
                secureTextEntry={true}
                onSubmitEditing={onSubmit}
            />
            <Submit
                screenWidth={width}
                ref={submitRef}
                onPress={onSubmit}
            >
                <SubmitText>로그인</SubmitText>
            </Submit>

            <Pressable onPress={() => navigate('StackNav', {screen:'Agreement'})}>
                <Text>
                    회원가입
                </Text>
            </Pressable>
        </Container>
    )
}