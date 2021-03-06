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
  catchline: FormControl;
  imageFile: FormControl;

  fetchError = false;
  editMonsterSubscription: Subscription;

  readonly REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly REGEX_USERNAME = '^[a-zA-Z0-9_]*$';

  constructor(private router: Router, private route: ActivatedRoute, private monsterService: MonsterService) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();

    let resolvedValue = this.route.snapshot.data.monsterData;

    if(resolvedValue.hasError()) {
      this.fetchError = true;
    } else {
      this.monster = resolvedValue.data;
      this.populateForm();
    }
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
    this.catchline.setValue(this.monster.catchline);
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
    this.catchline = new FormControl('');
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
      email: this.email,
      catchline: this.catchline
    });
  }

  ngOnDestroy() {
    if(this.editMonsterSubscription) {
      this.editMonsterSubscription.unsubscribe();
    }
  }

  onSave(): void {
    if (this.editMonsterForm.valid) {
      const newMonster = new Monster(this.firstName.value, this.lastName.value,
        this.email.value, this.username.value, this.imageFile.value, this.catchline.value, this.monster._id);

      this.editMonsterSubscription = this.monsterService.updateMonster(newMonster).subscribe(persistedMonster => {
        this.router.navigate(['/view-monsters/']);
      });
      this.editMonsterForm.reset();
    }
  }
}
