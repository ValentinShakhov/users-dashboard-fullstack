import { bootstrapApplication } from '@angular/platform-browser';
import { Dashboard } from './app/dashboard/dashboard';
import {routes} from './app.routes';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch} from '@angular/common/http';

bootstrapApplication(Dashboard, {
  providers: [provideRouter(routes), provideHttpClient(withFetch())]
}).catch(err => console.error());
