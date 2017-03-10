import {Injectable} from "@angular/core";
import {HttpW} from "./httpw";
import {AlertController} from "ionic-angular";
import {Settings} from '../config/settings';

declare let formelo : any;
declare let document : any;
@Injectable()
export class ActivityService {
    private _apiNamespace : string = 'activities';
    constructor(
        private http : HttpW,
        private _alert : AlertController
    ){}
    all(_options) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace,
            body : _options
        };
        return this.http.fetch(options);
    }
    add(_options) : Promise<any>{
        let options = {
            method : 'POST',
            url : this._apiNamespace,
            body : _options
        };
        return this.http.fetch(options);
    }
    update(id : number, _options : any) : Promise<any>{
        let options = {
            method : 'PUT',
            url : this._apiNamespace,
            body : _options
        };
        return this.http.fetch(options);
    }
    activities(id : number) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace+"/"+id+"/activities",
            body : null
        };
        return this.http.fetch(options);
    }
    deals(id : number) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace+"/"+id+"/deals",
            body : null
        };
        return this.http.fetch(options);
    }
    files(id : number) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace+"/"+id+"/files",
            body : null
        };
        return this.http.fetch(options);
    }
}