import { Component } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genders } from '../../enums/genders.enum';
import { ListItem } from '../../models/base/list-item';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CityService } from '../../services/city.service';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent {
  dataloaded: boolean = false;
  authUserId?: string;
  domainUrl: string;
  isOwner: boolean = false;
  myData?: any;
  userData?: any;
  userId?: any;
  userModel?: UserModel;
  taskId?: any;
  taskData?: any;
  taskOwnerId?: any;
  photoUrl?: string;
  genderViewValue?: string;

  uploadForm: FormGroup;

  tasksCount?: any;
  taskOutput?: any;

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
              private taskService: TaskService,
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
    try {
      this.userService.me().pipe(untilDestroyed(this)).subscribe(model => {
        this.myData = model;
      });
      this.taskId = this.route.snapshot.params['id'];
      this.taskService.getById('/' + this.taskId).subscribe(model => {
        this.taskData = model;
        this.userId = this.taskData.createdBy;
        if (this.myData?.id != this.userId) {
          this.userService.getById(this.userId).pipe(untilDestroyed(this)).subscribe(model => {
            this.userData = model;
            this.photoUrl = 'busybee.space' + this.userData.photoFilename;
          })
        this.photoUrl = 'busybee.space' + this.myData.photoFilename;
        }
      })

      // // this.userService.getById().pipe(untilDestroyed(this)).subscribe(model => {
      //
      // })
      this.dataloaded = true;
    }
    catch (error) {
      console.error(error);
    }
  }

  takeTask() {
    this.taskService.assignTask(this.taskId).pipe(untilDestroyed(this)).subscribe({
      next: _ => {
        console.log("Task assigned");
      },
      error: _ => console.log("Error: not assigned")
    });

  }
  abadonTask() {
    this.taskService.deAssignTask(this.taskId).pipe(untilDestroyed(this)).subscribe({
      next: _ => {
        console.log("Task assigned");

      },
      error: _ => console.log("Error: not assigned")
    });
  }
  abortTask() {
    this.taskService.closeTask(this.taskId).pipe(untilDestroyed(this)).subscribe({
      next: _ => {
        console.log("Task assigned");

      },
      error: _ => console.log("Error: not assigned")
    });
  }
  deleteTask() {
    this.taskService.deleteTask(this.taskId).pipe(untilDestroyed(this)).subscribe({
      next: _ => {
        console.log("Task assigned");

      },
      error: _ => console.log("Error: not assigned")
    });
  }
}
