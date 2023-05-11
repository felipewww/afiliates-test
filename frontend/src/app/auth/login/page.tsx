"use client"

import LoginForm from "@/app/auth/login/login-form";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/infra/context/auth.context";

export default function LoginPage() {

    const ctx = useAuthContext();
    ctx.authUserEntity?.logout()
    const router = useRouter()

    const loginError = (err: any) => {
        alert('login ERROR const...')
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img style={{width: '350px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Hadoop_logo.svg/1024px-Hadoop_logo.svg.png" alt="logo"/>
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <LoginForm onSuccess={() => router.push('/admin')} onError={loginError} />
                    </div>
                </div>
            </div>
        </section>
    )
}