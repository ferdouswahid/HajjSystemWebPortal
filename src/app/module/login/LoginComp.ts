import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {CommonModule, DOCUMENT} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FakeAuthenticationService} from "../../service/FakeAuthenticationService";
import {AuthenticationService} from "../../service/AuthenticationService";
import {LAYOUT_MODE} from "../../layout/layouts.model";
import {LoginInfoDto} from "../../dto/LoginInfoDto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthController} from "../../controller/AuthController";
import {AuthApiService} from "../../service/api_services/AuthApiService";
import {RxFormBuilder, RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {NgSelectModule} from "@ng-select/ng-select";
import {map, Observable, of} from "rxjs";
import {SeasonModel} from "../../dto/SeasonModel";
import {SeasonApiService} from "../../service/api_services/SeasonApiService";
import {NotificationService} from "../../service/NotificationService";
import {AuthService} from "../../service/AuthService";
import { JwtDecodeService } from '../../service/JwtDecodeService';
import {LocalStorageService} from '../../service/LocalStorageService';

@Component({
  selector: 'LoginComp',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  standalone: true,
  providers: [AuthApiService, SeasonApiService],
  templateUrl: './LoginComp.html',
  styleUrls: ['./LoginComp.scss']
})
export class LoginComp implements OnInit {
  loginFg: FormGroup = this.rxFormBuilder.formGroup(LoginInfoDto);
  seasonList$: Observable<Array<SeasonModel>> = new Observable<Array<SeasonModel>>();
  year: number = new Date().getFullYear();
  layout_mode!: string;
  fieldTextType!: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authController: AuthController,
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public authApiService : AuthApiService,
    public seasonApiService : SeasonApiService,
    private rxFormBuilder: RxFormBuilder,
    private notificationService: NotificationService,
    private fakeAuthenticationService: FakeAuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // console.log(document);
    this.layout_mode = LAYOUT_MODE;
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-bs-theme", "dark");
    }
    document.body.setAttribute('data-layout', 'vertical');

    this.getSeasonList();
  }

  /*  adminLogin() {
      console.log(this.loginFg.value)
      const loginInfoDto = new LoginInfoDto(this.loginFg.value);
      if (!this.adminLoginService.validation(loginInfoDto, this.snackBar)) {
        return;
      }
      this.authController.adminLogin(loginInfoDto)
        .subscribe((accessTokenDto:AccessTokenDto) => {
          this.snackBar.open('Login Successful.', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'app-notification-success'
          });


          this.localStorageService.setItem('hajj_system_jwt', accessTokenDto.accessToken ? accessTokenDto.accessToken: '');
          this.router.navigate(['/authenticated/dashboard'], { relativeTo: this.route });
        }, (error) => {
          console.log(error);
          this.snackBar.open('Login Failed.', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'app-notification-error'
          });
        });

        /!*this.fakeAuthenticationService.login('', '')
          .pipe(first())
          .subscribe((data) => {
            this.router.navigate(['/']);
          }, (error) => {
            this.error = error ? error : '';
          });*!/

    }*/

  togglePasswordFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login(): void {
    if (!this.validate()) {
      return;
    }
    console.log('Login attempt:', this.loginFg.value);
    this.authApiService.login(this.loginFg.value).subscribe({
      next: (res) => {
        if (res?.status) {
          this.notificationService.success(res.message || 'Login success');
          this.authService.setToken(res.token);
          this.authService.setJwtPayload(res.token);

          const decodedPayload = this.authService.getJwtPayload();
          console.log('LO JWT payload:', decodedPayload);
          console.log('lo JWT UserName:', decodedPayload?.UserName);
          console.log('lo JWT CompanyId:', decodedPayload?.CompanyId);
          console.log('lo JWT roles:', decodedPayload?.roles);


          this.router.navigate(['/authenticated/dashboard']).then(nav => {
            console.log('Navigation result:', nav);
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        } else {
          this.notificationService.error(res.message || 'Login failed');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.notificationService.error(err.error?.message || 'Login failed');
      }
    });
  }

  validate(): boolean {
    if (!this.loginFg.value.username) {
      this.notificationService.error('Username is required');
      return false;
    }
    if (!this.loginFg.value.password) {
      this.notificationService.error('Password is required');
      return false;
    }
    if (!this.loginFg.value.seasonId) {
      this.notificationService.error('Season id is required');
      return false;
    }
    return true;
  }

  getSeasonList() {
    this.seasonList$ = this.seasonApiService.getList();
  }

}
