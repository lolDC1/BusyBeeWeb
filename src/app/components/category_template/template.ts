import { Component } from '@angular/core';
import {NgbDropdownConfig, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, Validators} from '@angular/forms';
import {NgbdDropdownForm} from "../dropdown/dropdown";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";


interface CatCategory {
  value: string;
  viewValue: string;
  cost: number;
}

interface CatGroup {
  disabled?: boolean;
  name: string;
  cat: CatCategory[];

}
@Component({
  selector: 'template-form',
  standalone: true,
  templateUrl: 'template.html',
  styleUrls: ['./template.css'],
  imports: [
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgbdDropdownForm,
    MatButtonToggleModule,
    MatButtonModule,
    MatSelectModule
  ]
})

export class Template {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  catControl = new FormControl('');
  checkChilds: CatGroup[] = [{
    name: 'Help',
    cat: [
      {value: 'option1', viewValue: 'Option1', cost: 200},
      {value: 'option2', viewValue: 'Option2', cost: 120}
    ]
  }]
  isLinear = false;

  isCheckVisible = true;
  ChooseCat = 'None';
  toggleVision() {
    this.isCheckVisible = !this.isCheckVisible;
  }
  constructor(private _formBuilder: FormBuilder) {}
}
