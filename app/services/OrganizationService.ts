import {Injectable} from "@angular/core";
import {HttpW} from "./httpw";
import {AlertController} from "ionic-angular";
import {Settings} from '../config/settings';

declare let formelo : any;
declare let document : any;
@Injectable()
export class OrganizationService {
    private _apiNamespace : string = 'organizations';
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
        return Settings.validateField(['name'], options)
            .then(() => {
                return this.http.fetch(options);
            })
            .catch((err) => {
                console.error(err);
            });
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
            url : this._apiNamespace+"/"+id+"/activities"
        };
        return this.http.fetch(options);
    }
    deals(id : number) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace+"/"+id+"/deals"
        };
        return this.http.fetch(options);
    }
    persons(id : number) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace+"/"+id+"/persons"
        };
        return this.http.fetch(options);
    }
    files(id : number) : Promise<any>{
        let options = {
            method : 'GET',
            url : this._apiNamespace+"/"+id+"/files"
        };
        return this.http.fetch(options);
    }
}