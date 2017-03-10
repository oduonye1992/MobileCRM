import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OrganizationService} from "../../app/services/OrganizationService";
import {HttpW} from "../../app/services/httpw";

/*
  Generated class for the OrganisationCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-organisation-create',
  templateUrl: 'organisation-create.html',
    providers : [
        OrganizationService,
        HttpW
    ]
})
export class OrganisationCreatePage {
    name : string;
    constructor(
        public navCtrl: NavController,
        public _service : OrganizationService
    ) {}
    save(){
        this._service.add(this.getValues())
            .then((res) => {
                this.navCtrl.pop();
            })
            .catch(err => {
                console.error(err);
            })
    }
    getValues(){
        return {
            name : this.name
        }
    }
}
