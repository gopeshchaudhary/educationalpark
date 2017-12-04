import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    //moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    headertype ="public";

    constructor(private userService: UserService) {
       
    }

    ngOnInit() {
        
    }
}