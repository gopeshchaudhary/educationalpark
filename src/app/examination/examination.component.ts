import { Component, OnInit } from '@angular/core';
import { UrlManagerService } from '../_services/url-manager.service';
import { ApiManagerService } from '../_services/api-manager.service';
import { AlertService, ExaminationService } from '../_services/index';


@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  public examData: any;
  headertype = 'private';
  public examResponse: any;
  public radioSelected = [];

  constructor(private _examService: ExaminationService, private _urlmanager: UrlManagerService, private _httpServiceObj: ApiManagerService, private alertService: AlertService) { }

  ngOnInit() {
    this._examService.getExam('mod1').subscribe(exam => {
      this.examData = exam;
      this.showExamdata();
    });
  }
  showExamdata() {
    console.log(JSON.stringify(this.examData[0]));
  }
  // function is used to call the service
  // @input : E- Exam Detail , Type:Get, Type Get:Exam

  // getExamDetail(Obj): void {
  //   const examUrl = this._urlmanager.resolveUrl('E', 'G', 'Exam');
  //   const method = 'GET';
  //   const body = Obj;
  //   this._httpServiceObj.doHttpRequest(examUrl, method, body).subscribe(res => {
  //     console.log(res);
  //     this.alertService.success('Succefully Get data');
  //     this.examResponse = res;
  //   }, (err) => {
  //     this.alertService.error(err);
  //   }
  //   );

  // }

  // var count = 0;

  init(): void {
    for (var i = 0; i < this.examData.length; i++) {
      var output = this.examData[i];
    }
  }
  // init();

  // previous click
  prevClick(): void {

  }

  // previous click
  nextClick(): void {

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
    }, (err) => {
      this.alertService.error(err);
    }
    );
  }

}
