
import {Component, OnInit, OnDestroy}  from '@angular/core';
import { FormBuilder, ControlGroup, Control, Validators } from '@angular/common';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {User} from '../user/user.ts';
import {UserService} from '../user/user.service.ts';

let loginTemplate = require('./login.template.html');
let styles = require('./login.scss');
declare let $: any;

interface ISignupForm {
    userName?: Control;
    password?: Control;
    confirmPassword?: Control;
    email?: Control;
}

interface ILoginForm {
    userName?: Control;
    password?: Control;
}

interface ValidationResult {
    [key: string]: boolean;
}

interface ValidatorFn { (c: Control): { [key: string]: any }; }
interface AsyncValidatorFn {
    (c: Control): any /*Promise<{[key: string]: any}>|Observable<{[key: string]: any}>*/;
}

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

    private valueMatchesWith(valueToMatch: string): ValidatorFn {
        return (control: Control) => {
            if (control.value !== valueToMatch) {
                return { "valueMatcher": { "requiredValue": valueToMatch, "actualValue": control.value } };
            }

            return null;
        };
    }

    private userExists(af: any): AsyncValidatorFn {
        var users: FirebaseListObservable <any[]> = af.database.list('/users');
        
        return (control: Control) => {
            return users.subscribe((usersInFirebase: any) => {
                for (var user of usersInFirebase) {
                    if (user.email === control.value) {
                        return { "userExists": { "userAlreadyExists": true } };
                    }
                }

                return null;
            });
        };
    }
}
