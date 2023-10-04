import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-worker-preview',
  templateUrl: './worker-preview.component.html',
  styleUrls: ['./worker-preview.component.css'],
})
export class WorkerPreviewComponent {
  @Input() user_avatar?: string;
  @Input() user_info?: string;
}
