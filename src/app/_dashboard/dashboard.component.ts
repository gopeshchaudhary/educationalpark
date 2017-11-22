
import { Component, OnInit, Inject } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  animal: string;
  name: string;

  public imageUrlObject = [];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private dialog: MatDialog,
      private alertService: AlertService) { }

  ngOnInit() {
    this.imageUrlObject = [{
      url: 'http://ppwww.filegstnow.com/GST_TRAINING_GSTR1.mp4',
      title: 'GST Video'
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
  }

  openDialog(selectedVideo: any): void {
    const dialogRef = this.dialog.open(DialogVideoComponent, {
      width: '250px',
      data: selectedVideo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-videoplayer-component.html',
})
export class DialogVideoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
