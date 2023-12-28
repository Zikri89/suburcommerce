import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthConstant {
  static readonly API_URL: string = environment.apiUrl;
  static readonly API_KEY: string = environment.apiKey;
  static readonly IMAGE_URL: string = environment.imageUrl;
  static readonly TOKEN_ENDPOINT: string = environment.tokenEndpoint;
  static readonly AUTHORIZATION_ENDPOINT: string = environment.authorizationEndpoint;
  static readonly CLIENT_ID: string = environment.clientId;
  static readonly SECRET: string = environment.secret;
  static readonly REDIRECT_URL: string = environment.redirectUrl;
  static readonly SCOPES: Array<string> = environment.scopes;
}

@Injectable({
  providedIn: 'root',
})

export class UrlConstans {
  static readonly GET_PRODUCT_LIST: string = `${AuthConstant.API_URL}Product/ListWithPrice`;
  static readonly GET_CATEGORY_LIST: string = `${AuthConstant.API_URL}Category/List`;
}

@Injectable({
  providedIn: 'root',
})

export class ConstantsHeaders {
  constructor(private authService: AuthService) {

  }

  getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'M_API-Key': '35f53b89-573c-428b-af3c-0a76c77b0d30',
    });
  }

  getRajaOngkirHeaders(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
      'key': 'yourRajaOngkirKey',
    });
  }

  getXenditHeaders(): HttpHeaders {
    const apiKeyXendit = 'yourXenditApiKey';
    const authorizationHeader = 'Basic ' + btoa(`${apiKeyXendit}:`);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authorizationHeader,
    });
  }
}
