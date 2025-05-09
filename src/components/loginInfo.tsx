"use client"

import { FC, useState } from "react"
import { googleLogin, googleLogout } from "@/api/api";
import { adminUser } from "@/service/admin";

interface AuthUser{
    uid : string,
    displayName : string,
    isAdmin? : boolean,
}

const LoginInfo : FC = () => {
    const [user, setUser] = useState<AuthUser | null>(null)

    const login = async () => {
        try{
            const item = await googleLogin();
            if(!item) return
            console.log(item)
            const adminCheck = await adminUser(item);
            console.log(adminCheck)
            setUser({
                uid : adminCheck.uid,
                displayName : adminCheck.displayName,
                isAdmin : adminCheck.isAdmin
            })
        }catch(error){
            console.error(error)
        }
    }

    const logout = async () => {
        try{
            await googleLogout();
            setUser(null);
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className="flex items-center">
            {user ?(
                <>
                    <span>{user.displayName}</span>
                    <button onClick={logout}>Logout</button>
                </>
            ):(
                <button onClick={login}>Login</button>
            )}
        </div>
    )
}

export default LoginInfo;