import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {LayoutModule} from "../../layout/LayoutModule";
import {EventService} from "../../service/EventService";
import {
  LAYOUT_HORIZONTAL,
  LAYOUT_MODE,
  LAYOUT_POSITION,
  LAYOUT_VERTICAL,
  LAYOUT_WIDTH,
  SIDEBAR_COLOR,
  SIDEBAR_SIZE,
  TOPBAR
} from "../../layout/layouts.model";

@Component({
  selector: 'AuthenticatedComp',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutModule
  ],
  template: `
    <VerticalComp *ngIf="isVerticalLayoutRequested()"></VerticalComp>
    <HorizontalComp *ngIf="isHorizontalLayoutRequested()"></HorizontalComp>
  `
})
export class AuthenticatedComp implements OnInit{

  // layout related config
  layoutType!: string;
  layoutMode!: string;
  layoutwidth!: string;
  layoutposition!: string;
  topbar!: string;
  sidebarcolor!: string;
  sidebarsize!: string;

  constructor(private eventService: EventService,
              @Inject(DOCUMENT) private document: Document,) {
    console.log( 'AuthenticatedComp is constructed')
    this.layoutType = LAYOUT_VERTICAL;
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

    this.setLayoutMode(this.layoutMode);
    this.setLayoutMode(this.layoutwidth);
    this.setLayoutPosition(this.layoutposition);
    this.setTopbar(this.topbar);
    this.setSidebarColor(this.sidebarcolor);
    this.setSidebarSize(this.sidebarsize);

    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });

    this.eventService.subscribe('changeMode', (mode) => {
      this.layoutMode = mode;
      this.setLayoutMode(this.layoutMode);
    });

    this.eventService.subscribe('changeWidth', (width) => {
      this.layoutwidth = width;
      this.setLayoutMode(this.layoutwidth);
    });

    this.eventService.subscribe('changePosition', (position) => {
      this.layoutposition = position;
      this.setLayoutPosition(this.layoutposition);
    });

    this.eventService.subscribe('changeTopbar', (topbar) => {
      this.topbar = topbar;
      this.setTopbar(this.topbar);
    });

    this.eventService.subscribe('changeSidebarColor', (sidebarcolor) => {
      this.sidebarcolor = sidebarcolor;
      this.setSidebarColor(this.sidebarcolor);
    });

    this.eventService.subscribe('changeSidebarSize', (sidebarsize) => {
      this.sidebarsize = sidebarsize;
      this.setSidebarSize(this.sidebarsize);
    });
  }

  isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }

  setLayoutMode(mode: string) {
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

  setLayoutWidth(width: string) {
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

  setLayoutPosition(position: string) {
    if (position === 'fixed') {
      document.body.setAttribute("data-layout-scrollable", "false");
    } else {
      document.body.setAttribute("data-layout-scrollable", "true");
    }
  }

  setSidebarColor(color: string) {
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

  setTopbar(topbar: string) {
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

  setSidebarSize(size: string) {
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
