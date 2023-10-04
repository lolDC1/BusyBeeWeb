import {Component} from '@angular/core';

@Component({
  selector: 'app-worker-preview',
  templateUrl: './worker-preview.component.html',
  styleUrls: ['./worker-preview.component.css']
})
export class WorkerPreviewComponent {
  avatar? : any;
  title? : any = "User name";
  user_info? : any = "User info";

}
