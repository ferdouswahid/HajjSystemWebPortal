import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'PageTitleComp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './PageTitleComp.html',
  styleUrls: ['./PageTitleComp.scss']
})
export class PageTitleComp implements OnInit {

  @Input()
  breadcrumbItems: Array<{ active?: boolean; label?: string; }> = [];

  @Input() title: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
