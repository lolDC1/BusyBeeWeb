import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdDropdownForm} from './components/dropdown/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {SelectCategory} from "./select.category";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Template} from "./components/category_template/template";
import {HomePageComponent} from './pages/home-page/home-page.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ScrollSpyAffixModule, ScrollSpyModule} from 'ngx-scrollspy';
import {MatMenuModule} from "@angular/material/menu";
import {FooterComponent} from './components/footer/footer.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CategoryCardTemplateComponent} from './components/category-card-template/category-card-template.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {CategoryWorkersPageComponent} from './pages/category-workers-page/category-workers-page.component';
import {WorkerPreviewComponent} from './components/worker-preview/worker-preview.component';
import {StepperComponent} from './components/stepper/stepper.component';
import {MatStepperModule} from "@angular/material/stepper";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {OrderCreatePageComponent} from './pages/order-create-page/order-create-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {InteractionType, PublicClientApplication} from "@azure/msal-browser";
import {environment} from "../environments/environment";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatNativeDateModule} from "@angular/material/core";
import {MsalModule} from "@azure/msal-angular";
import {MsalSkipInterceptor} from "./interceptors/msal.interceptor";
import {DynamicCheckboxComponent} from './components/dynamic-field/dynamic-checkbox/dynamic-checkbox.component';
import {DynamicRadioComponent} from './components/dynamic-field/dynamic-radio/dynamic-radio.component';
import {DynamicInputComponent} from './components/dynamic-field/dynamic-input/dynamic-input.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { UserPageComponent } from './pages/user-page/user-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryTaskPageComponent } from './pages/category-task-page/category-task-page.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationComponent,
    FooterComponent,
    LoginPageComponent,
    CategoryCardTemplateComponent,
    SearchPageComponent,
    CategoryWorkersPageComponent,
    WorkerPreviewComponent,
    StepperComponent,
    OrderCreatePageComponent,
    DynamicCheckboxComponent,
    DynamicRadioComponent,
    DynamicInputComponent,
    UserPageComponent,
    CategoryTaskPageComponent,
    TaskPreviewComponent,
    TaskPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbdDropdownForm,
    BrowserAnimationsModule,
    ScrollSpyModule.forRoot(),
    MatInputModule,
    MatSelectModule,
    FormsModule,
    Template,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    ScrollSpyAffixModule,
    MatMenuModule,
    MatStepperModule,
    ReactiveFormsModule,
    CarouselModule,
    SlickCarouselModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    NgSelectModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.clientId,
          authority: environment.authority,
          redirectUri: environment.redirectUri,
          knownAuthorities: [environment.authorityDomain]
        },
        cache: {
          cacheLocation: 'localStorage'
        }
      }),
      null!,
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          [environment.endpoint, environment.endpointScopes]
        ])
      }
    ),
    MatCheckboxModule,
    MatTabsModule
  ],
  providers: [
    SelectCategory,
    {provide: HTTP_INTERCEPTORS, useClass: MsalSkipInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
