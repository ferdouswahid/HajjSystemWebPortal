import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'VerticalComp',
  templateUrl: './VerticalComp.html',
  styleUrls: ['./VerticalComp.scss']
})
export class VerticalComp implements OnInit {

  isCondensed = false;

  constructor() {
  }

  ngOnInit(): void {
    document.body.setAttribute('data-layout', 'vertical');
  }

  onToggleMobileMenu() {
    document.body.classList.toggle('sidebar-enable');
    const currentSIdebarSize = document.body.getAttribute("data-sidebar-size");
    if (window.screen.width >= 992) {
      if (currentSIdebarSize == null) {
        (document.body.getAttribute('data-sidebar-size') == null || document.body.getAttribute('data-sidebar-size') == "lg") ? document.body.setAttribute('data-sidebar-size', 'sm') : document.body.setAttribute('data-sidebar-size', 'lg')
      } else if (currentSIdebarSize == "md") {
        (document.body.getAttribute('data-sidebar-size') == "md") ? document.body.setAttribute('data-sidebar-size', 'sm') : document.body.setAttribute('data-sidebar-size', 'md')
      } else {
        (document.body.getAttribute('data-sidebar-size') == "sm") ? document.body.setAttribute('data-sidebar-size', 'lg') : document.body.setAttribute('data-sidebar-size', 'sm')
      }
    }
    this.isCondensed = !this.isCondensed;
  }

  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }

}
