'use client'

import {AuthService} from "@/services/auth.service";
import * as jwt from "jsonwebtoken";
import Cookies from 'js-cookie'

export interface ITokenPayload {
    id: number,
    username: string
}

export class AuthUserEntity {

    constructor(
        private Id: number,
        private Username: string
    ) {
        this.refreshLoginFromStorage()
    }

    get id() {
        return this.Id
    }

    get username() {
        return this.Username
    }

    async login(username: string, password: string) {
        const service = new AuthService();

        try {
            const token = await service.login(username, password)
            this.authenticate(token)

            Cookies.set('token', token, {
                expires: 7
            })

            return true
        } catch (e) {
            // todo - tratar erro de login
            return false;
        }
    }

    async logout() {
        this.Id = null;
        this.Username = null;

        Cookies.remove('token')
    }

    isLoggedIn() {
        return (!!this.Id);
    }

    private authenticate(token: string) {
        const payload = jwt.decode(token) as ITokenPayload

        this.Id = payload.id;
        this.Username = payload.username;
    }

    // If screen was refreshed, should try to read token from localStorage and mount entity again
    private refreshLoginFromStorage() {
        const token = Cookies.get('token')

        if (token) {
            this.authenticate(token)
        }
    }
}