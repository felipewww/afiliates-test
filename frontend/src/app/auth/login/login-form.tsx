'use client'

import {useState} from "react";
import {useAuthContext} from "@/infra/context/auth.context";

export interface IProps {
    onSuccess: Function,
    onError: Function
}

export default (props: IProps) => {

    const ctx = useAuthContext();

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    function login() {
        ctx.authUserEntity.login(username, password)
            .then(() => props.onSuccess())
            .catch(() => props.onError())
    }

    return (
        <>
            <form className="space-y-4 md:space-y-6">
                <div>
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        email</label>
                    <input type="email" name="email" id="email"
                           value={username}
                           onChange={evt => setUsername(evt.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="name@company.com" required={true} />
                </div>
                <div>
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password"
                           value={password}
                           onChange={evt => setPassword(evt.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required={true} />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox"
                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                   required={false} />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Forgot password?
                    </a>
                </div>
                <button type="button"
                        onClick={login}
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        style={ {backgroundColor: 'rgb(37 99 235)'} }
                >
                    Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    <span>Don’t have an account yet? <a href="#">Sign up</a></span>
                </p>
            </form>
        </>
    )
}