import {Injectable} from "@angular/core";
import {HttpW} from "./httpw";
import {AlertController} from "ionic-angular";
import {Settings} from '../config/settings';

declare let formelo : any;
declare let document : any;
@Injectable()
export class DealService {
    private _apiNamespace : string = 'deals/';
    constructor(
        private http : HttpW,
        private _alert : AlertController
    ){}
    add (data) : Promise<any>{
        let options = {
            method : 'POST',
            url : this._apiNamespace,
            body : data
        };
        return this.http.fetch(options);
    }
    getAllDeals(results) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace,
            body : results
        };
        return this.http.fetch(options);
    }
    getActivityForDeal(dealID : number) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace+dealID+'/activities'
        };
        return this.http.fetch(options);
    }
}