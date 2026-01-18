import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'HorizontalComp',
  templateUrl: './HorizontalComp.html',
  styleUrls: ['./HorizontalComp.scss']
})
export class HorizontalComp implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.setAttribute('data-layout', 'horizontal');
    document.body.removeAttribute('data-sidebar');
  }


  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }

  onToggleMobileMenu() {
    const element = document.getElementById('topnav-menu-content');
    element?.classList.toggle('show');
  }

}
