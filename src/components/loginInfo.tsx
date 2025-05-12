"use client"

import { FC, useEffect, useState } from "react"
import { googleLogin, googleLogout, onUserState } from "@/api/api";
import { adminUser } from "@/service/admin";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface AuthUser{
    uid : string,
    displayName : string,
    isAdmin? : boolean,
}

const LoginInfo : FC = () => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onUserState( async (u : AuthUser | null) => {
            if(!u){
                setUser(null)
                return
            }
            const adminCheck = await adminUser(u);
            setUser({
                uid : adminCheck.uid,
                displayName : adminCheck.displayName,
                isAdmin : adminCheck.isAdmin
            })
        });

        return() => {
            if(typeof unsubscribe === 'function') unsubscribe();
        }

    },[])

    const login = () => {
        // googleLogin();
        router.push('/login');

    }

    const logout = async () => {
        await googleLogout();
    }

    return(
        <Container>
            {user?.isAdmin &&(
                <AdminLink href='./upload' className="px-3 py-1 border-blue-500 text-blue-500 rounded">
                    업로드
                </AdminLink>
            )}

            {user ?(
                <>
                    <Name>{user.displayName}</Name>
                    <Button onClick={logout}>Logout</Button>
                </>
            ):(
                <Button onClick={login}>Login</Button>
            )}
        </Container>
    )
}

export default LoginInfo;

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

`
const AdminLink = styled(Link)`
    /*
        Link는 컴포넌트기 때문에 태그처럼 연결하지 않고 변수처럼 연결
    */
    padding: 10px 20px;
    border: solid 1px #bbbbbb;
    color: 56b3ff;
    border-radius: 2px;
    text-decoration: none;
    transition: 300ms;

    &:hover{
        background: #bbbbbb;
    }
`
const Name = styled.span`
    color: #56b3ff;
    font-weight: 500;
`
const Button = styled.button`
    padding: 10px 20px;
    background: #56b3ff;
    color : #333;
    border-radius: 5px;
    cursor: pointer;

    &:hover{
        background: white;
        color: #56b3ff;
    }
`