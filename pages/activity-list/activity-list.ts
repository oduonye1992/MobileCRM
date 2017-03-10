import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {ActivityService} from "../../app/services/ActivityService";
import {HttpW} from "../../app/services/httpw";
import {ActivityCreatePage} from "../activity-create/activity-create";

@Component({
  selector: 'page-activity-list',
  templateUrl: 'activity-list.html',
    providers : [
        ActivityService,
        HttpW
    ]
})
export class ActivityListPage {
    _pageStatus : any = "searching";
    _items : any = [];
    _filter : any = {};
    _shouldGoBack : boolean = false;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public _service : ActivityService) {}
    ionViewDidLoad() {
        console.log("Ion loaded.");
        this.fetchAll(this._filter);
    }
    fetchAll(options){
        this._service.all(options)
            .then((res) => {
                console.log(res);
                this._items = res;
                this._pageStatus = "loaded";
            })
            .catch((err) => {
                console.error(err);
            });
    }
    openItem(item : any){
        let addModal = this.modalCtrl.create(ActivityCreatePage);
        addModal.onDidDismiss(item => {});
        addModal.present();
    }
    addItem(){
        let addModal = this.modalCtrl.create(ActivityCreatePage);
        addModal.onDidDismiss(item => {});
        addModal.present();
    }
}
