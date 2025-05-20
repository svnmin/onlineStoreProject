"use client"

import Link from "next/link";
import { FC } from "react";
import LoginInfo from "./loginInfo";
import styled from "styled-components";
import Gnb from "./gnb";


const Header : FC = () => {
    return(
        <HeaderContainer>
            <Logo>
                <Link href="/">store</Link>
            </Logo>
            <Gnb/>
            <LoginInfo/>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.header`
    width: 100%;
    padding: 10px 24px;
    border-bottom: solid 1px #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`

const Logo = styled.h1`
    a{
        font-weight: bold;
        font-size: 24px;
        text-decoration: none;
        color: #56b3ff;
    }
`