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
  private moduleid;
  public questions; //question initialiize
  public questionOption; //question initialiize
  public questionId; //question initialiize
  
  public quesId = 0;
  private terminateTest;
  public finalTest = false;
  private answerArray = [];
  private storeObj = {};
 public isChecked:any = [];

  constructor(private _examService : ExaminationService, private _urlmanager: UrlManagerService, private _httpServiceObj: ApiManagerService, private alertService: AlertService) { }

  ngOnInit() {
    this.moduleid = 'mod1';
    this._examService.getExam(this.moduleid).subscribe( examObj =>  {
      examObj = examObj[0];
      if(this.moduleid === examObj.moduleid){
        this.examData = examObj.exam;
        console.log(this.examData);
        this.terminateTest = this.examData.length;
      }
    this.init();
    });
  }

  init(): void {
    this.renderQuestion(this.quesId);
  }

  // method for show each question
  renderQuestion(qid){
    this.questionId = this.examData[qid].id;
    this.questions = this.examData[qid].question;
    this.questionOption = this.examData[qid].options;
  }

  // previous click
  prevClick(): void {
    // if(this.quesId){
      this.renderQuestion(--this.quesId);
    // }
  }

  // next click
  nextClick(): void {

    this.isChecked = true;
    // answerArray
    // this.storeObj.id='j';
    var storeObj: {[k: string]: any} = {};
    storeObj.id = this.questionId;
    storeObj.answer = this.radioSelected || "";
    this.answerArray.push(storeObj);
    console.log(this.answerArray);
    
    if(++this.quesId < this.terminateTest ){
      this.renderQuestion(this.quesId);
    }
    // for(var selected in this.answerArray){

    // }
    delete this.radioSelected ;
  }



  submitTest(){
    console.log('TEST IS SUBMITTED');
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
