import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { MsalInterceptor } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class MsalSkipInterceptor
  extends MsalInterceptor
  implements HttpInterceptor
{
  private excludedEndpoint = ['categories', 'cities', 'review'];

  override intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    for (let endpoint of this.excludedEndpoint) {
      // Add the desired endpoint URL here that you want to exclude from interception
      const excludedEndpoint = environment.endpoint + endpoint;
      if (request.url.includes(excludedEndpoint)) {
        // Skip interception for the excluded endpoint
        return next.handle(request);
      }
    }
    // Intercept other requests
    return super.intercept(request, next);
  }
}
