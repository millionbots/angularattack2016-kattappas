import {Component}  from '@angular/core';
import {LoginComponent} from './login/login.component.ts';
import {ProductsComponent} from "./products.component.ts";

let appTemplate = require('./app.template.html');

@Component({
    selector: 'reviews',
    template: appTemplate,
    directives: [LoginComponent, ProductsComponent]
})
export class ReviewsComponent { }