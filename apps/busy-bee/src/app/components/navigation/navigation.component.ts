import { Component, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
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
  displayName?: string;

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

  showNavbar = true;
  lastScrollPosition = 0;

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentScrollPosition = window.scrollY;

    this.showNavbar = currentScrollPosition <= this.lastScrollPosition;

    this.lastScrollPosition = currentScrollPosition;
  }

  ngOnInit(): void {
    this.categoryService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((model) => {
        this.categories = model;
      });

    if (this.authService.isAuthenticated) {
      this.userService
        .me()
        .pipe(untilDestroyed(this))
        .subscribe((userModel) => {
          this.authenticated = true;
          this.displayName = `${userModel.name} ${userModel.surname}`;
          if (userModel.photoFilename)
            this.avatarUrl = environment.endpoint + userModel.photoFilename;
        });
    }
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authenticated = authService.isAuthenticated;
  }

  login() {
    this.authService
      .login()
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.userService
          .afterLogin()
          .pipe(untilDestroyed(this))
          .subscribe((userModel) => {
            this.authenticated = true;
            this.displayName = `${userModel.name} ${userModel.surname}`;
            if (userModel.photoFilename)
              this.avatarUrl = environment.endpoint + userModel.photoFilename;
          });
      });
  }

  logout() {
    this.authService
      .logout()
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.authenticated = false;
      });
  }
}
