import {Component} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component.ts';
let appTemplate = require('./app.template.html');
let styles = require('./header.scss');

@Component({
    selector: 'reviews',
    template: appTemplate,
    styles: ['' + styles],
    directives: [DashboardComponent]
})
export class ReviewsComponent { }
