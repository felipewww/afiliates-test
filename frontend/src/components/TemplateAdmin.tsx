'use client'

import {AuthProvider} from "@/infra/context/auth.context";

export default({children}: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <h1>Template Admin!</h1>
            <div>
                {children}
            </div>
        </AuthProvider>
    )
}