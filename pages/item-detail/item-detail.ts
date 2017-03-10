import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import {HttpW} from "../../app/services/httpw";
import {DealService} from "../../app/services/DealService";
import {ActivityCreatePage} from "../activity-create/activity-create";

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
    providers : [
        HttpW,
        DealService
    ]
})
export class ItemDetailPage {
  item: any;
  _tab : string = 'flow';
  _activities : any = [];
  constructor(public navCtrl: NavController,
              public dealService : DealService,
              navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
  }
  ionViewDidLoad (){
    this.fetchActivitesForDeal();
  }
  openActivity(){
      this.navCtrl.push(ActivityCreatePage);
  }
  switchToDetails(){
      this._tab = "details";
  }
  switchToFlow(){
      this._tab = "flow"
  }
  fetchActivitesForDeal(){
        this.dealService.getActivityForDeal(this.item.id)
            .then(res => {
                console.log(res);
                this._activities = res;
            })
            .catch(err => {
                console.error(err);
            })
  }
}
