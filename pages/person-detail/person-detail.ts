import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PersonService} from "../../app/services/PeopleService";
import {ItemCreatePage} from "../item-create/item-create";
import {ActivityCreatePage} from "../activity-create/activity-create";

/*
  Generated class for the PersonDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html'
})
export class PersonDetailPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public _service : PersonService
    ) {
        this.item = navParams.get('item');
    }
    item : any;
    _tab : string = "flow";
    _activities : any = [];
    _deals : any = [];
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
    switchToGeneral(){
        this._tab = "general";
    }
    switchToFlow(){
        this._tab = "flow";
    }
    switchToDeals(){
        this._tab = "deals";
    }
    openActivity(){
        this.navCtrl.push(ActivityCreatePage);
    }
    openDeal(){
        this.navCtrl.push(ItemCreatePage);
    }
}
