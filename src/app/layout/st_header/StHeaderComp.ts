import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LAYOUT_MODE } from "../layouts.model";
import { EventService } from "../../service/EventService";
import { FakeAuthenticationService } from "../../service/FakeAuthenticationService";
import {AuthService} from '../../service/AuthService';

@Component({
  selector: 'StHeaderComp',
  templateUrl: './StHeaderComp.html',
  styleUrls: ['./StHeaderComp.scss']
})
export class StHeaderComp implements OnInit {

  mode: string | undefined;
  element: any;
  flagvalue: any;
  cookieValue: any;
  countryName: any;
  valueset: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fakeAuthenticationService: FakeAuthenticationService,
    private eventService: EventService
  ) {
  }

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
  ];

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  layoutMode!: string;

  ngOnInit(): void {
    this.layoutMode = LAYOUT_MODE;
    this.element = document.documentElement;
    this.cookieValue = 'en';
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.valueset = 'assets/images/flags/us.jpg';
      }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
  }

  changeMode(mode: string) {
    this.layoutMode = mode;
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  logout() {
    this.authService.logout();
    //this.fakeAuthenticationService.logout();
    //localStorage.removeItem('hajj_system_jwt');
    this.router.navigate(['/login']);
  }
}
