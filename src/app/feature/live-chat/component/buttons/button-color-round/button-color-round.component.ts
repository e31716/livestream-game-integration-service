import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-color-round',
  templateUrl: './button-color-round.component.html',
  styleUrls: ['./button-color-round.component.scss']
})
export class ButtonColorRoundComponent implements OnInit {
  /** Icon */
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
