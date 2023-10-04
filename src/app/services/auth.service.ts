import {Injectable} from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {AccountInfo, AuthenticationResult} from "@azure/msal-browser";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private msalService: MsalService) {
  }

  public get isAuthenticated(): boolean {
    return this.getAccount() !== null;
  }

  public get id(): string | null {
    return this.getAccount()?.localAccountId ?? null;
  }

  public get email(): string | null {
    return this.getAccount()?.name ?? null;
  }

  public logout(): Observable<void> {
    return this.msalService.logoutPopup();
  }

  public login(): Observable<AuthenticationResult> {
    return this.msalService.loginPopup();
  }

  private getAccount(): AccountInfo | null {
    return this.msalService.instance.getActiveAccount();
  }
}
