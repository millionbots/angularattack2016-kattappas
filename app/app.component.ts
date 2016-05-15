import {Component} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import {DashboardComponent} from './dashboard/dashboard.component.ts';
import {LoginComponent} from './login/login.component.ts';
import {ProductsComponent} from "./gadgets/products.component.ts";

let appTemplate = require('./app.template.html');
let styles = require('./header.scss');

@Component({
    selector: 'reviews',
    template: appTemplate,
    styles: ['' + styles],
    directives: [LoginComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
    path: '/gadgets',
    name: 'Gadgets',
    component: ProductsComponent
  },
  {
    path: '/',
    name: 'Home',
    component: DashboardComponent,
    useAsDefault: true
  }
])
export class ReviewsComponent { }
