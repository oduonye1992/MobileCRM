import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OrganizationService} from "../../app/services/OrganizationService";
import {HttpW} from "../../app/services/httpw";

/*
  Generated class for the OrganizationDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-organization-detail',
  templateUrl: 'organization-detail.html',
    providers : [
        HttpW,
        OrganizationService
    ]
})
export class OrganizationDetailPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public _service : OrganizationService
    ) {
        this.item = navParams.get('item');
    }
    item : any;
    _tab : string = "flow";
    _activities : any = [];
    _deals : any = [];
    _people : any = [];
    ionViewDidLoad() {
        console.log('ionViewDidLoad PersonDetailPage');
        this.fetchActivities();
        this.fetchDeals();
    }
    fetchActivities(){
        this._service.activities(this.item.id)
            .then((res) => {
                this._activities = res;
            })
            .catch((err) => {
                console.error(err);
            });
    }
    fetchDeals(){
        this._service.deals(this.item.id)
            .then((res) => {
                this._deals = res;
            })
            .catch((err) => {
                console.error(err);
            });
    }
    fetchPeople(){
        this._service.persons(this.item.id)
            .then((res) => {
                this._people = res;
            })
            .catch((err) => {
                console.error(err);
            });
    }
    switchToGeneral(){
        this._tab = "general";
    }
    switchToFlow(){
        this._tab = "flow";
    }
    switchToDeals(){
        this._tab = "deals";
    }
    switchToPeople(){
        this._tab = "people";
    }
}
