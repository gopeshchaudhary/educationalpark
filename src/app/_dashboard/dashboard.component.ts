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
  public testmessage: string;
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
  public moduleid;
  public storeArray = [];
  public storeArrayFull = [];
  public statusCheckVideo;


  ngOnInit() {
    this.allWatch = false;
    this.firstShowOption = true;
    this.userName = this.userService.getUsername();
    // load module
    this._dashboardCallService.getSectionName(this.userName).subscribe(res => {
      this.sectionName = res;

    },
      error => {
        this.alertService.error(error);

      }

    );
  }
  printmessage(moduleid) {
    this.testmessage =  moduleid + " ."
  }

  // Click for perticular module
  getDataModule(option) {
    this.firstShowOption = false; // hide option box
    this.selectedOption = true; // show videos box
    this._dashboardCallService.moduleSectionDetail(this.userName, option).subscribe(

      result => {
        // Handle result
        this.showVideo = result;
        let totalmodules = result.modules;
        let modulecount = totalmodules.length;
        this.moduleRender(totalmodules);
      },
      error => {
        this.alertService.error(error);

      }
    );
  }

  moduleRender(totalmodules) {
    this.storeArrayFull = [];
    this.testmessage = '';
    totalmodules.forEach((currmodule, index) => {
      let tempArray = [];
      let vList = currmodule.videolist;
      let moduleid = currmodule.moduleid;
      if (currmodule.taketest == "true") {
        this.allWatch = true;
        this.moduleid = moduleid;
        this.printmessage(moduleid);
      }
      for (var key in vList) {
        if (vList.hasOwnProperty(key)) {
          let videoobj = { key: key, moduleid: moduleid, video: vList[key] }
          tempArray.push(videoobj);
        }
      }
      this.storeArrayFull.push(tempArray);
    })
  }


  openDialog(selectedVideo: any, itemData: any, moduleid: any, videoid: any): void {
    if (selectedVideo.status === 'notwatched') {
      this._dashboardCallService.checkFlag(this.userName, moduleid, parseInt(videoid)).subscribe(res => {
        this.statusCheckVideo = res;
        if (res.videoStatus === 'updated') {
          itemData.video.status = 'watched';
        }
        res.allVideo === "true";
        if (res.allVideo === "true") {
          this.allWatch = true;
          this.printmessage(moduleid);
        }
      },
        error => {
          this.alertService.error(error);
        }
      );
    }
    const dialogRef = this.dialog.open(DialogVideoComponent, {
      width: '800px',
      data: selectedVideo
    });

    dialogRef.afterClosed().subscribe(result => {
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

