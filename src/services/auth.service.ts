import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService{
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient,
        public storage: StorageService){

    }

    authenticate(credential : CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        credential, 
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    successfulLogin(authorizationValue : string){
        let authHeader = authorizationValue.substring(7); //remove o 'BEARER ' do string the autenticação
        let user : LocalUser = {
            token: authHeader,
            email: this.jwtHelper.decodeToken(authHeader).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }

}
