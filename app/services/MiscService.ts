import {Injectable} from "@angular/core";
import {HttpW} from "./httpw";
import {AlertController} from "ionic-angular";
import {Settings} from '../config/settings';

declare let formelo : any;
declare let document : any;
@Injectable()
export class ActivityService {
    private _apiNamespace : string = 'activities/';
    constructor(
        private http : HttpW,
        private _alert : AlertController
    ){}
    login(results) : Promise<any>{
        let options = {
            method : 'POST',
            url : this._apiNamespace,
            body : {
                name : results.name,
                email : results.email,
                password : results.password
            }
        };
        return this.http.fetch(options);
    }
}