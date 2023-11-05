import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";
@Injectable({
providedIn: 'root'
})
export class TokenService {
  getCodigo1() {
    throw new Error('Method not implemented.');
  }
constructor(private router: Router) { }

public getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
  }
public setToken(token: string) {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
    return true;
    }
    return false;
    }

    public login(token:string){
      this.setToken(token);
      this.router.navigate(["/"]);
      }

      public logout() {
        window.sessionStorage.clear();
        this.router.navigate(["/login"]);
        }

        private decodePayload(token: string): any {
          const payload = token!.split(".")[1];
          const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
          const values = JSON.parse(payloadDecoded);
          return values;
          }

          public getCodigo(): number {
            const token = this.getToken();
            if (token) {
            const values = this.decodePayload(token);
            return values.id;
            }
            return 0;
            }

          
}

