import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MonsterService} from '../services/monster.service';
import {Monster} from '../services/monster.model';
import {Observable} from 'rxjs/Observable';

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
  imageFile: FormControl;

  readonly REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private monsterService: MonsterService) {
  }

  ngOnInit() {
    //create form controls
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.REGEX_EMAIL)
    ]);
    this.imageFile = new FormControl('');

    //create form
    this.addMonsterForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      imageFile: this.imageFile,
      email: this.email
    });
  }

  onSave() {
    if (this.addMonsterForm.valid) {
      console.log('Form Submitted!');
      const newMonster = new Monster(this.firstName.value, this.lastName.value,
        this.email.value, this.imageFile.value);

      this.monsterService.addMonster(newMonster).subscribe(  persistedMonster => {
        console.log('monster persisted: ', persistedMonster);
      });
      this.addMonsterForm.reset();
    }
  }

}
