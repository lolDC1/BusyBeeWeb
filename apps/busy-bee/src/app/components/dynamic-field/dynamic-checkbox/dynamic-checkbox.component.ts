import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrls: ['./dynamic-checkbox.component.css'],
})
export class DynamicCheckboxComponent {
  @Input() field: any;
  @Input() formName!: FormGroup;
}
