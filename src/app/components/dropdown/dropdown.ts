import { Component } from '@angular/core';
import {NgbDropdownConfig, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import  {Category} from "../../Category";
import {SubCategory} from "../../SubCategory";
import {SelectCategory} from "../../select.category";
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'dropdown-form',
  standalone: true,
  imports: [NgbDropdownModule, MatInputModule, MatSelectModule, FormsModule, MatListModule],
  templateUrl: 'dropdown.html',
  providers: [NgbDropdownConfig],
})
export class NgbdDropdownForm {
  selectedhead = 'None'
  selectedmid = 'None'
  selectedlow = 'None'
  subcategory = ["Option1"];

  setState(){
    if(this.selectedhead == "option1"){
      this.subcategory = ["suboption1-option1, suboption2-option1"];
    }
    if(this.selectedhead == "option2") {
      this.subcategory = ["suboption1-option2, suboption2-option2"]
    }
  }

  constructor(config: NgbDropdownConfig) {
    config.autoClose = false;
  }

}
