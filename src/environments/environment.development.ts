export const environment = {
  production: false,
  apiUrl: 'http://192.168.1.15:44312/api/',
  imageUrl: 'http://192.168.1.15:44312',
  authorizationEndpoint: 'http://192.168.1.15:44310/connect/authorize',
  tokenEndpoint: 'http://192.168.1.15:44310/connect/token',
  clientid: 'DEV-MardikaPortfolio_PhpCMS',
  secret: 'DEV-MardikaPortfolio_PhpCMS',
  redirectUrl: 'localhost:4200',
  scopes: ['roles', 'profile', 'email', 'openid', 'DEV-MardikaPortfolio_APIes-scope'],
};
