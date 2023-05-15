'use client'

import {useAuthContext} from "@/infra/context/auth.context";
import {useEffect, useState} from "react";
import {AuthProvider} from "@/infra/context/auth.context";

export default({children}: { children: React.ReactNode }) => {
    
    const ctx = useAuthContext()
    const [loggedUser, setLoggedUser] = useState('')
    
    useEffect(() => {
        if (ctx?.authUserEntity?.isLoggedIn()) {
            setLoggedUser(ctx.authUserEntity.username);
        }
    })
    
    return (
        <AuthProvider>
            <h1>Template Admin 2!</h1>
            <div>{loggedUser}</div>
            <div>
                {children}
            </div>
        </AuthProvider>
    )
}