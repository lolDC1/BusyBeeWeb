import {Component, OnInit} from '@angular/core';
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";
import {EventMessage, EventType, InteractionStatus} from "@azure/msal-browser";
import {filter} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  title = 'busy-bee';
  isIframe = false;

  constructor(private broadcastService: MsalBroadcastService, private msalService: MsalService) {
  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
      .pipe(untilDestroyed(this), filter((status: InteractionStatus) => status === InteractionStatus.None))
      .subscribe(_ => {
        this.checkAndSetActiveAccount();
      });

    this.broadcastService.msalSubject$
      .pipe(
        untilDestroyed(this),
        filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE)
      ).subscribe((result: EventMessage) => {
      this.msalService.logoutPopup();
    });
  }

  private checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     */
    let activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      this.msalService.instance.setActiveAccount(this.msalService.instance.getAllAccounts()[0]);
    }
  }
}
