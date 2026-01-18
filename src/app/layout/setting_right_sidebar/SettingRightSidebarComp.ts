import {Component, OnInit} from '@angular/core';
import {LAYOUT_MODE, LAYOUT_WIDTH, TOPBAR, SIDEBAR_SIZE, SIDEBAR_COLOR, LAYOUT_POSITION} from '../layouts.model';
import {EventService} from "../../service/EventService";

@Component({
  selector: 'SettingRightSidebarComp',
  templateUrl: './SettingRightSidebarComp.html',
  styleUrls: ['./SettingRightSidebarComp.scss']
})
export class SettingRightSidebarComp implements OnInit {

  layout!: string | null;
  mode: string | undefined;
  width: string | undefined;
  position: string | undefined;
  topbar: string | undefined;
  sidebarcolor: string | undefined;
  sidebarsize: string | undefined;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.mode = LAYOUT_MODE;
    this.width = LAYOUT_WIDTH;
    this.topbar = TOPBAR;
    this.sidebarcolor = SIDEBAR_COLOR;
    this.sidebarsize = SIDEBAR_SIZE;
    this.position = LAYOUT_POSITION;
    this.layout = document.body.getAttribute('data-layout');
    const vertical = document.getElementById('is-layout');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (this.layout == 'horizontal') {
      vertical?.removeAttribute('checked');
    }
  }

  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }

  changeLayout(layout: any) {
    // this.eventService.broadcast('changeLayout', layout);
    if (layout.target.checked == true)
      this.eventService.broadcast('changeLayout', 'vertical');
    else
      this.eventService.broadcast('changeLayout', 'horizontal');
  }

  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  changeWidth(width: string) {
    this.width = width;
    this.eventService.broadcast('changeWidth', width);
  }

  changePosition(scrollable: string) {
    this.position = scrollable;
    this.eventService.broadcast('changePosition', scrollable);
  }

  changeTopbar(topbar: string) {
    this.topbar = topbar;
    this.eventService.broadcast('changeTopbar', topbar);
  }

  changeSidebarColor(sidebarcolor: string) {
    this.sidebarcolor = sidebarcolor;
    this.eventService.broadcast('changeSidebarColor', sidebarcolor);
  }

  changeSidebarSize(sidebarsize: string) {
    this.sidebarsize = sidebarsize;
    this.eventService.broadcast('changeSidebarSize', sidebarsize);
  }

}
