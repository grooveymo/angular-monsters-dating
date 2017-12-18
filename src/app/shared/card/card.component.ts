import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Monster} from '../../monsters/models/monster.model';

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

  constructor() { }

  ngOnInit() {
    console.log('data: ', this.data);
  }

  getFullName(): string {
    return (this.data.firstName + ' ' + this.data.lastName);
  }

  removeMonster() {
    console.log('[card] removeMonster: id = ', this.data._id);
    this.emitRemoveMonster.emit(this.data._id)
  }
}
