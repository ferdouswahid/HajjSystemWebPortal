import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'StFooterComp',
  templateUrl: './StFooterComp.html',
  styleUrls: ['./StFooterComp.scss']
})
export class StFooterComp implements OnInit {

  year: number = new Date().getFullYear();

  constructor() {
  }

  ngOnInit(): void {
  }

}
