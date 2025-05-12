"use client"

import { JoinEmail } from "@/api/api";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"
import styled from "styled-components"



export default function JoinPage(){

    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const [nameErr, setNameErr] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");

    const router = useRouter();

    const validatorName = (name : string) : boolean => {
        if(!name){
            setNameErr("이름을 입력해주세요.")
            return false
        }
        if(name.length < 2 || name.length > 10){
            setNameErr("이름은 2글자 이상 10글자 이하로 작성해주세요.")
            return false
        }
        if(!/^[A-Za-z가-힣\s'-]+$/.test(name)){
            setNameErr("유효하지 않은 문자가 포함되어 있습니다.")
            return false
        }
        return true
        
    }
    const handleSubmitEvent = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameErr('')
        setEmailErr('')
        setPasswordErr('')

        if(!validatorName(userName)) return

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)){
            setEmailErr("유효하지 않은 이메일 주소입니다.")
            return
        }
        if(userPassword.length < 6){
            setPasswordErr("비밀번호는 6글자 이상이어야 합니다.")
            return
        }
        /*
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                ^       : 문자열의 시작
                [^]     : 정규식에서는 반대를 의미(!)
                \s      : 공백문자
                [^\s@]  : 공백문자와 @를 제외한 나머진 문자를 의미함
                +       : 반복의 의미(+바로 앞에 있는 요소가 1회이상 반복
                \.      : .는 정규식에서 "any"를 뜻하며 \로 정확히 .만 지칭
                $       : 정규식의 마무리
        */

        try{
            const result = await JoinEmail(userEmail, userPassword, userName);
            router.push('/')
        }catch(error){
            console.error(error)
        }
        
    }
    return(
        <Container>
            <Title>회원가입</Title>
            <Form onSubmit={handleSubmitEvent}>
                <InputWrapper>
                    <Input
                        type="text"
                        placeholder="이름은 2글자 이상 10글자 이하로 작성"
                        value={userName}
                        onChange={(e:ChangeEvent<HTMLInputElement>) =>
                            setUserName(e.target.value)
                        }
                    />
                    {nameErr && <ErrorText>{nameErr}</ErrorText>}
                </InputWrapper>

                <InputWrapper>
                    <Input 
                        type="text"
                        placeholder="이메일 주소를 입력하세요"
                        value={userEmail}
                        onChange={(e:ChangeEvent<HTMLInputElement>) =>
                            setUserEmail(e.target.value)
                        }
                    />
                    {emailErr && <ErrorText>{emailErr}</ErrorText>}
                </InputWrapper>

                <InputWrapper>
                    <Input 
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={userPassword}
                        onChange={(e:ChangeEvent<HTMLInputElement>) =>
                            setUserPassword(e.target.value)
                        }
                    />
                    {passwordErr && <ErrorText>{passwordErr}</ErrorText>}
                </InputWrapper>

                <SubmitBtn type="submit">회원가입</SubmitBtn>

            </Form>
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
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`
const Input = styled.input`
    padding: 10px 12px;
    border: solid 1px #ccc;
    border-radius: 4px;
`
const SubmitBtn = styled.button`
    padding: 10px 20px;
    background: #56b3ff;
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
    
`