import { Component, OnInit, Input } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() header: string;
  public public:boolean;
  constructor() { }

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

}
