import {Component}  from '@angular/core';
let loginTemplate = require('./login.template.html');
let styles = require('./login.scss');

@Component({
    selector: 'login',
    template: loginTemplate,
    styles: ['' + styles]
})
export class LoginComponent { 
	public isNewUser: boolean = false;
}