import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {DashboardComponent} from './dashboard/dashboard.component.ts';
import {LoginComponent} from './login/login.component.ts';
import {ProductsComponent} from "./products/products.component.ts";
import {ProductsService} from "./products/products.service.ts";
import {ProductDetailsComponent} from "./productDetails/productdetails.component.ts";

let appTemplate = require('./app.template.html');
let styles = require('./header.scss');

@Component({
    selector: 'reviews',
    template: appTemplate,
    styles: ['' + styles],
    providers: [ProductsService],
    directives: [LoginComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
    path: '/products',
    name: 'Products',
    component: ProductsComponent
  },
  {
    path: '/',
    name: 'Home',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/productDetails/:id',
    name: 'ProductDetails',
    component: ProductDetailsComponent
  }
])
export class ReviewsComponent { }