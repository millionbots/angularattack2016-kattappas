import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {Component} from "@anglar/core";

import {ProductsComponent} from "./gadgets/products.component.ts";
import {ReviewsComponent} from './app.component.ts';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


bootstrap(ReviewsComponent, [ HTTP_PROVIDERS, ROUTER_PROVIDERS ]);
