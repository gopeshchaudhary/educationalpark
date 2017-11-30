import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// included for modal dialog -- 2 lines
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertService, AuthenticationService, UserService, dashboardService } from '../_services/index';



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
  public allWatch: boolean;
  headertype: 'private';
  public imageUrlObject = [];
  private count = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private _dashboardCallService: dashboardService
  ) { }

  // selected option
  public firstShowOption;
  public selectedOption;
  private userName;
  public sectionName: any;
  public showVideo;
  public moduleVideo;
  public begin = 0;
  public vList;
  public moduleid;
  public storeArray = [];
  public statusCheckVideo;
  

  ngOnInit() {
    this.allWatch = false;
    this.firstShowOption = true;
    this.userName = this.userService.getUsername();
    // load module
    this._dashboardCallService.getSectionName(this.userName).subscribe(res => {
      console.log(res);
      this.sectionName = res;

    },
    error => {
      console.log(error);
      this.alertService.error(error);
      
    }
  
  );


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

  // Click for perticular module
  getDataModule(option) {
    this.firstShowOption = false; // hide option box
    this.selectedOption = true; // show videos box

    this._dashboardCallService.moduleSectionDetail(this.userName, option).subscribe(

      result => {
        // Handle result
        console.log(result);
        this.showVideo = result;
        this.moduleRender(this.begin);
      },
      error => {
        console.log(error);
        this.alertService.error(error);

      }
    );
  }

  moduleRender(begin) {
    this.allWatch = false;
    this.moduleVideo = this.showVideo.modules;
    this.vList = this.moduleVideo[begin].videolist;
    this.moduleid = this.moduleVideo[begin].moduleid;

    for (var key in this.vList) {
      
      if (this.vList.hasOwnProperty(key)) {
        // console.log(key);

        this.storeArray.push({key:key,video:this.vList[key]});
      }
    }
    console.log(this.storeArray);
  }
  

  openDialog(selectedVideo: any,itemData:any): void {
    console.log(selectedVideo,itemData);
    this._dashboardCallService.checkFlag(this.userName, this.moduleid, parseInt(selectedVideo)).subscribe(res => {
      console.log(res);
      this.statusCheckVideo = res;
      if(res.videoStatus==='updated'){
        itemData.video.status = 'watched';
      }
      res.allVideo === "true";
      if(res.allVideo === "true"){
        this.allWatch = true;
      }

      
      // videoStatus

    },
    error => {
      console.log(error);
      this.alertService.error(error);
      
    }
  );

    // this.count++;
    // this.allFlag = (this.count === this.imageUrlObject.length) ? true : false;
    const dialogRef = this.dialog.open(DialogVideoComponent, {
      width: '800px',
      data: selectedVideo
    });

    dialogRef.afterClosed().subscribe(result => {

    //  selectedVideo.video.status = this.statusCheckVideo.videoStatus;
      console.log('The dialog was closed');
    });
  }

  // Back to module
  backTo() {
    this.storeArray = [];
    this.firstShowOption = true; // hide option box
    this.selectedOption = false; // show videos box
  }


}
//open dialouge
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



