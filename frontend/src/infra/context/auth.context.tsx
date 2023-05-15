'use client'

import {AuthUserEntity} from "@/domain/AuthUser.entity";
import {createContext, useContext, useEffect, useState} from "react";
import If from "@/components/If";
import {redirect} from "next/navigation";

export interface IAuthContext {
    authUserEntity?: AuthUserEntity
}

const AuthContext = createContext<IAuthContext>({})

export function AuthProvider(props: any) {
    const [authUserEntity, setAuthEntity] = useState<AuthUserEntity>(
        new AuthUserEntity(null, null)
    )
    
    useEffect(() => {
        console.log('authUserEntity IN AUTH PROVIDER!')
        console.log(authUserEntity)
        
        if (!authUserEntity.isLoggedIn()) {
            return redirect('/auth/login')
        }
    })
    
    return (
        <AuthContext.Provider value={{authUserEntity}}>
            <If cond={authUserEntity.isLoggedIn()}>
                {props.children}
            </If>
        </AuthContext.Provider>
    )
}

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext)
