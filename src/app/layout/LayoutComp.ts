import {Component, OnInit} from '@angular/core';

import {
  LAYOUT_VERTICAL, LAYOUT_HORIZONTAL, LAYOUT_MODE, LAYOUT_WIDTH,
  LAYOUT_POSITION, SIDEBAR_SIZE, SIDEBAR_COLOR, TOPBAR
} from './layouts.model';
import {EventService} from "../service/EventService";

@Component({
  selector: 'LayoutComp',
  template: `
    <VerticalComp *ngIf="isVerticalLayoutRequested()"></VerticalComp>
    <HorizontalComp *ngIf="isHorizontalLayoutRequested()"></HorizontalComp>
  `,

})
export class LayoutComp implements OnInit {

  // layout related config
  layoutType!: string;
  layoutMode!: string;
  layoutwidth!: string;
  layoutposition!: string;
  topbar!: string;
  sidebarcolor!: string;
  sidebarsize!: string;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {

    this.layoutMode = LAYOUT_MODE;
    // default settings
    this.layoutType = LAYOUT_VERTICAL;
    this.layoutwidth = LAYOUT_WIDTH;
    this.layoutposition = LAYOUT_POSITION;
    this.sidebarcolor = SIDEBAR_COLOR;
    this.sidebarsize = SIDEBAR_SIZE;
    this.topbar = TOPBAR;

    this.LayoutMode(this.layoutMode);
    this.LayoutWidth(this.layoutwidth);
    this.LayoutPosition(this.layoutposition);
    this.Topbar(this.topbar);
    this.SidebarColor(this.sidebarcolor);
    this.SidebarSize(this.sidebarsize);

    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });

    this.eventService.subscribe('changeMode', (mode) => {
      this.layoutMode = mode;
      this.LayoutMode(this.layoutMode);
    });

    this.eventService.subscribe('changeWidth', (width) => {
      this.layoutwidth = width;
      this.LayoutWidth(this.layoutwidth);
    });

    this.eventService.subscribe('changePosition', (position) => {
      this.layoutposition = position;
      this.LayoutPosition(this.layoutposition);
    });

    this.eventService.subscribe('changeTopbar', (topbar) => {
      this.topbar = topbar;
      this.Topbar(this.topbar);
    });

    this.eventService.subscribe('changeSidebarColor', (sidebarcolor) => {
      this.sidebarcolor = sidebarcolor;
      this.SidebarColor(this.sidebarcolor);
    });

    this.eventService.subscribe('changeSidebarSize', (sidebarsize) => {
      this.sidebarsize = sidebarsize;
      this.SidebarSize(this.sidebarsize);
    });
  }

  isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }

  LayoutMode(mode: string) {
    switch (mode) {
      case "light":
        document.body.setAttribute("data-bs-theme", "light");
        document.body.setAttribute("data-topbar", "light");
        document.body.setAttribute("data-sidebar", "light");
        break;
      case "dark":
        document.body.setAttribute("data-sidebar", "dark");
        document.body.setAttribute("data-bs-theme", "dark");
        document.body.setAttribute("data-topbar", "dark");
        break;
      default:
        document.body.setAttribute("data-bs-theme", "light");
        document.body.setAttribute("data-topbar", "light");
        break;
    }
  }

  LayoutWidth(width: string) {
    switch (width) {
      case "light":
        document.body.setAttribute("data-layout-size", "fluid");
        break;
      case "boxed":
        document.body.setAttribute("data-layout-size", "boxed");
        break;
      default:
        document.body.setAttribute("data-layout-size", "light");
        break;
    }
  }

  LayoutPosition(position: string) {
    if (position === 'fixed') {
      document.body.setAttribute("data-layout-scrollable", "false");
    } else {
      document.body.setAttribute("data-layout-scrollable", "true");
    }
  }

  SidebarColor(color: string) {
    switch (color) {
      case "light":
        document.body.setAttribute('data-sidebar', 'light');
        break;
      case "dark":
        document.body.setAttribute("data-sidebar", "dark");
        break;
      case "brand":
        document.body.setAttribute("data-sidebar", "brand");
        break;
      default:
        document.body.setAttribute("data-sidebar", "light");
        break;
    }
  }

  Topbar(topbar: string) {
    switch (topbar) {
      case "light":
        document.body.setAttribute("data-topbar", "light");
        break;
      case "dark":
        document.body.setAttribute("data-topbar", "dark");
        break;
      default:
        document.body.setAttribute("data-topbar", "light");
        break;
    }
  }

  SidebarSize(size: string) {
    switch (size) {
      case "default":
        document.body.setAttribute('data-sidebar-size', 'lg');
        break;
      case "compact":
        document.body.setAttribute('data-sidebar-size', 'md');
        break;
      case "small":
        document.body.setAttribute('data-sidebar-size', 'sm');
        break;
      default:
        document.body.setAttribute('data-sidebar-size', 'lg');
        break;
    }
  }

}
