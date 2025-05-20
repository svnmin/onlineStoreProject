"use client"

import { onUserState, googleLogin, googleLogout } from "@/api/api";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useRef, useState } from "react";


interface AuthContextType{
    user : User | null,
    uid : string | null,
    isLoading : boolean,
    googleLogin : () => Promise<User | null>
    googleLogout : () => Promise<void>
}
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthContextProvider({children} : {children : React.ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const unsubscribeRef = useRef<() => void>();

    useEffect(() => {
        const stored = sessionStorage.getItem('user');
        //sessionStorage : 브라우저의 저장공간에 내 로그인 정보를 저장해놓음
        if(stored) setUser(JSON.parse(stored));
        const handleUserChange = (newUser : User | null) => {
            setUser(newUser);

            if(newUser){
                sessionStorage.setItem("user",JSON.stringify(newUser));
            }else{
                sessionStorage.removeItem("user");
            }
            
            setIsLoading(true);
        }
        unsubscribeRef.current = onUserState(handleUserChange);
        return () => unsubscribeRef.current?.()
    },[])

    return(
        <AuthContext.Provider value={{
            user,
            uid : user?.uid ?? null,
            isLoading,
            googleLogin,
            googleLogout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
}