import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessTokenKey = 'access_token';

  constructor(private cookieService: CookieService) {
    this.getAccessTokenFromCookie();
  }

  getAccessToken(): string | null {
    return this.cookieService.get(this.accessTokenKey) || null;
  }

  setAccessToken(token: string): void {
    this.cookieService.set(this.accessTokenKey, token);
  }

  clearAccessToken(): void {
    this.cookieService.delete(this.accessTokenKey);
  }

  private getAccessTokenFromCookie(): void {
    const token = this.cookieService.get(this.accessTokenKey);
    if (token) {
      this.setAccessToken(token);
    }
  }
}
