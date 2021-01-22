import { Injectable, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {

  url = 'http://localhost:8080/auth'

  constructor(
    private router: Router,
    private httpClient: HttpClient) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['token']) {
      return true
    }

    this.router.navigate(['/auth/login'])

    return false
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }
    return this.httpClient.post(this.url + '/signin', body)
  }

  // signup()

}
