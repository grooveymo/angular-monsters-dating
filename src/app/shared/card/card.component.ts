import {Component, Input, OnInit} from '@angular/core';
import {Monster} from '../../monsters/models/monster.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('data-input')
  data: Monster;

  constructor() { }

  ngOnInit() {
    console.log('data: ', this.data);
  }

}
