import {Component, HostListener, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {environment} from "../../../environments/environment";
import {UserModel} from "../../models/user/user.model";

@UntilDestroy()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isPopoverOpen: boolean = false;
  isAdditionalPopoverOpen: boolean = false;
  dropdownItems: string[] = []; // First list items
  additionalItems: string[] = []; // Additional list items
  currentSelectedItem: string = ''; // To track the selected item in the first list
  categories: any;

  authenticated: boolean;
  avatarUrl?: string;
  id?: string;
  displayName?: string;
  searchText?: string;

  togglePopover() {
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  toggleAdditionalPopover(event: Event) {
    event.stopPropagation();
    this.isAdditionalPopoverOpen = !this.isAdditionalPopoverOpen;
  }

  handleFirstListClick(item: string) {
    this.currentSelectedItem = item;
  }

  openAdditionalPopover(item: string, event: Event) {
    event.stopPropagation();
    this.currentSelectedItem = item;
    this.isAdditionalPopoverOpen = true;
  }

  homepage() {
    this.router.navigate(['/home']);
  }

  onSearch() {
    this.router.navigate(['/search-page'], {queryParams: {q: this.searchText}});
    this.searchText = '';
  }

  userpage() {
    this.router.navigate(['/user'], {queryParams: {q: this.id}});
  }

  showNavbar = true;
  lastScrollPosition = 0;

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentScrollPosition = window.scrollY;

    this.showNavbar = currentScrollPosition <= this.lastScrollPosition;

    this.lastScrollPosition = currentScrollPosition;
  }

  ngOnInit(): void {
    this.categoryService.getAll().pipe(untilDestroyed(this)).subscribe(model => {
      this.categories = model;
    });

    if (this.authService.isAuthenticated) {
      this.userService.me().pipe(untilDestroyed(this)).subscribe(userModel => {
        this.auth(userModel);
      });
    }
  }

  constructor(private categoryService: CategoryService,
              private router: Router,
              private _formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService) {
    this.authenticated = authService.isAuthenticated;
  }

  login() {
    this.authService.login()
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        this.userService.afterLogin().pipe(untilDestroyed(this)).subscribe(userModel => {
          this.auth(userModel);
        });
      });
  }

  auth(userModel: UserModel) {
    this.authenticated = true;
    this.displayName = `${userModel.name} ${userModel.surname}`;
    this.id = userModel.id;
    if (userModel.photoFilename) this.avatarUrl = environment.endpoint + userModel.photoFilename;
  }

  logout() {
    this.authService.logout()
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        this.authenticated = false;
      });
    this.router.navigate(['home']);
  }
}
