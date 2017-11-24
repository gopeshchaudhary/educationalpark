import { Component, OnInit } from '@angular/core';
import { UrlManagerService } from '../_services/url-manager.service';
import { ApiManagerService } from '../_services/api-manager.service';
import { AlertService } from '../_services/index';


@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  public examData: Array<Object>;
  headertype = 'private';
  public examResponse: any;
  public radioSelected = [];


  constructor(private _urlmanager: UrlManagerService, private _httpServiceObj: ApiManagerService , private alertService: AlertService) { }

  ngOnInit() {
    this.examData = [{
      ques: 'what is your name',
      options: ['a', 'b', 'c', 'd']
    }, {
      ques: 'what is your current Project',
      options: ['a', 'b', 'c', 'd']
    }, {
      ques: 'have you kiwi ',
      options: ['a', 'b', 'c', 'd']
    }, {
      ques: 'have you mohan ',
      options: ['a', 'b', 'c', 'd']
    }, {
      ques: 'have you kiwi ',
      options: ['a', 'b', 'c', 'd']
    }];
  }
  // function is used to call the service
  // @input : E- Exam Detail , Type:Get, Type Get:Exam

  getExamDetail(Obj): void {
    const examUrl = this._urlmanager.resolveUrl('E', 'G', 'Exam');
    const method = 'GET';
    const body = Obj;
    this._httpServiceObj.doHttpRequest(examUrl, method, body).subscribe(res => {
      console.log(res);
      this.alertService.success('Succefully Get data');
      this.examResponse = res;
    }, (err) => {this.alertService.error(err);
    }
  );

  }

  submitExam() {
    const examUrl = this._urlmanager.resolveUrl('E', 'PO', 'submitExam');
    const method = 'POST';
    //const body = Obj;
    console.log(this.radioSelected);
    this._httpServiceObj.doHttpRequest(examUrl, method).subscribe(res => {
      console.log(res);
      this.alertService.success('Succefully Get data');
      this.examResponse = res;
    }, (err) => {this.alertService.error(err);
    }
  );
  }

}
