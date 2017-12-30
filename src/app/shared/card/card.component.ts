import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Monster} from '../../monsters/models/monster.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('data-input')
  data: Monster;

  @Output('removeMonster')
  emitRemoveMonster: EventEmitter<string> = new EventEmitter<string>();

  @Output('editMonster')
  emitEditMonster: EventEmitter<string> = new EventEmitter<string>();

  constructor(public router: Router) { }

  ngOnInit() {
    console.log('data: ', this.data);
  }

  getFullName(): string {
    return (this.data.firstName + ' ' + this.data.lastName);
  }

  removeMonster() {
    this.emitRemoveMonster.emit(this.data._id)
  }

  editMonster() {
    this.emitEditMonster.emit(this.data._id)
  }
}
