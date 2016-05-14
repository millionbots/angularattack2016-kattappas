import {Component} from 'angular2/core';
let dashboardTemplate = require('./dashboard.template.html');
let styles = require('./dashboard.scss');

@Component({
    selector: 'dashboard',
    template: dashboardTemplate,
    styles: ['' + styles]
})
export class DashboardComponent { }
