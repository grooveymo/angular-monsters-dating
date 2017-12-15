import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-monster',
  templateUrl: './add-monster.component.html',
  styleUrls: ['./add-monster.component.css']
})
export class AddMonsterComponent implements OnInit {

  addMonsterForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;

  readonly REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() { }

  ngOnInit() {
    //create form controls
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.REGEX_EMAIL)
    ]);

    //create form
    this.addMonsterForm = new FormGroup({
      name: new FormGroup({ firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email
    });
  }

  onSubmit() {
    if (this.addMonsterForm.valid) {
      console.log("Form Submitted!");
      this.addMonsterForm.reset();
    }
  }

}
