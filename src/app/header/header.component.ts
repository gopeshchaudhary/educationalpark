import { Component, OnInit, Input } from '@angular/core';

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
  }

}
