import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

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

    getprofile(username){
        return this.http.post('/getprofile', { username })
        .map((response: Response) => {
            // getprofile successful if there's userprofile in response
            let profile = response.json();
            // profile.username;
            // profile.phoneNo;
            // profile.emailID;
            return profile;
        });
    }
}