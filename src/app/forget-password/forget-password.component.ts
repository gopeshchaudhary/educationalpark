import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, UserService } from '../_services/index'; 

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  
  model: any = {};
  loading:boolean;
  firstStepPassword : boolean;
  secondStepPassword : boolean;
  thirdStepPassword : boolean;
  thankumessage : boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.firstStepPassword = false;
    this.secondStepPassword = false;
    this.thirdStepPassword = false;
    this.thankumessage = true;

  }

  firstStepPasswordFunc(){
    
  }

  secondStepPasswordFunc(){

  }

  thirdStepPasswordFunc(){

  }
}
