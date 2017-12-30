import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MonsterService} from '../services/monster.service';
import {Monster} from '../models/monster.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-monster',
  templateUrl: './add-monster.component.html',
  styleUrls: ['./add-monster.component.css']
})
export class AddMonsterComponent implements OnInit, OnDestroy {

  addMonsterForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  username: FormControl;
  imageFile: FormControl;

  addMonsterSubscription: Subscription;
  error: Error = null;

  readonly REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  readonly REGEX_USERNAME = '^[a-zA-Z0-9_]*$';

  constructor(private monsterService: MonsterService, private router: Router) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm()
  }

  /**
   * Create form controls
   */
  createFormControls(): void {
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_EMAIL)]);
    this.username = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_USERNAME)]);
    this.imageFile = new FormControl('');
  }

  /**
   * Create Form
   */
  createForm(): void {
    this.addMonsterForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      imageFile: this.imageFile,
      username: this.username,
      email: this.email
    });
  }


  /**
   * Save form details
   */
  onSave() {
    /* istanbul ignore else  */
    if (this.addMonsterForm.valid) {
      console.log('Form Submitted!');
      const newMonster = new Monster(this.firstName.value, this.lastName.value,
        this.email.value, this.username.value, this.imageFile.value);

      this.addMonsterSubscription = this.monsterService.addMonster(newMonster)
        .subscribe(persistedMonster => {
            this.addMonsterForm.reset();
            this.router.navigate(['/view-monsters/']);
          },
          (err) => {
            this.error = err;
            console.log('err: ', this.error);
          }
        );
    }
  }

  ngOnDestroy(): void {
    if (this.addMonsterSubscription) {
      this.addMonsterSubscription.unsubscribe();
    }
  }


}
