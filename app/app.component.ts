import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {DashboardComponent} from './dashboard/dashboard.component.ts';
import {LoginComponent} from './login/login.component.ts';
import {ProductsComponent} from "./products/products.component.ts";
import {ProductsService} from "./products/products.service.ts";
import {ProductDetailsComponent} from "./productDetails/productdetails.component.ts";
import {ProfileComponent} from './profile/profile.component.ts';
import {User} from './user/user.ts';
import {UserService} from './user/user.service.ts';

let appTemplate = require('./app.template.html');
let styles = require('./main.scss');

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
    path: '/profile',
    name: 'Profile',
    component: ProfileComponent
  },
  {
    path: '/',
    name: 'Home',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/productDetails/:id/:category',
    name: 'ProductDetails',
    component: ProductDetailsComponent
  }
])
export class ReviewsComponent extends User { 

  constructor(private userSvc: UserService){
    super(userSvc);
  }

  logout(){
    this.userSvc.clearUser();
    this.userName=null;
    this.email=null;
  }
}