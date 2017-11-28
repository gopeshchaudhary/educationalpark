import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  mobileOtpVerify: boolean;
  loading: boolean;
  registerFlag: boolean;
  thankumessages: boolean;
  headertype = "public";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.registerFlag = true;
    this.mobileOtpVerify = false;
    this.thankumessages = false;
  }

  generateOTP() {
    this.loading = true;
    console.log(this.model);
    this.userService.generateOTP(this.model.username, this.model.phoneNo)
      .subscribe(
      response => {
        this.registerFlag = false;
        this.alertService.success(status);
        this.mobileOtpVerify = true;
      },
      error => {
        error = JSON.parse(error);
        this.alertService.error(error.message);
      });
  }

  VerifyOTP() {
    this.loading = true;
    console.log(this.model);
    this.userService.verifyOTP(this.model.username, this.model.otp).subscribe(
      response => {
        // alert("hii");
        console.log(response);
        if (response.status == "verified") {
          this.sendMail();
        }
        else {
          this.alertService.error("There is some error..Please Try Again");
        }
      },
      error => {
        error = JSON.parse(error);
        this.alertService.error(error.message);
      });
  }

  sendMail() {
    this.loading = true;
    console.log(this.model);
    this.userService.sendMail(this.model.username, this.model.phoneNo, this.model.emailID)
      .subscribe(
      response => {
        if (response.emailsend == "success") {
          this.alertService.success("You have succesfully registered");
          this.mobileOtpVerify = false;
          this.thankumessages = true;
        }
        else {
          this.alertService.error("There is some error..Please Try Again");
        }
      },
      error => {
        error = JSON.parse(error);
        this.alertService.error(error.message);
      });
  }
}
