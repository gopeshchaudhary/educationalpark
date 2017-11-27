import { Component, OnInit, Input, Inject } from '@angular/core';
// included for modal dialog -- 2 lines
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() header: string;
  public public:boolean;
  public allFlag: boolean;
  public imageUrlObject = [];
  private count = 0;
  model: any = {};
  loading:boolean;
  
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.public = (this.header=='public') ? true:false;

    $(window).scroll(function() {
      if ($(document).scrollTop() > 50) {
        $('#nav').addClass('shrink');
      } else {
        $('#nav').removeClass('shrink');
      }
    });
  }

  openProfileDialog(selectedVideo: any): void {
    const dialogRef = this.dialog.open(DialogProfileComponent, {
      width: '600px',
     //data: selectedVideo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openResetPassDialog(selectedVideo: any): void {
     const dialogRef = this.dialog.open(DialogResetPassComponent, {
       width: '600px',
     });
 
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
     });
   }

}

@Component({
  selector: 'app-dialog-overview-profile-dialog',
  templateUrl: 'dialog-profile-component.html',
})
export class DialogProfileComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public profile: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateProfile(){
     console.log('udpated profile .......');
  }
}

@Component({
  selector: 'app-dialog-overview-profile-dialog',
  templateUrl: 'dialog-resetPass-component.html',
})
export class DialogResetPassComponent {
  model: any = {};
  constructor(
    public dialogRef: MatDialogRef<DialogResetPassComponent>,
    @Inject(MAT_DIALOG_DATA) public profile: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  resetPassword(){
     console.log('Password reset.......');
  }
}