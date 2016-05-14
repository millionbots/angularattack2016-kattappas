import {Component} from 'angular2/core';
import {LoginComponent} from './login/login.component.ts';
let appTemplate = require('./app.template.html');

@Component({
    selector: 'reviews',
    template: appTemplate,
    directives: [LoginComponent]
})
export class ReviewsComponent { }