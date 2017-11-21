
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, UserService } from '../_services/index';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  public imageUrlObject = [];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService) { }

  ngOnInit() {
    this.imageUrlObject = [{
      url: 'https://assets.techsmith.com/Images/content/ua-tutorials-camtasia-9-3/hotshot-rec1x1.png',
      title: 'Ankur'
    },
    {
      url: 'https://assets.techsmith.com/Images/content/ua-tutorials-camtasia-9-3/hotshot-transitions1x1.png',
      title: 'Gopesh'
    },
    {
      url: 'https://assets.techsmith.com/Images/content/ua-tutorials-camtasia-9-3/hotshot-animations1x1.png',
      title: 'Madhu'
    }
  ];
    // jquery setup for form
    $('.toggle').on('click', function() {
      $('.container').stop().addClass('active');
    });

    $('.close').on('click', function() {
      $('.container').stop().removeClass('active');
    });
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
  }

  register() {
    this.loading = true;
    this.userService.create(this.model)
        .subscribe(
            data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/login']);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
  }
}
