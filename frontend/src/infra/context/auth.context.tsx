'use client';

import {createContext, useContext, useState} from "react";
import {AuthUserEntity} from "@/domain/AuthUser.entity";
// import {useRouter} from "next/navigation";
import { redirect } from 'next/navigation';

export interface IAuthContext {
    authUserEntity: AuthUserEntity
}

const contextInit: IAuthContext = {
    authUserEntity: new AuthUserEntity(null, null)
}
const AuthContext = createContext<IAuthContext>(contextInit)

export function AuthProvider(props: any) {
    const ctx = useAuthContext();

    if (!ctx.authUserEntity || !ctx.authUserEntity.isLoggedIn()) {
        // const router = useRouter();
        return redirect('/auth/login')
    }

    return (
        <AuthContext.Provider value={ contextInit }>
            <div>
                <div>id: {contextInit.authUserEntity.id}</div>
                <div>username: {contextInit.authUserEntity.username}</div>
            </div>
            <br />
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext)
}
