import { Injectable } from "@angular/core";
import { JwtPayload } from 'jwt-decode'
import { JwtPayloadDto } from '../dto/JwtPayloadDto'

@Injectable({ providedIn: 'root' })
export class JwtDecodeService {

  // Helper: decode base64url (JWT) to a UTF-8 string
  private base64UrlDecode(input: string): string {
    // Replace URL-safe characters
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with '='
    const pad = base64.length % 4;
    if (pad === 2) base64 += '==';
    else if (pad === 3) base64 += '=';
    else if (pad !== 0) {
      // invalid base64 string
      throw new Error('Invalid base64 string');
    }

    // atob works on binary strings in browser
    try {
      // Decode percent-encoded UTF-8 bytes into characters
      const binary = atob(base64);
      // Convert binary string to UTF-8 string
      const bytes = Uint8Array.from(binary.split('').map(c => c.charCodeAt(0)));
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(bytes);
    } catch (err) {
      // Fallback: try decodeURIComponent approach
      try {
        return decodeURIComponent(Array.prototype.map.call(atob(base64), function(c: string) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      } catch (err2) {
        throw err2;
      }
    }
  }

  // Decode a JWT string (or the token saved in localStorage under 'hajj_system_jwt') and return its payload.
  decode(jwtTokenString?: string): JwtPayloadDto | null {
    let token = jwtTokenString ?? localStorage.getItem('hajj_system_jwt');
    if (!token) return null;

    // Accept "Bearer <token>" as well
    if (token.startsWith('Bearer ')) {
      token = token.substring(7);
    }

    const parts = token.split('.');
    if (parts.length < 2) return null;

    try {
      const payload = parts[1];
      const decoded = this.base64UrlDecode(payload);
      const obj = JSON.parse(decoded);
      const dto = JwtPayloadDto.fromObject(obj);
      return dto;
    } catch (err) {
      console.error('Failed to decode JWT:', err);
      return null;
    }
  }

  // Check whether the token is expired. Returns true if expired or token missing/invalid.
  isExpired(jwtTokenString?: string): boolean {
    const decoded = this.decode(jwtTokenString) as JwtPayload | null;
    if (!decoded) return true;
    if (typeof decoded.exp !== 'number') return false; // no exp claim -> treat as not expired
    const nowSec = Date.now() / 1000;
    return decoded.exp < nowSec;
  }

}
