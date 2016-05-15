import {OnInit}  from '@angular/core';
import {UserService} from './user.service.ts';
let subscriber: any;
export class User implements OnInit {
    public userName: string;
    public email: string;

    constructor(protected userSrv: UserService) {
        this.userName = localStorage.getItem("userName");
        this.email = localStorage.getItem("email");
    }

    ngOnInit() {
        let _this = this;
        subscriber = this.userSrv.getUserStatus().subscribe((userName: string) => {
            _this.userName = userName;
            console.log(userName)
        });
    }

}
