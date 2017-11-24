
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
  public showFlag: boolean;
  public allFlag: boolean;
  headertype: 'private';
  public imageUrlObject = [];
  private count= 0;

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
      title: 'GST Video',
      showFlag: false,
      imageSrc: '../../assets/img/gstTraining.png'
    },
    {
      url: 'https://assets.techsmith.com/Images/content/ua-tutorials-camtasia-9-3/hotshot-transitions1x1.png',
      title: 'Gst video 2 ',
      showFlag: false,
      imageSrc: '../../assets/img/gst2Training.png'
    },
    {
      url: 'https://assets.techsmith.com/Images/content/ua-tutorials-camtasia-9-3/hotshot-animations1x1.png',
      title: 'Gst Video 3',
      showFlag: false,
      imageSrc: '../../assets/img/gst2Training.png'
    }
  ];
    // jquery setup for form
    // $('.toggle').on('click', function() {
    //   $('.container').stop().addClass('active');
    // });

    // $('.close').on('click', function() {
    //   $('.container').stop().removeClass('active');
    // });
  }

  openDialog(selectedVideo: any): void {
    selectedVideo.showFlag = true;
    this.count++;
    this.allFlag = (this.count===this.imageUrlObject.length)?true:false;
    const dialogRef = this.dialog.open(DialogVideoComponent, {
      width: '800px',
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
