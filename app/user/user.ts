import {OnInit, OnDestroy}  from '@angular/core';
import {UserService} from './user.service.ts';
let subscriber: any;
export class User implements OnInit, OnDestroy { 
    public userName: string;
    constructor (private userSrv: UserService) {
        this.userName = localStorage.getItem("userName")
    }
    ngOnInit () {
        let _this = this;
        subscriber = this.userSrv.getUserStatus().subscribe((userName: string) => {
            _this.userName = userName;
            console.log(userName)
        });
    }
    ngOnDestroy () {
        subscriber.dispose();
    }
}