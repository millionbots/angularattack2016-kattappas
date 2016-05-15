import {Component, OnInit, OnDestroy}  from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {User} from '../user/user.ts';
import {UserService} from '../user/user.service.ts';

let loginTemplate = require('./login.template.html');
let styles = require('./login.scss');
declare let $:any;
@Component({
    selector: 'login',
    template: loginTemplate,
    styles: ['' + styles]
})
export class LoginComponent extends User implements OnInit { 
	public isNewUser: boolean = false;
    public userName: string;
    users: FirebaseListObservable <any[]>;
    usersList: any[];
    loginModel: any = {
        'email': '',
        'password': ''
    };
    signupModel: any = {
        'userName': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    }
    constructor (af: AngularFire, private userService: UserService) {
        super(userService);
        this.users = af.database.list('/users');
    }
    ngOnInit () {
        let _this = this;
        this.users.subscribe(users => {
            _this.usersList = users;
            console.log(users)
        });
        this.userService.getUserStatus().subscribe((userName: string) => console.log(userName));
    }
    login () {
        this.usersList.forEach(user => {
            if (this.loginModel.email === user.email) {
                if (this.loginModel.password === user.password) {
                    console.log('super logged in');
                    $('#geekLoginModal').modal('hide');
                    this.userService.setUserName(user.userName);
                } else {
                    console.log('in correct password');
                    return;
                }
            }
        });
    }
    signup () {
        let flag = true;
        this.usersList.forEach(user => {
            if (this.loginModel.email === user.email) {
                flag = false;
            }
        });
        if (flag) {
            let user = this.signupModel;
            delete user.confirmPassword;
            this.users.push(user);
            this.isNewUser = false;
        }
    }
}