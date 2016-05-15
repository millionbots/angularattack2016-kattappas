import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

import {ProductsComponent} from "./gadgets/products.component.ts";
import {ReviewsComponent} from './app.component.ts';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

bootstrap(ReviewsComponent, [ HTTP_PROVIDERS, ROUTER_PROVIDERS,
    FIREBASE_PROVIDERS,
    defaultFirebase('https://reviewsx.firebaseio.com')
 ]);
