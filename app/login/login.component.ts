import {Component, OnInit}  from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs';
import {AuthMethods, AuthProviders} from 'angularfire2';

let loginTemplate = require('./login.template.html');
let styles = require('./login.scss');
declare let $:any;
@Component({
    selector: 'login',
    template: loginTemplate,
    styles: ['' + styles]
})
export class LoginComponent implements OnInit { 
	public isNewUser: boolean = false;
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
    constructor (af: AngularFire) {
        this.users = af.database.list('/users');
    }
    ngOnInit () {
        let _this = this;
        this.users.subscribe(users => {
            _this.usersList = users; console.log(users)
        });
    }
    login () {
        this.usersList.forEach(user => {
            if (this.loginModel.email === user.email) {
                if (this.loginModel.password === user.password) {
                    console.log('super logged in');
                    localStorage.setItem("userName", user.userName);
                    $('#geekLoginModal').modal('hide');
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