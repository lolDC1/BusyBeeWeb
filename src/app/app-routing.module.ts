import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {CategoryWorkersPageComponent} from "./pages/category-workers-page/category-workers-page.component";
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {OrderCreatePageComponent} from "./pages/order-create-page/order-create-page.component";
import {BrowserUtils} from "@azure/msal-browser";
import {UserPageComponent} from "./pages/user-page/user-page.component";
import { CategoryTaskPageComponent } from './pages/category-task-page/category-task-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: '',   redirectTo: 'home', pathMatch: 'full' },
  {path: 'admin-panel', component: NavigationComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'workers-page', component: CategoryWorkersPageComponent},
  {path: 'search-page', component: SearchPageComponent},
  {path: 'order-page/:id', component: OrderCreatePageComponent},
  {path: 'task-page/:id', component: TaskPageComponent},
  {path: 'user', component: UserPageComponent},
  {path: 'category-page/:id', component: CategoryTaskPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation:
      !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
        ? "enabledNonBlocking"
        : "disabled", // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
