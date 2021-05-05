import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notice-popup',
  templateUrl: './notice-popup.component.html',
  styleUrls: ['./notice-popup.component.scss']
})
export class NoticePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoticePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    content: string,
    needCancelBtn: boolean
  }) { }

  ngOnInit(): void {
  }

}
