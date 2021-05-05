import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-basic-round',
  templateUrl: './button-basic-round.component.html',
  styleUrls: ['./button-basic-round.component.scss']
})
export class ButtonBasicRoundComponent implements OnInit {
  /** Icon */
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
