import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { error } from 'selenium-webdriver';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/users/' + _id).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/users/register', user);
    }

    update(user: User) {
        return this.http.put('/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete('/users/' + _id);
    }

    getprofile(username) {
        return this.http.post('/profile/get', { username })
            .map((response: Response) => {
                // getprofile successful if there's userprofile in response
                let profile = response.json();
                // profile.username;
                // profile.phoneNo;
                // profile.emailID;
                return profile;
            });
    }

    resetPassword(username, oldPassword, newPassword) {
        return this.http.post('/profile/update', { username, oldPassword, newPassword })
            .map((response: Response) => {
                // resetPassword successful if password got changed in response
                let res = response.json();
                return res;
            });
    }

    generateOTP(username, mobileno) {
        return this.http.post('/auth/generate', { username, mobileno })
            .map((response: Response) => {
                // generateOTP successful if otp is sent to mobile as response
                let gen = response.json();
                return gen;
            });
    }

    verifyOTP(username, otp) {
        return this.http.post('/auth/verify', { username, otp })
            .map((response: Response) => {
                // generateOTP successful if otp is sent to mobile as response
                let verify = response.json();
                return verify;
            });
    }

    sendMail(username, mobileno, email) {
        return this.http.post('/auth/sendmail', { username, mobileno, email })
            .map((response: Response) => {
                let mail = response.json();
                return mail;
            });
    }
    
    // get username for getting profile
    getUsername() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.username) {
            return currentUser.username;
        }
    }
}