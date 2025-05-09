import Link from "next/link";
import { FC } from "react";
import LoginInfo from "./loginInfo";


const Header : FC = () => {
    return(
        <header className="w-full py-3 px-6 box-border border-b border-gray-300 flex">
            <h1 className="logo text-2xl font-bold">
                <Link href="/">store</Link>
            </h1>
            <LoginInfo/>
        </header>
    )
}

export default Header;