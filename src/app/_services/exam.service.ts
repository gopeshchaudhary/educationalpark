import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ExaminationService {
    constructor(
        private http: Http,
        private _router: Router
    ) { }

    getExam(moudleid : string) {
        return this.http.post('/exam/getexam', { moduleid : moudleid })
            .map((response: Response) => {
                // exam successfully fetched
                
                return (response)? response.json() : {};
                
            });
    }


    submitExam(testData) {
        return this.http.post('/exam/submitexam', { testData : testData })
            .map((response: Response) => {
                // exam successfully fetched
                
                return (response)? response.json() : {};
                
                
            });
    }

}