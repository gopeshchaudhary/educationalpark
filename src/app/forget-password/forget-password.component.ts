import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService, UserService} from '../_services/index';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

    model: any = {};
    loading: boolean;
    firstStepPassword: boolean;
    secondStepPassword: boolean;
    thirdStepPassword: boolean;
    thankumessage: boolean;
    headertype = "public";

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.loading = false;
        this.firstStepPassword = true;
        this.secondStepPassword = false;
        this.thirdStepPassword = false;
        this.thankumessage = false;

    }

    forgetPassword() {
        this.loading = true;
        console.log(this.model);
        this.userService.forgetPassword(this.model.loginname, this.model.email)
            .subscribe(
                response => {
                    if (response.reset == "success") {
                        this.alertService.success("You have succesfully reset the password",true);
                        //this.mobileOtpVerify = false;
                        this.firstStepPassword = false;
                        this.thankumessage = true;
                    }
                    else {
                        this.alertService.error("There is some error..Please Try Again");
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }

    firstStepPasswordFunc() {

    }

    secondStepPasswordFunc() {

    }

    thirdStepPasswordFunc() {

    }
}
