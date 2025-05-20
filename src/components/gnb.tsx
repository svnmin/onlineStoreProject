import { CategoryContext } from "@/context/categorycontext"
import Link from "next/link"
import { useContext } from "react"
import styled from "styled-components"


export default function Gnb(){
    const {categoryList} = useContext(CategoryContext)
    return(
        <Nav>
            <ul>
                {categoryList.map((el) => (
                    <li key={el}>
                        <Link href={`/products/${el}`}>{el}</Link>
                    </li>
                ))}
            </ul>
        </Nav>
    )
}

const Nav = styled.nav`
    display: flex;
    align-items: center;
    ul{
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 20px;

        a{
            text-decoration: none;
            color: #787878;
            font-weight: 500;
            padding: 10px 0;
            border-bottom: solid 1px transparent;
            transition: 300ms;
            &:hover{
                border-color: #56b3ff;
                color: #56b3ff;
            }
        }
    }
`