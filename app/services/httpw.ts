import {Settings} from '../config/settings';
import {Http, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";

@Injectable()
export class HttpW {
    private _baseUrl : string = Settings.endPoint;
    constructor(private http : Http){}
    public fetch(_options) : Promise<any> {
        let defaults  = {
            method : 'GET',
            headers : {},
            body : {}
        };
        const rules = Object.assign({}, defaults, _options);
        if (rules.method == 'GET'){
            return this.get(rules);
        } else if(rules.method == 'PUT'){
            return this.put(rules);
        } else if (rules.method == 'POST'){
            return this.post(rules);
        }
    }
    private get(rules): Promise<any> {
        console.log(rules);
        let headers = this.createAuthorizationHeader(rules.headers);
        console.log(headers);
        return this.http.get(this._baseUrl+rules.url, {
            headers: headers,
            search : this.createQueryParams(rules.body)
        })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    private put(rules): Promise<any> {
        console.log(rules);
        let headers = this.createAuthorizationHeader(rules.headers);
        console.log(headers);
        return this.http.put(this._baseUrl+rules.url, rules.body, {headers: headers, search : this.createQueryParams({})})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    private post(rules): Promise<any> {
        console.log(rules);
        let headers = this.createAuthorizationHeader(rules.headers);
        return this.http.post(this._baseUrl+rules.url, rules.body, {headers: headers, search : this.createQueryParams({})})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    private createAuthorizationHeader(_headers) : Headers {
        let headers = new Headers();
        let keys = Object.keys(_headers);
        for (let i = 0; i < keys.length; i++){
            headers.append(keys[i], _headers[keys[i]]);
        }
        return headers;
    }
    private createQueryParams(_headers) : URLSearchParams {
        let params : URLSearchParams = new URLSearchParams();
        let keys = Object.keys(_headers);
        for (let i = 0; i < keys.length; i++){
            params.set(keys[i], _headers[keys[i]]);
        }
        params.set('api_token' , Settings.getAuthorizationToken());
        return params;
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}