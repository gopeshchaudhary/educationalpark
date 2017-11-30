import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class dashboardService {
    constructor(
        private http: Http,
        private _router: Router
    ) { }

    getSectionName(username) {
        return this.http.post('/profile/sections', { username })
            .map((response: Response) => {
                // exam successfully fetched
                // console.log(response);
                return (response)? response.json() : {};
                
            });
    }

    moduleSectionDetail(username, section) {
        return this.http.post('/profile/dashboard', { username , section })
            .map((response: Response) => {
                // exam successfully fetched
                // console.log(response);
                return (response)? response.json() : {};
                
                
                
            });
    }

    checkFlag(username, moduleid, videoid) {
        return this.http.post('/video/videostatus', { username , moduleid, videoid })
            .map((response: Response) => {
                // exam successfully fetched
                // console.log(response);
                return (response)? response.json() : {};
                
                
                
            });
    }

}