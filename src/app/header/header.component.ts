import { Component, OnInit, Input, Inject } from '@angular/core';
// included for modal dialog -- 2 lines
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService, UserService } from '../_services/index';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() header: string;
  public public: boolean;
  model: any = {};
  loading: boolean;
  public resetdiv;
  public thankumessages;

  constructor(
    private dialog: MatDialog,
    private _userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.public = (this.header == 'public') ? true : false; //header type 

    // changing color of header on shrink
    $(window).scroll(function () {
      if ($(document).scrollTop() > 50) {
        $('#nav').addClass('shrink');
      } else {
        $('#nav').removeClass('shrink');
      }
    });
    /*end of header on shrink */

  }
  //get Profile
  getProfile(username) {
    this._userService.getprofile(username).subscribe(profile => {
      this.model.email = profile.emailID;
      this.model.mobile = profile.phoneNo;
      this.model.username = profile.username;
    });
  }

  // get username for getting profile
  static getUsername() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.username) {
      return currentUser.username;
    }
  }

  // Opening DiaLouge for get Profile 
  openProfileDialog(selectedVideo: any): void {
    this.getProfile(HeaderComponent.getUsername());
    const dialogRef = this.dialog.open(DialogProfileComponent, {
      width: '600px',
      data: this.model
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /* end of get Profile */

  // Opening DiaLouge for Reset Password
  openResetPassDialog(selectedVideo: any): void {
    const dialogRef = this.dialog.open(DialogResetPassComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /* End of  Reset Password */

}
// DiaLouge for get Profile
@Component({
  selector: 'app-dialog-overview-profile-dialog',
  templateUrl: 'dialog-profile-component.html',
})
export class DialogProfileComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
/* end of get Profile */

// DiaLouge for Reset Password
@Component({
  selector: 'app-dialog-overview-profile-dialog',
  templateUrl: 'dialog-resetPass-component.html',
})
export class DialogResetPassComponent {
  model: any = {};
  public resetdiv = true;
  public thankumessages = false;
  public passwd: any;
  public confirmed;
  constructor(
    public dialogRef: MatDialogRef<DialogResetPassComponent>,
    private _userService: UserService,
    private alertService: AlertService,

    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  //reset Password
  resetPassword() {
    this._userService.resetPassword(HeaderComponent.getUsername(), this.model.oldpwd, this.model.newpwd).subscribe(
      response => {
        const status = response.status;
        this.alertService.success(status);
        this.thankumessages = true;
        this.resetdiv = false;
      },
      error => {
        error = JSON.parse(error);
        this.alertService.error(error.message);
      }
    );
  }


}
/* End of  Reset Password */