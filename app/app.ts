import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

import {ReviewsComponent} from './app.component.ts';

bootstrap(ReviewsComponent, [ HTTP_PROVIDERS ]);