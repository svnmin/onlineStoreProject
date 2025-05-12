"use client"

import { googleLogin } from "@/api/api"
import { User } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styled from "styled-components"


export default function LoginPage(){

    const [error, setError] = useState<string>("")
    const router = useRouter();
    const googleLoginEvent = async() => {
        try{
            const user : User | null = await googleLogin();
            if(user){
                router.push('/');
            }else{
                setError('이메일이나 비밀번호가 일치하지 않습니다.')
            }
        }catch(err){
            console.error(err);
            setError('로그인 실패 : 시스템을 점검하세요.')
        }
    }

    return(
        <Container>
            <Title>로그인</Title>
            <Form>
                <Input 
                    type="email"
                    placeholder = "이메일을 입력하세요"
                />
                <Input 
                    type = "password"
                    placeholder = "비밀번호를 입력하세요"
                />
                <Button type = "submit">로그인</Button>
                <Button type = "button" onClick={googleLoginEvent}>구글 로그인</Button>
                {error && <ErrorText>{error}</ErrorText>}
            </Form>
            <JoinLink href="/join">회원가입</JoinLink>
        </Container>
    )
}

const Container = styled.div`
    max-width: 400px;
    margin: 40px auto;
    padding: 12px;
    box-sizing: border-box;
    border: solid 1px #ddd;
    border-radius: 10px;
`
const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    color: #56b3ff;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`
const Input = styled.input`
    padding: 10px 12px;
    border: solid 1px #ccc;
    border-radius: 4px;
`
const Button = styled.button`
    padding: 10px 20px;
    background: #a1d5ff;
    color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 300ms;
    &:hover{
        background: #56b3ff;
    }
`
const ErrorText = styled.span`
    color: #9b0101eb;
    font-size: 12px;
    text-align: center;
`
const JoinLink = styled(Link)`
    font-size: 12px;
    color: #333;
    transition: 300ms;
    text-decoration: none;
    display: flex;
    justify-content: end;

    &:hover{
        color: #56b3ff;
    }
`