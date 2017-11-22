import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, UserService } from '../_services/index'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  mobileOtpVerify:boolean;
  loading:boolean;
  registerFlag:boolean;
  thankumessages:boolean;

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

  register() {
    this.loading = true;
    console.log(this.model);
    this.userService.create(this.model)
      .subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        // this.mobileOtpVerify = true;
        // this.registerFlag = false;
        this.loading = false;
        //this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
  mobileotpVerifyFunc() {
    this.loading = true;
  }

}
