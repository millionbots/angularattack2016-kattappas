
import {Component, OnInit, OnDestroy}  from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {User} from '../user/user.ts';
import {UserService} from '../user/user.service.ts';

let loginTemplate = require('./login.template.html');
let styles = require('./login.scss');
declare let $: any;

@Component({
    selector: 'login',
    template: loginTemplate,
    styles: ['' + styles]
})
export class LoginComponent extends User implements OnInit { 
	public isNewUser: boolean = false;
    public userName: string;
    public isValidPassword: boolean = false;
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
        this.users = this.userService.getUsers();
    };

    ngOnInit() {
        let _this = this;
        this.users.subscribe(users => {
            _this.usersList = users;
            console.log(users)
        });
        this.userService.getUserStatus().subscribe((userName: string) => console.log(userName));
    }

    login() {
        this.usersList.forEach(user => {
            if (this.loginModel.email === user.email) {
                if (this.loginModel.password === user.password) {
                    console.log('super logged in');
                    $('#geekLoginModal').modal('hide');
                    this.userService.setUser(user);
                } else {
                    console.log('in correct password');
                    return;
                }
            }
        });
    }

    signup() {
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
    
    validatePasswords (element: any) {
        if (this.signupModel.password !== this.signupModel.confirmPassword) {
            $('.pwd').css({border: "1px solid red"});
            this.isValidPassword = false;
        } else {
            $('.pwd').css({border: "1px solid green"});
            this.isValidPassword = true;
        }
    }
}
