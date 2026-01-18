import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

//import {SimplebarAngularModule} from 'simplebar-angular';
import {StFooterComp} from "./st_footer/StFooterComp";
import {StHeaderComp} from "./st_header/StHeaderComp";
import {VerticalComp} from "./vertical/VerticalComp";
import {HorizontalComp} from "./horizontal/HorizontalComp";
import {HorizontalNavComp} from "./horizontal/horizontal_nav/HorizontalNavComp";
import {VerticalNavComp} from "./vertical/vertical_nav/VerticalNavComp";
import {SettingRightSidebarComp} from "./setting_right_sidebar/SettingRightSidebarComp";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    //LayoutComp,
    StHeaderComp,
    StFooterComp,
    VerticalComp,
    VerticalNavComp,
    SettingRightSidebarComp,
    HorizontalComp,
    HorizontalNavComp
  ],
  imports: [
    CommonModule,
    RouterModule, 
    MatMenuModule
    //FeatherModule.pick(allIcons),
    //NgbDropdownModule,
    //SimplebarAngularModule,
  ],
  providers: [],
  exports: [
    StHeaderComp,
    StFooterComp,
    VerticalComp,
    VerticalNavComp,
    SettingRightSidebarComp,
    HorizontalComp,
    HorizontalNavComp
  ]
})
export class LayoutModule {
}
