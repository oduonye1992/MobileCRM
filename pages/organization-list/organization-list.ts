import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import {OrganizationService} from "../../app/services/OrganizationService";
import {HttpW} from "../../app/services/httpw";
import {OrganizationDetailPage} from "../organization-detail/organization-detail";
import {OrganisationCreatePage} from "../organisation-create/organisation-create";

@Component({
    selector: 'page-organization-list',
    templateUrl: 'organization-list.html',
    providers : [
        OrganizationService,
        HttpW
    ]
})
export class OrganizationListPage {
    _pageStatus : any = "searching";
    _items : any = [];
    _filter : any = {};
    _shouldGoBack : boolean = false;
    _resolve;
    constructor(
        public navCtrl: NavController,
        navParams: NavParams,
        public _service : OrganizationService,
        public modalCtrl: ModalController,
    ) {
        this._resolve = navParams.get('resolve') || undefined;
    }
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
        if(this._resolve){
            this._resolve(item);
            return this.navCtrl.pop();
        }
        this.navCtrl.push(OrganizationDetailPage, {
            item: item
        });
    }
    addItem(){
        let addModal = this.modalCtrl.create(OrganisationCreatePage);
        addModal.present();
    }
}
