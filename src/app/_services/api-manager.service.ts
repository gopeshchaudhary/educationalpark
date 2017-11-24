import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
@Injectable()
export class ApiManagerService {

  constructor(private http: HttpClient) { }

  private url: string;
  private methodtype: string;
  private method: string;
  private body: Object;
  private response: any;

  // function is used to call the http service and get and post data 

  doHttpRequest(url, method = 'POST', body = {}): any {
    this.methodtype = method.toUpperCase();
    this.url = url;
    if (body) {
      console.log('INVALID REQUEST : [ERROR] - FAILED TO SEND REQUEST');
      body = this.body;
      this.body = JSON.stringify(body);
    } else {
      console.log("METHOD :" + this.methodtype + " url : " + this.url + " Response : " + this.response);
    }
    this.response = this.internetGateway();
    return this.response;
  }

  // function for call get post put method of http service object
  internetGateway(): any {
    switch (this.methodtype) {
      case 'GET':
        return this.http.get(this.url, {
          withCredentials: true,
          headers: new HttpHeaders().set('Authorization', 'some-token')
        }).subscribe(
          this.httpResponse,
          (error: HttpErrorResponse) => {
            return error.error;
          }
          );
      case 'POST':
        return this.http.post(this.url, this.body, {params: new HttpParams().set('id', '56784')}).subscribe(
          this.httpResponse,
          (error: HttpErrorResponse) => {
            return error.error;
          }
          );
      case 'PUT':
        return this.http.put(this.url, this.body,{params: new HttpParams().set('id', '56784')}).subscribe(
          this.httpResponse,
          (error: HttpErrorResponse) => {
            return error.error;
          }
          );
      default:
        return 'Invalid Method Request : 400 Method (' + this.methodtype + ') not allowed ';
    }
  }

  httpResponse(res: Response) {
    return res;
  }
}
