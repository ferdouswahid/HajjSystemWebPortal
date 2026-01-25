import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {LocalStorageService} from './LocalStorageService';
import {JwtDecodeService} from './JwtDecodeService';
import {JwtPayloadDto} from '../dto/JwtPayloadDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'hajj_system_jwt';
  private tokenPayloadKey = 'hajj_system_jwt_payload';

  constructor(private router: Router,
  private localStorageService: LocalStorageService,
  private jwtDecodeService: JwtDecodeService
  ) {}

  /**
   * Check if user is authenticated by checking if token exists
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  /**
   * Get the stored access token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Store the access token after login
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Get the stored payload
   */
  getJwtPayload(): JwtPayloadDto | null {
    const json = localStorage.getItem(this.tokenPayloadKey);
    if (!json) return null;
    try {
      const obj = JSON.parse(json);
      return JwtPayloadDto.fromObject(obj);
    } catch (err) {
      console.error('Failed to parse stored JWT payload:', err);
      return null;
    }
  }

  /**
   * Store the payload after login
   */
  setJwtPayload(token: string): void {
    const decodedPayload = this.jwtDecodeService.decode(token);
    console.log('Decoded JWT payload:', decodedPayload);
    console.log('Decoded JWT UserName:', decodedPayload?.UserName);
    console.log('Decoded JWT CompanyId:', decodedPayload?.CompanyId);
    console.log('Decoded JWT roles:', decodedPayload?.roles);

    if (decodedPayload !== null) {
      // Persist full DTO as JSON
      try {
        localStorage.setItem(this.tokenPayloadKey, JSON.stringify(decodedPayload));
      } catch (err) {
        console.error('Failed to store JWT payload in localStorage:', err);
      }

      // Also persist individual fields for convenience (fallback to empty string when undefined)
      // localStorage.setItem('UserName', decodedPayload.UserName ?? '');
      // localStorage.setItem('UserId', decodedPayload.UserId ?? '');
      // localStorage.setItem('SeasonId', decodedPayload.SeasonId ?? '');
      // localStorage.setItem('CompanyId', decodedPayload.CompanyId ?? '');
      // localStorage.setItem('UserType', decodedPayload.UserType ?? '');
      // localStorage.setItem('exp', decodedPayload.exp ? String(decodedPayload.exp) : '');
      // localStorage.setItem('roles', decodedPayload.roles ?? '');
    }
  }



  /**
   * Remove the access token on logout
   */
  logout(): void {
    this.clearAuthData();
    //this.router.navigate(['/login']);
  }

  /**
   * Clear all authentication data
   */
  clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenPayloadKey);
    localStorage.removeItem('UserName');
    localStorage.removeItem('UserId');
    localStorage.removeItem('SeasonId');
    localStorage.removeItem('CompanyId');
    localStorage.removeItem('UserType');
    localStorage.removeItem('exp');
    localStorage.removeItem('roles');
  }
}
