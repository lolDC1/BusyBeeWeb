import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserModel} from "../../models/user/user.model";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Genders} from "../../enums/genders.enum";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListItem} from "../../models/base/list-item";
import {CityService} from "../../services/city.service";
import { CategoryService } from '../../services/category.service';

@UntilDestroy()
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  notSetText = "(not set)";
  authUserId?: string;
  domainUrl: string;
  isOwner: boolean = false;

  userId?: string;
  userModel?: UserModel;
  photoUrl?: string;
  genderViewValue?: string;

  uploadForm: FormGroup;

  genders = [
    {value: Genders.Female, viewValue: 'Жiноча'},
    {value: Genders.Male, viewValue: 'Чоловiча'}]

  form: FormGroup<{
    name: FormControl<string>,
    surname: FormControl<string>,
    cityId: FormControl<string | null>,
    birthday: FormControl<Date | null>,
    gender: FormControl<Genders | null>,
    phone: FormControl<string | null>,
    contactEmail: FormControl<string | null>,
    aboutMyself: FormControl<string | null>,
    videoLink: FormControl<string | null>,
  }>

  cities: ListItem[] = [];

  categories?: any;
  mergedChildren: any[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private cityService: CityService,
              private fb: FormBuilder,
              private categoryService: CategoryService) {
    if (authService.isAuthenticated) {
      this.authUserId = this.authService.id!;
    }

    this.domainUrl = `https://${window.location.hostname}`;

    this.uploadForm = this.fb.group({
      profileFile: ['']
    });
    this.form = new FormGroup({
      name: new FormControl("", {nonNullable: true, validators: [Validators.required]}),
      surname: new FormControl("", {nonNullable: true, validators: [Validators.required]}),
      cityId: new FormControl<string | null>(null),
      birthday: new FormControl<Date | null>(null),
      gender: new FormControl<Genders | null>(null),
      phone: new FormControl<string | null>(null),
      contactEmail: new FormControl<string | null>(null, [Validators.email]),
      aboutMyself: new FormControl<string | null>(null),
      videoLink: new FormControl<string | null>(null, [Validators.pattern("^https?:\\/\\/(.*)")]),
    });

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['q'];

    if (!this.userId)
      console.log("Not found user id in query params")

    this.userService.getById(this.userId!).pipe(untilDestroyed(this)).subscribe(model => {
      this.userModel = model;
      this.isOwner = this.authUserId == this.userId;

      this.genderViewValue = this.genders.find(x => x.value == this.userModel!.gender)?.viewValue ?? this.notSetText;
      this.photoUrl = this.userModel.photoFilename
        ? this.domainUrl + this.userModel.photoFilename
        : 'assets/img/banner.png';

      this.form.setValue({
        name: model.name,
        surname: model.surname,
        cityId: model.cityId ?? null,
        birthday: model.birthday ? new Date(model.birthday) : null,
        gender: model.gender ?? null,
        phone: model.phone ?? null,
        contactEmail: model.contactEmail ?? null,
        aboutMyself: model.aboutMyself ?? null,
        videoLink: model.videoLink ?? null
      });
      this.categoryService.getAll().pipe(untilDestroyed(this)).subscribe(model => {
        this.categories = model;
        this.mergeChildren(this.categories);
        console.log(model);
      });

    });

    this.cityService.autocomplete().pipe(untilDestroyed(this))
      .subscribe(items => this.cities = items);
  }

  mergeChildren(items: any[]): void {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        this.mergedChildren = this.mergedChildren.concat(item.children);
        this.mergeChildren(item.children);
      }
    }
  }
  orderCategoryPage(category: any) {
    console.log(this.mergedChildren);
    for (let i = 0; i < this.mergedChildren.length; i++) {
      if (this.mergedChildren[i].title === category){
        this.router.navigate(['/category-page/' + this.mergedChildren])
      }
    }
    //this.router.navigate()
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profileFile')!.setValue(file);
    }
  }

  uploadPortfolio() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profileFile')!.value);

    this.userService.uploadPortfolioFile(formData).pipe(untilDestroyed(this))
      .subscribe({
        next: _ => {
          console.log("Portfolio file is uploaded");
          window.location.reload();
        },
        error: _ => console.log("ERROR: Portfolio file is NOT uploaded")
      });
  }

  downloadPortfolio(id: string) {
    window.open(this.domainUrl + this.userModel!.portfolioFiles.find(x => x.id == id)!.url);
  }

  removePortfolio(id: string) {
    this.userService.removePortfolioFile(id).pipe(untilDestroyed(this))
      .subscribe(_ => {
        this.userModel!.portfolioFiles = this.userModel!.portfolioFiles.filter(x => x.id != id);
      });
  }

  updateImage(event: any) {
    if (event.target.files.length == 0) return;

    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('file', file);

    this.userService.uploadPhoto(formData).pipe(untilDestroyed(this))
      .subscribe({
        next: _ => {
          console.log("Photo is uploaded");
          window.location.reload();
        },
        error: _ => console.log("ERROR: Photo is NOT uploaded")
      });
  }

  update() {
    if (!this.userId) {
      console.log("ERROR: userId is empty")
      return;
    }


    if (this.form.invalid) {
      console.log("ERROR. Form is invalid.")
      return;
    }

    this.userService.update(this.userId, {
      name: this.form.controls.name.value,
      surname: this.form.controls.surname.value,
      cityId: this.form.controls.cityId.value ?? undefined,
      birthday: this.form.controls.birthday.value?.toISOString() ?? undefined,
      gender: this.form.controls.gender.value ?? undefined,
      phone: this.form.controls.phone.value ?? undefined,
      contactEmail: this.form.controls.contactEmail.value ?? undefined,
      aboutMyself: this.form.controls.aboutMyself.value ?? undefined,
      videoLink: this.form.controls.videoLink.value ?? undefined,
    }).pipe(untilDestroyed(this)).subscribe(_ => window.location.reload());
  }
}
