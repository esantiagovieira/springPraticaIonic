import { HttpClient } from "@angular/common/http";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";

@Injectable()
export class CidadeService{
    constructor(public http: HttpClient){
    }

    findAll(estado_id : string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}