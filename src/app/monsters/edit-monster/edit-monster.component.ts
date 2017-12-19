import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonsterService} from '../services/monster.service';
import {Subscription} from 'rxjs/Subscription';
import {Monster} from '../models/monster.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-edit-monster',
  templateUrl: './edit-monster.component.html',
  styleUrls: ['./edit-monster.component.css']
})
export class EditMonsterComponent implements OnInit, OnDestroy {

  monster: Monster;
  editMonsterForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  username: FormControl;
  imageFile: FormControl;

  readonly REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly REGEX_USERNAME = '^[a-zA-Z0-9_]*$';

  constructor(private router: Router, private route: ActivatedRoute, private monsterService: MonsterService) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.monster = this.route.snapshot.data.monsterData[0];
    this.populateForm();
  }

  /**
   * Update the form with values retrieved from db
   */
  populateForm(): void {
    this.firstName.setValue(this.monster.firstName);
    this.lastName.setValue(this.monster.lastName);
    this.email.setValue(this.monster.email);
    this.username.setValue(this.monster.username);
    this.imageFile.setValue(this.monster.imageFile);
  }

  /**
   * Create form controls
   */
  createFormControls(): void {
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.REGEX_EMAIL)
    ]);
    this.username = new FormControl('', [
      Validators.required,
      Validators.pattern(this.REGEX_USERNAME)
    ]);
    this.imageFile = new FormControl('');
  }

  /**
   * Create Form
   */
  createForm(): void {
    this.editMonsterForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      imageFile: this.imageFile,
      username: this.username,
      email: this.email
    });
  }

  ngOnDestroy() {
  }

  onSave(): void {
    if (this.editMonsterForm.valid) {
      console.log('Form Submitted!');
      const newMonster = new Monster(this.firstName.value, this.lastName.value,
        this.email.value, this.imageFile.value, this.username.value, this.monster._id);

      this.monsterService.updateMonster(newMonster).subscribe(persistedMonster => {
        console.log('monster persisted: ', persistedMonster);
      });
      this.editMonsterForm.reset();
    }
  }
}
