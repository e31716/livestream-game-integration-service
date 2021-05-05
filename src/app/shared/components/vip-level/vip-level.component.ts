import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vip-level',
  templateUrl: './vip-level.component.html',
  styleUrls: ['./vip-level.component.scss']
})
export class VipLevelComponent implements OnInit {
  @Input() level = 0;

  vipLevelPosition = [
    '-10px -10px',
    '-92px -10px',
    '-10px -58px',
    '-92px -58px',
    '-10px -106px',
    '-92px -106px',
    '-174px -10px',
    '-174px -58px',
    '-174px -106px',
    '-10px -154px',
    '-92px -154px',
    '-174px -154px',
    '-10px -202px',
    '-92px -202px',
    '-174px -202px',
    '-256px -10px',
    '-256px -58px',
    '-256px -106px',
    '-256px -154px',
    '-256px -202px'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
