import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ReviewsComponent} from './app.component.ts';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';
import {UserService} from './user/user.service.ts';

bootstrap(ReviewsComponent, [ HTTP_PROVIDERS, ROUTER_PROVIDERS,
    UserService,
    FIREBASE_PROVIDERS,
    defaultFirebase('https://reviewsx.firebaseio.com')
 ]);
