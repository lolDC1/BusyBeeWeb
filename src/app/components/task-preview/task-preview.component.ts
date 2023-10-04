import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css'],
})
export class TaskPreviewComponent implements OnInit{
  avatar? : any;
  userData? : any;
  userInfo? : any[] = [];
  @Input() status?: string;
  @Input() taskId? : string;
  @Input() id? : any;
  @Input() title? : any = "User order";
  @Input() addInfo? : any[] = ["User info"];
  @Input() payment? : number = 150;
  @Input() dataloaded?: boolean;

  constructor(private userService: UserService,
              private router: Router) {
  }
  ngOnInit(): void {
    try {
      this.userService.getById(this.id).pipe().subscribe(model => {
        this.userData = model;
        this.avatar = this.userData?.photoFilename;
        this.userInfo?.push(this.userData?.name, this.userData?.surname);
        this.addInfo?.forEach(item => {
          this.userInfo?.push(item);
        });
        this.dataloaded = true;
      })
    }
    catch (error) {
      console.error(error);
    }
  }

  openOrder() {
    const naming = this.title;
    const taskId = this.taskId;
    this.router.navigate(['task-page', this.taskId], {queryParams: {naming, taskId}});
  }

}
